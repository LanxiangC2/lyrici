
import { defineConfig } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve'; // 支持rollup打包node.js模块
import commonjs from '@rollup/plugin-commonjs'; // 支持rollup打包commonjs模块
import externals from "rollup-plugin-node-externals"; // 使rollup自动识别外部依赖
import json from "@rollup/plugin-json"; // 支持rollup打包json文件
import terser from "@rollup/plugin-terser"; // 压缩打包代码
import typescript from 'rollup-plugin-typescript2'; // 支持rollup打包ts文件

export default defineConfig([
    {
      input: {
        index: 'src/index.ts', // 打包入口文件
      },
      output: [
        {
          dir: 'dist', // 输出目标文件夹
          format: 'cjs', // 输出 commonjs 文件
        }
      ],
      // 这些依赖的作用上文提到过
      plugins: [
        nodeResolve(),
        externals({
          devDeps: false, // 可以识别我们 package.json 中的 devDependencies 依赖当作外部依赖处理 不会直接将其中引用的方法打包出来
        }),
        typescript(),
        json(),
        commonjs(),
        terser(),
      ],
    },
  ]);