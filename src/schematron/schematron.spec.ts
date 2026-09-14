/**
 * @description Unit tests for the `Schematron` service.
 */
import { assert, layer } from '@effect/vitest';
import { Effect, Result } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { SchematronValidationError } from '#/schematron/errors.ts';
import { Schematron } from '#/schematron/schematron.ts';
import { decodeBaseExample } from '#/test/test-utils.ts';

layer(Schematron.layer)('Schematron', it => {
  it.effect('passes on the base example', () =>
    Effect.gen(function* () {
      const document = yield* Effect.promise(() => decodeBaseExample());
      const result = yield* Schematron.use(schematron => schematron.run(document));
      assert(Result.isSuccess(result));
    })
  );

  it.effect('collects every failed rule in ruleValidators order', () =>
    Effect.gen(function* () {
      const base = yield* Effect.promise(() => decodeBaseExample());
      const document = { ...base, customizationId: '', profileId: '' } as unknown as PeppolDocument;

      const result = yield* Schematron.use(schematron => schematron.run(document));

      assert(Result.isFailure(result));
      assert(result.failure instanceof SchematronValidationError);

      const ids = result.failure.errors.map(error => error.id);
      const br01 = ids.indexOf('CEN-EN16931-BR-01');
      const r001 = ids.indexOf('PEPPOL-EN16931-R001');

      assert(br01 !== -1);
      assert(r001 !== -1);
      assert(br01 < r001);
    })
  );
});
