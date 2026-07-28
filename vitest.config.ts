import process from 'node:process';
import type { TestProjectConfiguration, ViteUserConfig } from 'vitest/config';
import { defineConfig } from 'vitest/config';
import pkg from './package.json' with { type: 'json' };

const name = pkg.name;

const hookTimeout = process.env.CI ? undefined : 2000;
const testTimeout = process.env.CI ? undefined : 3000;

const coverage = {
  exclude: ['src/values/**/*.ts'],
  provider: 'v8',
  reportOnFailure: true,
} as const satisfies (ViteUserConfig['test'] & {})['coverage'];

export const projects = [
  {
    resolve: { tsconfigPaths: true },
    test: {
      exclude: [`${import.meta.dirname}/src/**/*.*.{test,spec}.{ts,tsx}`],
      include: [`${import.meta.dirname}/{src,scripts}/**/*.{test,spec}.{ts,tsx}`],
      includeSource: [`${import.meta.dirname}/{src,scripts}/**/*.{ts,tsx}`],
      name: `${name} - unit`,
      setupFiles: [`${import.meta.dirname}/test/custom-matchers.ts`],
      tags: [{ description: 'All the unit test', name: 'unit' }],
    },
  },
] as const satisfies Array<TestProjectConfiguration>;

export default defineConfig({ resolve: { tsconfigPaths: true }, test: { coverage, hookTimeout, projects, testTimeout } });
