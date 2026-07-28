import type { PeppolPaymentTerms } from '#/schemas/fields/payment-terms-schema';

export function encodePaymentTerms(paymentTerms: PeppolPaymentTerms | undefined) {
  if (!paymentTerms) return undefined;

  return { 'cbc:Note': paymentTerms.note };
}
