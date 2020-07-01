import commonJS from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import run from "@rollup/plugin-run";
import builtins from "builtin-modules";
import {terser} from "rollup-plugin-terser";

const dev = process.env.ROLLUP_WATCH === "true";

export default {
  input: "src/server.js",
  output: {
    file: "build/server.js",
    format: "cjs",
  },
  external: builtins,
  plugins: [
    nodeResolve(),
    commonJS(),
    json(),
    dev ? run({execArgv: ["-r", "dotenv/config"]}) : terser(),
  ],
  onwarn: (warning, warn) => {
    // rollup produces a warning for all eval() usages.
    // Disable this warning for the depd dependency, which is used by express
    if (
      warning.code === "EVAL" &&
      /[/\\]node_modules[/\\]depd[/\\]index\.js$/.test(warning.loc.file)
    ) {
      return;
    }
    warn(warning);
  },
};
