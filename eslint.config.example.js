import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import a11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";

export default [
  { ignores: ["dist", "node_modules", "build"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": a11y,
      import: importPlugin,
    },
    rules: {
      // ✅ Core ESLint Recommended
      ...js.configs.recommended.rules,

      // ✅ React Best Practices
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,

      // ✅ React Hooks Best Practices
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "warn",

      // ✅ React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ✅ JSX Accessibility Rules
      ...a11y.configs.recommended.rules,

      // ✅ Import Rules for Consistency
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/no-unresolved": "error",
      "import/no-duplicates": "warn",

      // ✅ React-Specific Adjustments
      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off",

      // ✅ Undefined Variables as Error
      "no-undef": "error",
    },
  },
];
