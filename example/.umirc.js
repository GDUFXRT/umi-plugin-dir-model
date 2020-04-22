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
            'umi-plugin-dir-model',
            {
                cwd: [
                    join(__dirname, 'customModel1'),
                    join(__dirname, 'customModel2'),
                ],
            },
        ],
        // 本地引入
        // [
        //     join(__dirname, '..', require('../package').main || 'index.js'),
        //     {
        //         cwd: [
        //             join(__dirname, 'customModel1'),
        //             join(__dirname, 'customModel2'),
        //         ],
        //     },
        // ],
    ],
};
