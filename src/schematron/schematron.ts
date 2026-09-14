import type { Result } from 'effect';

import { Context, Effect, Layer } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';

import { SchematronValidationError } from '#/schematron/errors';
import { ruleValidators } from '#/schematron/run-all-rules';

/**
 * @description The `Schematron` service validates a document against every schematron rule.
 */
export interface SchematronShape {
  /**
   * @description Runs every schematron rule against the document, failing with a single `SchematronValidationError` that wraps each failed rule.
   */
  readonly run: (document: PeppolDocument) => Effect.Effect<Result.Result<void, SchematronValidationError>>;
}

/**
 * @description Runs the schematron rules of this library against a PEPPOL document.
 */
export class Schematron extends Context.Service<Schematron, SchematronShape>()('@endevops/peppol-schema/schematron/Schematron') {
  static readonly layer = Layer.effect(
    Schematron,
    Effect.gen(function* () {
      const run = Effect.fn('Schematron.run')(function* (document: PeppolDocument) {
        const [errors] = yield* Effect.partition(ruleValidators, validator => validator(document));
        if (errors.length > 0) {
          return yield* new SchematronValidationError({ errors });
        }
      }, Effect.result);
      return Schematron.of({ run });
    })
  );
}
