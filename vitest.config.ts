import type { ViteUserConfig } from 'vitest/config';

import process from 'node:process';
import { defineConfig } from 'vitest/config';

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

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    coverage,
    hookTimeout,
    include: [`${import.meta.dirname}/{src}/**/*.{test,spec}.{ts,tsx}`],
    includeSource: [`${import.meta.dirname}/{src,scripts}/**/*.{ts,tsx}`],
    name: `${name} - unit`,
    setupFiles: [`${import.meta.dirname}/test/custom-matchers.ts`],
    tags: [{ description: 'All the unit test', name: 'unit' }],
    testTimeout,
  },
});
