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
    modelPaths.forEach((itemPath) => {
        addModelTmp += `window.g_app.model({...require('${itemPath}').default});`;
    });

    return addModelTmp;
}

/**
 * 返回 cwd 路径下的所有 model 路径
 * @param {string} cwd 文件夹路径
 * @returns {Array} model 路径数组
 */
function getModel(cwd) {
    return globby
        .sync(`(model.js|*/model.js|*/models/**/*.js)`, {
            cwd,
        })
        .filter((p) => !p.endsWith('.test.js'))
        .map((p) => winPath(join(cwd, p)));
}

export default (api, opts) => {
    const { cwd } = opts;
    let allModelsPath =
        Object.prototype.toString.call(cwd) === '[object Array]'
            ? cwd.reduce(
                  (prevPaths, path) => prevPaths.concat(getModel(path)),
                  [],
              )
            : getModel(cwd);

    // 存在 model，则将添加全局 model 代码写入入口文件(pages/.umi/umi.js)
    allModelsPath.length && api.addEntryCode(getModelTmp(allModelsPath));
};
