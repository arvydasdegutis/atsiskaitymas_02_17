import globals from "globals";
import pluginJs from "@eslint/js";
 
/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: { __dirname: "readonly", ...globals.node } } },
  pluginJs.configs.recommended,
];
 
 