import { defineConfig } from 'tsdown';

export default defineConfig({
  define: { 'import.meta.env.DEV': 'undefined', 'import.meta.env.MODE': '"production"', 'import.meta.vitest': 'undefined' },
  deps: { onlyBundle: false },
  devtools: true,
  dts: { sourcemap: true },
  entry: {
    constants: './src/constants/index.ts',
    index: './src/index.ts',
    schemas: './src/schemas.ts',
    schematron: './src/schematron/index.ts',
    validations: './src/peppol-validations/index.ts',
    values: './src/values.ts',
  },
  exports: { devExports: 'development', packageJson: true },
  platform: 'neutral',
  sourcemap: true,
  unbundle: true,
});
