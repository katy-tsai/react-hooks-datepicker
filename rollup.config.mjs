import { defineConfig } from 'rollup';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import fs from 'fs';
import terser from '@rollup/plugin-terser';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'

export default defineConfig({
    input: './src/components/index.js', // 入口
    treeshake: false, // 关闭treeshake
    external: [/node_modules/], // 不打包node_modules模块
    plugins: [
        external(),
        resolve({
            extensions: ['.js', '.jsx', '.json', '.mjs', '.node'],
        }),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.mjs', 'json'],
        }),
        postcss({
            plugins: [
                autoprefixer
            ],
            sourceMap: true,
            extract: true,
            extensions: ['.css']
        }), // 出来css
        // 清理输出目录
        {
            name: 'clean-output',
            outputOptions(options) {
                if (fs.existsSync(options.dir)) {
                    clearDir(options.dir);
                }
            },
        },
    ],
    output: [
        //输出
        {
            exports: 'auto',
            format: 'esm', // 打包格式
            dir: 'es', // 输出目录
            preserveModules: true, // 保持文件位置
            preserveModulesRoot: './src/components/', // 打包根目录
        },
        {
            exports: 'auto',
            format: 'cjs',
            dir: 'lib', // 输出目录
            preserveModules: true,
            preserveModulesRoot: './src/components/',
        },
        {
            name: 'asd', // 全局变量名
            format: 'umd',
            dir: 'dist',
            entryFileNames: '[name].js',
            plugins: [terser()],
        },
    ],
});

function emptyDir(path) {
    const files = fs.readdirSync(path);
    files.forEach(file => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            emptyDir(filePath);
        } else {
            fs.unlinkSync(filePath);
        }
    });
}

function rmEmptyDir(path, level = 0) {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
        let tempFile = 0;
        files.forEach(file => {
            tempFile++;
            rmEmptyDir(`${path}/${file}`, 1);
        });
        if (tempFile === files.length && level !== 0) {
            fs.rmdirSync(path);
        }
    } else {
        level !== 0 && fs.rmdirSync(path);
    }
}

function clearDir(path) {
    emptyDir(path);
    rmEmptyDir(path);
}
