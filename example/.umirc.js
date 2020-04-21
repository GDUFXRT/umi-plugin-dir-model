import { join } from 'path';

export default {
    routes: [{ path: '/', component: './index' }],
    plugins: [
        [
            'umi-plugin-react',
            {
                dva: true,
            },
        ],
        [
            join(__dirname, '..', require('../package').main || 'index.js'),
            {
                cwd: [
                    join(__dirname, 'customModel1'),
                    join(__dirname, 'customModel2'),
                ],
            },
        ],
        // 在其他引入，需安装 umi-plugin-dir-model 并使用以下写法：
        // [
        //     'umi-plugin-dir-model',
        //     {
        //         cwd: [
        //             join(__dirname, 'customModel1'),
        //             join(__dirname, 'customModel2'),
        //         ],
        //     },
        // ],
    ],
};
