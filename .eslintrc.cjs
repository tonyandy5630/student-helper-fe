/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
    "prettier"
  ],
  plugins: ["prettier"],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "")],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  env: {
    node: true
  },
  rules: {
    // Tắt rule yêu cầu import React trong file jsx
    "react/react-in-jsx-scope": "off",
    // Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
    "react/jsx-no-target-blank": "warn",
    // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "always",
        semi: false,
        trailingComma: "none",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
