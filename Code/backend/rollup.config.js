import run from "@rollup/plugin-run";
import builtins from "builtin-modules";
import {terser} from "rollup-plugin-terser";

const dev = process.env.ROLLUP_WATCH === "true";

const myExternals = ["body-parser", "compression", "express", "express-static-gzip", "mongodb"];

export default {
  input: "src/server.js",
  output: {
    file: "build/server.js",
    format: "cjs",
  },
  external: [...builtins, ...myExternals],
  plugins: [dev ? run({execArgv: ["-r", "./loadDotenv.js"]}) : terser()],
};
