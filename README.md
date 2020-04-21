# umi-plugin-dir-model

此插件适用与 `umi` + `dva` 项目，用于收集自定义目录下的 model 到全局 store 中。

## Install

```bash
$ npm install umi-plugin-dir-model --save
```

## Usage

在 `.umirc.js` 或 `config.js` 中配置:

```js
export default {
    plugins: [['umi-plugin-dir-model', options]],
};
```

## Options

#### cwd

类型：`string | string[]`  
说明：文件夹完整路径

## Example

``` js
import { join } from 'path';

export default {
    plugins: [
        [
            'umi-plugin-dir-model',
            {
                cwd: [
                    join(__dirname, 'customModel1'),
                    join(__dirname, 'customModel2'),
                ],
            },
        ],
};
```

## Attention

在目标文件夹里新建 `model` 文件后，需要再次重启 `umi` 项目，避免收集不到该 `model`。

## LICENSE

MIT
