import type { ExportsOptions } from 'tsdown';

import { defineConfig } from 'tsdown';

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

export default defineConfig([
  {
    define,
    deps: { onlyBundle: false },
    dts: { sourcemap: true },
    entry: {
      index: './src/index.ts',
      schematron: './src/schematron/index.ts',
      validations: './src/peppol-validations/index.ts',
      xml: './src/xml.ts',
    },
    exports,
    platform: 'neutral',
    sourcemap: true,
    unbundle: true,
  },
  {
    define,
    deps: { onlyBundle: false },
    dts: { enabled: false },
    entry: './scripts/generate-translations.ts',
    exports,
    minify: true,
    outDir: './dist/bin',
    platform: 'node',
    sourcemap: false,
  },
]);
