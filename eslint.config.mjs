import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import pluginStylistic from '@stylistic/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginTailwind from 'eslint-plugin-better-tailwindcss';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
  },
  {
    ignores: [
      '**/tsconfig.json',
      '**/eslint.config.mjs',
      '**/next.config.mjs',
      '**/postcss.config.mjs',
      '**/prettier.config.mjs',
      '**/next-env.d.ts',
      '**/tailwind.config.ts',
      '**/bin/',
      '**/build/',
      '**/obj/',
      '**/out/',
      '**/.next/',
    ],
  },
  {
    name: 'next/core-web-vitals',
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
  {
    name: 'eslint/recommended',
    rules: {
      ...js.configs.recommended.rules,

      'no-useless-rename': 'error',
      'no-underscore-dangle': ['error', { allow: ['_id', '__dirname'] }],
    },
  },
  {
    name: 'eslint/stylistic',
    plugins: {
      '@stylistic': pluginStylistic,
    },
    rules: {
      ...pluginStylistic.configs.recommended.rules,

      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/arrow-parens': 'off',
      '@stylistic/computed-property-spacing': ['error', 'never'],
      '@stylistic/func-call-spacing': ['error', 'never'],
      '@stylistic/indent': ['off', 2],
      '@stylistic/jsx-closing-tag-location': 'error',
      '@stylistic/jsx-one-expression-per-line': [
        'error',
        { allow: 'single-line' },
      ],
      '@stylistic/member-delimiter-style': ['error'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/operator-linebreak': ['error', 'before'],
      '@stylistic/semi': 'off',
      '@stylistic/space-before-function-paren': [
        'error',
        { asyncArrow: 'always', named: 'never' },
      ],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/spaced-comment': [
        'error',
        'always',
        { exceptions: ['-', '+'] },
      ],
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    name: 'typescript',
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      ['@typescript-eslint']: tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-unsafe-assignment': ['off'],
      '@typescript-eslint/require-await': ['off'],
    },
  },
  {
    name: 'react/jsx-runtime',
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs['jsx-runtime'].rules,
      'react/self-closing-comp': ['error', { component: true, html: false }],
      'react/jsx-curly-brace-presence': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'react-hooks/recommended',
    plugins: {
      'react-hooks': pluginHooks,
    },
    rules: pluginHooks.configs.recommended.rules,
  },

  {
    name: 'plugin-import',
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
    plugins: pluginImport.flatConfigs.recommended.plugins,
    rules: {
      ...pluginImport.flatConfigs.recommended.rules,
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '{react,react-dom/**,react-router-dom}',
              group: 'builtin',
              position: 'before',
            },
            { pattern: 'next/**', group: 'builtin', position: 'before' },
            {
              pattern: '@mui/**',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'parent',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    name: 'tailwindcss',
    settings: {
      'better-tailwindcss': {
        entrypoint: './src/app/global.css',
      },
    },
    plugins: {
      'better-tailwindcss': pluginTailwind,
    },
    rules: {
      // enable all recommended rules to report a warning
      ...pluginTailwind.configs['recommended-warn'].rules,
      // enable all recommended rules to report an error
      ...pluginTailwind.configs['recommended-error'].rules,

      'enforce-consistent-line-wrapping': [
        'error',
        { group: 'newLine', preferSingleLine: true, printWidth: 80 },
      ],
    },
  },
  eslintConfigPrettier,
];
