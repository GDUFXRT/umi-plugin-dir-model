import globby from 'globby';
import { join } from 'path';
import { winPath } from 'umi-utils';

/**
 * 返回添加 model 的代码模板
 * @param {Array} modelPaths 模板路径
 * @returns {String} 要执行的代码
 */
function getModelTmp(modelPaths) {
    let addModelTmp = ';';
    modelPaths.forEach(itemPath => {
        addModelTmp += `window.g_app.model({...require('${itemPath}').default});`;
    });

    return `
    export function inject() {
        ${addModelTmp}
    }
  `;
}

/**
 * 返回 cwd 路径下的所有 model 路径
 * @param {string} cwd 文件夹路径
 * @returns {Array} model 路径数组
 */
function getModel(cwd) {
    return globby
        .sync(`{**/model.js,**/models/**/*.{ts,tsx,js,jsx}}`, {
            cwd,
        })
        .filter(
            p =>
                !p.endsWith('.d.ts') &&
                !p.endsWith('.test.js') &&
                !p.endsWith('.test.jsx') &&
                !p.endsWith('.test.ts') &&
                !p.endsWith('.test.tsx'),
        )
        .map(p => winPath(join(cwd, p)));
}

export default (api, opts) => {
    const { cwd } = opts;
    const modelPath = cwd;

    const newFileName = 'injectAppendModel.js';
    let allModelsPath = getModel(modelPath);

    // 存在 model，则将添加全局 model 代码写入入口文件(pages/.umi/umi.js)
    if (allModelsPath.length) {
        api.writeTmpFile(newFileName, getModelTmp(allModelsPath));
        api.addEntryCode(`
        require('./${newFileName}').inject()
        // hot module replacement
        if (__IS_BROWSER && module.hot) {
          module.hot.accept('./${newFileName}', () => {
            clientRender();
        });
        }`);
    }
};
