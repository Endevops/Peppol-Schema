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

  it.effect('surfaces aggregate and operand fields for CEN-EN16931-BR-S-08 through the service', () =>
    Effect.gen(function* () {
      const base = yield* Effect.promise(() => decodeBaseExample());
      const document = { ...base } as any;
      const subtotal = document.taxTotals[0].taxSubtotals[0];
      document.taxTotals[0].taxSubtotals[0] = { ...subtotal, taxableAmount: { ...subtotal.taxableAmount, value: 50 } };

      const result = yield* Schematron.use(schematron => schematron.run(document));

      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        assert(result.failure instanceof SchematronValidationError);

        const error = result.failure.errors.find(rule => rule.id === 'CEN-EN16931-BR-S-08');
        assert(error !== undefined);
        assert(error.fields.length > 0);

        const aggregate = error.fields.find(field => field.path === 'taxTotals[0].taxSubtotals[0].taxableAmount.value');
        assert(aggregate !== undefined);
        assert(typeof aggregate.expected === 'number');
        assert(typeof aggregate.actual === 'number');
        assert(aggregate.expected === 1325);
        assert(aggregate.actual === 50);

        const operands = error.fields.filter(field => field.expected === null);
        assert(operands.length > 0);
        assert(operands.some(field => field.path === 'invoiceLines[0].lineExtensionAmount.value'));
      }
    })
  );

  it.effect('surfaces aggregate and operand fields for CEN-EN16931-BR-CO-10 through the service', () =>
    Effect.gen(function* () {
      const base = yield* Effect.promise(() => decodeBaseExample());
      const document = { ...base } as any;
      document.legalMonetaryTotal.lineExtensionAmount = { ...document.legalMonetaryTotal.lineExtensionAmount, value: 1 };

      const result = yield* Schematron.use(schematron => schematron.run(document));

      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        const error = result.failure.errors.find(rule => rule.id === 'CEN-EN16931-BR-CO-10');
        assert(error !== undefined);
        assert(error.fields.length > 0);

        const aggregate = error.fields.find(field => field.path === 'legalMonetaryTotal.lineExtensionAmount.value');
        assert(aggregate !== undefined);
        assert(typeof aggregate.expected === 'number');
        assert(typeof aggregate.actual === 'number');
        assert(aggregate.expected === 1300);
        assert(aggregate.actual === 1);

        const lineAmountPath = /^invoiceLines\[\d+\]\.lineExtensionAmount\.value$/;
        const operands = error.fields.filter(field => field.expected === null && lineAmountPath.test(field.path));
        assert(operands.length > 0);
      }
    })
  );

  it.effect('defaults fields to an empty array when a non-calculation rule fails', () =>
    Effect.gen(function* () {
      const base = yield* Effect.promise(() => decodeBaseExample());
      const document = { ...base, customizationId: '' } as unknown as PeppolDocument;

      const result = yield* Schematron.use(schematron => schematron.run(document));

      assert(Result.isFailure(result));
      if (Result.isFailure(result)) {
        const error = result.failure.errors.find(rule => rule.id === 'CEN-EN16931-BR-01');
        assert(error !== undefined);
        assert(error.fields.length === 0);
      }
    })
  );
});
