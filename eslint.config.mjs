import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

// تحديد المسار الجذر للمشروع
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname
});

export default [
  js.configs.recommended,
  reactRecommended,

  // تكوينات Airbnb (بدون ignores داخل extends)
  ...compat.extends("airbnb", "airbnb-typescript"),

  // تكوين TypeScript مع إعدادات دقيقة
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: [
      "**/eslint.config.*",
      "**/*.config.*",
      "**/dist/**" // إضافة إذا لزم الأمر
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json", // مسار نسبي
        tsconfigRootDir: __dirname
      }
    },
    plugins: {
      "@typescript-eslint":import("@typescript-eslint/eslint-plugin")
    }
  },

  // Global variables
  {
    ignores: ["**/eslint.config.*", "**/*.config.*"], // نقل ignores هنا
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    }
  },

  // القواعد المخصصة
  {
    rules: {
      "no-console": "warn",
      "react/react-in-jsx-scope": "off",
      "import/no-extraneous-dependencies": ["error", { 
        devDependencies: ["**/*.test.*", "**/*.config.*"] 
      }],
      "@typescript-eslint/dot-notation": ["error", { allowKeywords: true }]
    }
  },

  // Prettier في النهاية
  eslintConfigPrettier
];