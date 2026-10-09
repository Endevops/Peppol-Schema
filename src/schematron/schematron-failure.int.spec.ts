import { assert, layer } from '@effect/vitest';
import { Effect, Result, Schema } from 'effect';
/**
 * @description Failure cases for the `Schematron` service: every fixture under `test/files/schematron` (generated from the OpenPEPPOL `peppol-bis-invoice-3` and
 * CEN `eInvoicing-EN16931` unit-test suites) and `test/files/v3/invoice/custom` is named after the rule it must trigger. Each file is decoded into a
 * `PeppolDocument` and the service must report at least that rule.
 *
 * @see {@link Schematron}
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { PeppolDocumentSchema } from '#/schemas/peppol-document-schema.ts';
import { SchematronValidationError } from '#/schematron/errors.ts';
import { Schematron } from '#/schematron/schematron.ts';

const FIXTURE_DIR = fileURLToPath(new URL('../../test/files/schematron', import.meta.url));

const cases = new Map<string, string>();
for (const file of readdirSync(FIXTURE_DIR)) {
  if (file.endsWith('.xml')) {
    cases.set(file.replace(/\.xml$/, ''), join(FIXTURE_DIR, file));
  }
}

const decodeDocument = Schema.decodeUnknownEffect(PeppolDocumentSchema);

async function decodeFile(path: string): Promise<PeppolDocument> {
  const content = readFileSync(path, 'utf8');
  return (await Effect.runPromise(decodeDocument(content, { reportInput: true }))) as PeppolDocument;
}

layer(Schematron.layer)('Schematron failure cases', it => {
  for (const [id, path] of cases) {
    it.effect(`fails ${id}`, () =>
      Effect.gen(function* () {
        const document = yield* Effect.promise(() => decodeFile(path));
        const result = yield* Schematron.use(schematron => schematron.run(document));

        assert(Result.isFailure(result));
        if (Result.isFailure(result)) {
          assert(result.failure instanceof SchematronValidationError);
          assert(
            result.failure.errors.some(error => error.id === id),
            `expected ${id} in [${result.failure.errors.map(error => error.id).join(', ')}]`
          );
        }
      })
    );
  }
});
