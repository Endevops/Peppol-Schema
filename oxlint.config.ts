import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: { correctness: 'error' },
  env: { browser: true, builtin: true, node: true, vitest: true },
  ignorePatterns: ['**/dist', '**/node_modules', '**/coverage'],
  overrides: [
    { files: ['**/{schemas,decoders}/**/*.ts'], rules: { 'typescript/no-redundant-type-constituents': 'off', 'sort-keys': 'off' } },
    {
      files: ['./src/index.ts', './src/schemas.ts', './src/peppol-validations/index.ts', './src/values.ts'],
      rules: { 'oxc/no-barrel-file': 'off', 'typescript/consistent-type-exports': 'off' },
    },
  ],
  plugins: ['oxc', 'typescript', 'unicorn', 'import', 'vitest', 'node', 'promise'],
  rules: {
    'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
    'import/consistent-type-specifier-style': 'error',
    'import/newline-after-import': 'warn',
    'import/no-relative-parent-imports': 'error',
    'import/unambiguous': 'warn',
    'oxc/no-barrel-file': 'warn',
    'prefer-template': 'warn',
    'require-yield': 'off',
    'sort-imports': 'off',
    'sort-keys': ['warn', 'asc', { minKeys: 5, natural: true }],
    'typescript/adjacent-overload-signatures': 'error',
    'typescript/array-type': ['error', { default: 'generic', readonly: 'generic' }],
    'typescript/consistent-type-exports': 'error',
    'typescript/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports', disallowTypeAnnotations: false }],
    'typescript/no-unnecessary-boolean-literal-compare': 'warn',
    'typescript/no-unnecessary-type-arguments': 'warn',
    'typescript/no-unnecessary-type-constraint': 'warn',
    'typescript/no-unnecessary-type-conversion': 'warn',
    'typescript/prefer-nullish-coalescing': 'off',
    'typescript/restrict-template-expressions': ['warn', { allowNever: true }],
    'vitest/no-standalone-expect': 'off',
    yoda: 'warn',
  },
});
