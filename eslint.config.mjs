import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginTanstackQuery from "@tanstack/eslint-plugin-query";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint-config-prettier",
  ),
  {
    plugins: {
      "@tanstack/query": pluginTanstackQuery,
    },
    rules: {
      // Add any rules you want from the plugin here, for example:
      // "@tanstack/query/exhaustive-deps": "warn"
    },
  },
];

export default eslintConfig;
