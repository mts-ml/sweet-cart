import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  js.configs.recommended, // Configurações recomendadas do ESLint para JavaScript
  {
    files: ['**/*.ts', '**/*.tsx'], // Aplica apenas a arquivos TypeScript
    ignores: ['dist/**', 'vite.config.js', 'eslint.config.js'], // Ignora arquivos específicos
    languageOptions: {
      parser: tsParser, // Usa o parser do TypeScript
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Habilita suporte a JSX
        },
        project: './tsconfig.json', // Caminho para o tsconfig.json
      },
      globals: {
        ...globals.browser, // Adiciona globals do navegador
      },
    },
    plugins: {
      '@typescript-eslint': ts, // Plugin do TypeScript
      react: reactPlugin, // Plugin do React
      'react-hooks': reactHooksPlugin, // Plugin do React Hooks
      'react-refresh': reactRefreshPlugin, // Plugin do React Refresh
    },
    rules: {
      // Regras específicas do TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',

      // Regras do React
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off', // Não é necessário no React 17+

      // Regras do React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Regras do React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'], // Aplica apenas a arquivos JavaScript
    ignores: ['dist/**', 'vite.config.js', 'eslint.config.js'], // Ignora arquivos específicos
    languageOptions: {
      globals: {
        ...globals.browser, // Adiciona globals do navegador
      },
    },
    rules: {
      // Regras específicas para JavaScript (se necessário)
    },
  },
  {
    "include": ["src/**/*", "vite.config.ts", "eslint.config.js"],
    "exclude": ["node_modules", "dist"]
  },
];
