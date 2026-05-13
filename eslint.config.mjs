import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/strict',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react,
      'react-hooks': fixupPluginRules(reactHooks),
      'jsx-a11y': jsxA11Y,
      'simple-import-sort': simpleImportSort,
      jest: fixupPluginRules(jest),
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jasmine,
        ...globals.jest,
        global: 'readonly',
        Atomics: 'readonly',
        process: true,
        SharedArrayBuffer: 'readonly',
        Promise: 'readonly',
        Buffer: 'readonly',
        WeakSet: 'readonly',
        setImmediate: 'readonly',
        setInterval: 'readonly',
        setTimeout: 'readonly',
        shallow: 'readonly',
        page: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },

    rules: {
      '@typescript-eslint/explicit-member-accessibility': 0,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/camelcase': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/ban-ts-ignore': 0,
      '@typescript-eslint/no-explicit-any': 0,
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',

      'jest/no-restricted-matchers': [
        'error',
        {
          toBeFalsy: null,
          toBeTruthy: null,
        },
      ],

      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'no-async-promise-executor': 0,
      'react/jsx-uses-react': 0,
      'react/react-in-jsx-scope': 0,
      'no-console': 0,
      'no-irregular-whitespace': 0,
      'react/jsx-key': 0,

      'no-restricted-imports': [
        2,
        {
          paths: [
            {
              name: 'lodash',
              message:
                "Do not import from `lodash` directly, as we don't support tree-shaking for it. Instead, import the function you're trying to use, e.g. `import debounce from 'lodash/debounce'`",
            },
            {
              name: '@getgo/chameleon-web-react-wrapper/register',
              message:
                "Please use @getgo/chameleon-web-react-wrapper to make sure you don't include the component registration code by accident.",
            },
          ],
        },
      ],

      'react-hooks/exhaustive-deps': 1,

      'react/sort-default-props': [
        'warn',
        {
          ignoreCase: false,
        },
      ],

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'react-hooks/rules-of-hooks': 1,
      'react/prop-types': 0,
      'react/display-name': 0,
      'react/no-unescaped-entities': 0,
      'jsx-a11y/no-autofocus': 0,
      'jsx-a11y/media-has-caption': 0,
      '@typescript-eslint/no-empty-function': 0,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cjs', '**/*.mjs'],

    rules: {
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react', '^@?\\w'],
            [
              '^(assets|components|config|contexts|dao|entries|hooks|lib|modules|routes|store|tests|translations|types|utils)(/.*|$)',
              '^\\.',
            ],
            ['^[^.]'],
          ],
        },
      ],
    },
  },
];
