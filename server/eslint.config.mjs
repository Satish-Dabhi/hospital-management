import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    // Additional rules
    rules: {
      // Example additional rules
      "no-console": "warn", // Warns about the use of console statements
      "no-unused-vars": "warn", // Warns about unused variables
      // Add more rules here as per your project's requirements
    },
  },
];
