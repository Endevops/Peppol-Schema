import type { TestProjectConfiguration, ViteUserConfig } from 'vite-plus';
import type { AttwOptions, ExportsOptions, PublintOptions, WithEnabled } from 'vite-plus/pack';

import { recommended } from '@effect/tsgo/oxlint-presets';
import { defineConfig } from 'vite-plus';

const define: Record<string, string> = {
  'import.meta.env.DEV': 'undefined',
  'import.meta.env.MODE': '"production"',
  'import.meta.vitest': 'undefined',
};

const exports: ExportsOptions = {
  devExports: 'development',
  packageJson: true,
  bin: { 'generate-translations': './scripts/generate-translations.ts' },
};

const attw: WithEnabled<AttwOptions> = { profile: 'esm-only', enabled: true };
const publint: WithEnabled<PublintOptions> = { enabled: true };

import pkg from './package.json' with { type: 'json' };

const name = pkg.name;

const hookTimeout = process.env.CI ? undefined : 2000;
const testTimeout = process.env.CI ? undefined : 3000;

const coverage = {
  exclude: ['src/values/**/*.ts', 'src/paraglide/**/*', 'src/**/*.spec.ts*'],
  provider: 'v8',
  include: ['src/**/*'],
  reportOnFailure: true,
} as const satisfies (ViteUserConfig['test'] & {})['coverage'];

const projects = [
  {
    resolve: { tsconfigPaths: true },
    test: {
      exclude: [`${import.meta.dirname}/src/**/*.*.{test,spec}.{ts,tsx}`],
      fsModuleCache: true,
      hookTimeout,
      include: [`${import.meta.dirname}/src/**/*.{test,spec}.{ts,tsx}`],
      isolate: false,
      name: `${name} - unit`,
      setupFiles: [`${import.meta.dirname}/test/custom-matchers.ts`],
      tags: [{ description: 'All the unit test', name: 'unit' }],
      testTimeout,
    },
  },
  {
    resolve: { tsconfigPaths: true },
    test: {
      fsModuleCache: true,
      hookTimeout: 10_000,
      include: [`${import.meta.dirname}/src/**/*.int.{test,spec}.{ts,tsx}`],
      isolate: false,
      name: `${name} - integration`,
      setupFiles: [`${import.meta.dirname}/test/custom-matchers.ts`],
      testTimeout: 30_000,
    },
  },
] as const satisfies Array<TestProjectConfiguration>;

