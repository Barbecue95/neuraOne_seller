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
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn"
    },
  },
];

export default eslintConfig;
