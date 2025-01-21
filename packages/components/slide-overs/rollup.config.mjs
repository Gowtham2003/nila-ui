import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";

import pkg from "./package.json" with { type: "json" };
import rootPkg from "../../../package.json" with { type: "json" };

export default [
  {
    input: "index.ts",
    output: [
      {
        banner: `"use client"
/*! ${pkg.name} v${pkg.version} | ${rootPkg.license} | ${rootPkg.author} */`,
        file: `dist/index.js`,
        format: "cjs",
      },
      {
        banner: `"use client"
/*! ${pkg.name} v${pkg.version} | ${rootPkg.license} | ${rootPkg.author} */`,
        file: `dist/index.es.js`,
        format: "esm",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      terser(),
    ],
  },
  {
    input: "index.ts",
    output: [{ file: `dist/index.d.ts`, format: "esm" }],
    plugins: [dts()],
  },
];