export default defineConfig({
  fmt: {
    arrowParens: 'avoid',
    bracketSameLine: true,
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'css',
    importOrderCaseSensitive: false,
    jsdoc: {
      capitalizeDescriptions: true,
      commentLineStrategy: 'multiline',
      descriptionTag: true,
      descriptionWithDot: true,
      keepUnparsableExampleIndent: false,
      preferCodeFences: true,
      separateReturnsFromParam: true,
      separateTagGroups: true,
    },
    jsxSingleQuote: true,
    objectWrap: 'collapse',
    printWidth: 150,
    quoteProps: 'as-needed',
    semi: true,
    singleQuote: true,
    sortImports: {
      groups: [
        'side_effect_style',
        'side_effect',
        'type-import',
        ['value-builtin', 'value-external'],
        'type-internal',
        'value-internal',
        ['type-parent', 'type-sibling', 'type-index'],
        ['value-parent', 'value-sibling', 'value-index'],
        'unknown',
      ],
      newlinesBetween: true,
      sortSideEffects: true,
    },
    sortPackageJson: { sortScripts: true },
    tabWidth: 2,
    trailingComma: 'es5',
  },
  lint: {
    categories: { correctness: 'error' },
    env: { browser: true, builtin: true, node: true, vitest: true },
    extends: [recommended],
    ignorePatterns: ['**/dist', '**/node_modules', '**/coverage'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    options: { reportUnusedDisableDirectives: 'warn', typeAware: true },
    overrides: [
      { files: ['**/*.spec.ts'], rules: { 'typescript/no-explicit-any': 'off' } },
      {
        files: ['**/{effect,schemas,decoders}/**/*.ts'],
        excludeFiles: ['**/*.spec.ts'],
        rules: { 'typescript/no-redundant-type-constituents': 'off', 'sort-keys': 'off' },
      },
      {
        files: [
          './src/index.ts',
          './src/schemas.ts',
          './src/schemas/values/index.ts',
          './src/schemas/utils/index.ts',
          './src/xml.ts',
          './src/values.ts',
          './src/decoders/index.ts',
          './src/peppol-validations/index.ts',
          './src/constants/index.ts',
        ],
        rules: { 'oxc/no-barrel-file': 'off', 'typescript/consistent-type-exports': 'off' },
      },
      { files: ['**/scripts/**/*.ts', '**/*.spec.ts'], rules: { 'effecttsgo/node-builtin-import': 'allow' } },
      { files: ['vite.config.ts'], rules: { 'sort-keys': ['error', 'asc', { minKeys: 5, natural: true, caseSensitive: true }] } },
    ],
    plugins: ['oxc', 'typescript', 'unicorn', 'import', 'vitest', 'node', 'promise'],
    rules: {
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
      'effecttsgo/any-unknown-in-error-context': 'warn',
      'effecttsgo/async-function': 'off',
      'effecttsgo/catch-to-or-else-succeed': 'warn',
      'effecttsgo/crypto-random-uuid': 'off',
      'effecttsgo/crypto-random-uuid-in-effect': 'warn',
      'effecttsgo/extends-native-error': 'warn',
      'effecttsgo/global-console': 'off',
      'effecttsgo/global-console-in-effect': 'warn',
      'effecttsgo/global-date': 'off',
      'effecttsgo/global-date-in-effect': 'warn',
      'effecttsgo/global-fetch': 'off',
      'effecttsgo/global-fetch-in-effect': 'warn',
      'effecttsgo/global-random': 'off',
      'effecttsgo/global-random-in-effect': 'warn',
      'effecttsgo/global-timers': 'off',
      'effecttsgo/global-timers-in-effect': 'warn',
      'effecttsgo/instance-of-schema': 'off',
      'effecttsgo/leaking-requirements': 'error',
      'effecttsgo/new-promise': 'off',
      'effecttsgo/node-builtin-import': 'warn',
      'effecttsgo/prefer-schema-over-json': 'warn',
      'effecttsgo/process-env': 'off',
      'effecttsgo/process-env-in-effect': 'warn',
      'effecttsgo/redundant-schema-tag-identifier': 'allow', // NOTE: this rule is allowed for now to reduce noise
      'effecttsgo/unnecessary-fail-yieldable-error': 'warn',
      'effecttsgo/unsafe-effect-type-assertion': 'warn',
      'import/consistent-type-specifier-style': 'error',
      'import/newline-after-import': 'warn',
      'import/no-relative-parent-imports': 'error',
      'import/unambiguous': 'warn',
      'no-restricted-imports': [
        'error',
        { allowTypeImports: false, name: '#/index', message: 'Please import the specific file instead of the application module export' },
        { allowTypeImports: false, name: '#/schemas', message: 'Please import the specific file instead of the application module export' },
        { allowTypeImports: false, name: '#/schemas/values', message: 'Please import the specific file instead of the application module export' },
        { allowTypeImports: false, name: '#/schemas/utils', message: 'Please import the specific file instead of the application module export' },
        { allowTypeImports: false, name: '#/values', message: 'Please import the specific file instead of the application module export' },
        {
          allowTypeImports: false,
          name: '#/peppol-validations',
          message: 'Please import the specific file instead of the application module export',
        },
        { allowTypeImports: false, name: '#/constants', message: 'Please import the specific file instead of the application module export' },
        { allowTypeImports: false, name: '#/schematron', message: 'Please import the specific file instead of the application module export' },
        { allowTypeImports: false, name: '#/effect', message: 'Please import the specific file instead of the application module export' },
      ],
      'oxc/no-barrel-file': 'warn',
      'prefer-template': 'warn',
      'require-yield': 'off',
      'sort-imports': 'off',
      'sort-keys': ['warn', 'asc', { minKeys: 5, natural: true }],
      'typescript/adjacent-overload-signatures': 'error',
      'typescript/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      'typescript/consistent-type-exports': 'error',
      'typescript/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports', disallowTypeAnnotations: false }],
      'typescript/no-explicit-any': 'error',
      'typescript/no-misused-spread': 'off',
      'typescript/no-unnecessary-boolean-literal-compare': 'warn',
      'typescript/no-unnecessary-type-arguments': 'warn',
      'typescript/no-unnecessary-type-constraint': 'warn',
      'typescript/no-unnecessary-type-conversion': 'warn',
      'typescript/prefer-nullish-coalescing': 'off',
      'typescript/restrict-template-expressions': ['warn', { allowNever: true }],
      'vite-plus/prefer-vite-plus-imports': 'error',
      'vitest/no-conditional-expect': 'off',
      'vitest/no-standalone-expect': 'off',
      'vitest/require-to-throw-message': 'off',
      yoda: 'warn',
    },
  },
  pack: [
    {
      attw,
      define,
      deps: { onlyBundle: false },
      dts: { sourcemap: true },
      entry: {
        constants: './src/constants/index.ts',
        index: './src/index.ts',
        'invoice-response-codes': './src/invoice-response-codes/index.ts',
        schematron: './src/schematron/index.ts',
        validations: './src/peppol-validations/index.ts',
        values: './src/values.ts',
        xml: './src/xml.ts',
      },
      exports,
      platform: 'neutral',
      publint,
      sourcemap: true,
    },
    {
      attw,
      define,
      deps: { onlyBundle: false },
      dts: { enabled: false },
      entry: './scripts/generate-translations.ts',
      exports,
      minify: 'dce-only',
      outDir: './dist/bin',
      platform: 'node',
      publint,
      sourcemap: false,
    },
  ],
  resolve: { tsconfigPaths: true },
  staged: {
    '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx}': [
      'vp fmt --no-error-on-unmatched-pattern',
      'vp lint --quiet --type-aware',
      'fallow --changed-since HEAD --type-aware --fail-on-issues',
    ],
    '*.{xml,json,jsonc}': ['vp fmt --no-error-on-unmatched-pattern'],
  },
  test: { coverage, projects },
});
