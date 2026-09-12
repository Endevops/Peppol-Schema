import { Effect, Predicate } from 'effect';

import type { PeppolPaymentTerms } from '#/schemas/fields/payment-terms-schema';

export const encodePaymentTerms = Effect.fn(function* (paymentTerms: PeppolPaymentTerms | undefined) {
  if (Predicate.isNullish(paymentTerms)) return undefined;

  return { 'cbc:Note': paymentTerms.note };
});
