import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import pluginImport from 'eslint-plugin-import';
import pluginTailwind from 'eslint-plugin-better-tailwindcss';

import eslintConfigPrettier from './eslint.config.prettier.mjs';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
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
]);

export default eslintConfig;
