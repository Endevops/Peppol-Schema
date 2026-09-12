import type { AttwOptions, ExportsOptions, PublintOptions, WithEnabled } from 'tsdown';

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
const attw: WithEnabled<AttwOptions> = { profile: 'esm-only', enabled: true };
const publint: WithEnabled<PublintOptions> = { enabled: true };

export default defineConfig([
  {
    attw,
    define,
    deps: { onlyBundle: false },
    dts: { sourcemap: true },
    entry: {
      effect: './src/effect/index.ts',
      index: './src/index.ts',
      schematron: './src/schematron/index.ts',
      validations: './src/peppol-validations/index.ts',
      values: './src/values.ts',
      xml: './src/xml.ts',
    },
    exports,
    platform: 'neutral',
    publint,
    sourcemap: true,
    // unbundle: true,
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
]);
