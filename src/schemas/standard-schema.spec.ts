import { describe, expect, it } from 'vitest';

declare global {
  interface ImportMeta {
    glob: (pattern: Array<string>, options: { readonly eager: true }) => Record<string, Record<string, unknown>>;
  }
}

/**
 * @description Every schema module under `src/schemas`, eagerly imported so the test can inspect their runtime exports. Spec and test files are excluded at glob
 * time so importing them here does not register their tests.
 */
const modules = import.meta.glob(['./**/*.ts', '!./**/*.spec.ts', '!./**/*.test.ts'], { eager: true });

const isSchemaLike = (value: unknown): value is Record<string, unknown> =>
  ((typeof value === 'object' && value !== null) || typeof value === 'function') && 'ast' in (value as object);

const exportedSchemas: Array<readonly [string, Record<string, unknown>]> = [];
for (const [path, module] of Object.entries(modules)) {
  for (const [name, value] of Object.entries(module)) {
    if (isSchemaLike(value)) exportedSchemas.push([`${path}#${name}`, value]);
  }
}

describe('Standard Schema V1', () => {
  it('exposes every exported schema through ~standard', () => {
    expect(exportedSchemas.length).toBeGreaterThan(100);
    const missing = exportedSchemas.filter(([, schema]) => !('~standard' in schema)).map(([name]) => name);
    expect(missing).toEqual([]);
  });

  it('advertises the Standard Schema version and vendor', () => {
    for (const [, schema] of exportedSchemas) {
      const standard = schema['~standard'] as { readonly vendor: string; readonly version: number } | undefined;
      expect(standard?.version).toBe(1);
      expect(standard?.vendor).toBe('effect');
    }
  });
});
