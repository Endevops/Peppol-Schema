import type { Result } from 'effect';

import { Context, Effect, Layer } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { SchematronValidationError } from '#/schematron/errors.ts';
import { ruleValidators } from '#/schematron/run-all-rules.ts';

/**
 * @description The `Schematron` service validates a document against every schematron rule.
 */
export interface SchematronShape {
  /**
   * @description Runs every schematron rule against the document, failing with a single `SchematronValidationError` that wraps each failed rule.
   *
   * @example
   *   ```ts
   *   const program = Effect.gen(function* () {
   *     const schematron = yield* Schematron;
   *     return yield* schematron.run(document);
   *   });
   *   ```;
   *
   * @param document - The PEPPOL invoice or credit note to validate.
   *
   * @returns An `Effect` that succeeds with a `Result` holding `void`, or fails with the wrapped rule failures.
   */
  readonly run: (document: PeppolDocument) => Effect.Effect<Result.Result<void, SchematronValidationError>>;
}

/**
 * @description Runs the schematron rules of this library against a PEPPOL document.
 *
 * @example
 *   ```ts
 *   const program = Effect.gen(function* () {
 *     const schematron = yield* Schematron;
 *     return yield* schematron.run(document);
 *   });
 *   ```;
 *
 * @see {@link SchematronShape}
 */
export class Schematron extends Context.Service<Schematron, SchematronShape>()('@endevops/peppol-schema/schematron/Schematron') {
  /**
   * @description Layer that builds the {@link Schematron} service from the rule validators in `ruleValidators`.
   */
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
