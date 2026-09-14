import { Context, Effect, Layer, Result } from 'effect';

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
  readonly run: (document: PeppolDocument) => Effect.Effect<void, SchematronValidationError>;
}

/**
 * @description Runs the schematron rules of this library against a PEPPOL document.
 */
export class Schematron extends Context.Service<Schematron, SchematronShape>()('@endevops/peppol-schema/schematron/Schematron') {
  static readonly layer = Layer.effect(
    Schematron,
    Effect.gen(function* () {
      const run = Effect.fn('Schematron.run')(function* (document: PeppolDocument) {
        const results = yield* Effect.forEach(ruleValidators, validator => validator(document).pipe(Effect.result));
        const errors = results.filter(Result.isFailure).map(result => result.failure);
        if (errors.length > 0) {
          return yield* new SchematronValidationError({ errors });
        }
      });
      return Schematron.of({ run });
    })
  );
}
