import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-57',
  level: 'fatal',
  message: 'Each Deliver to address (BG-15) shall contain a Deliver to country code (BT-80).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br57(document: PeppolDocument): SchematronRuleResult {
  const passed =
    typeof document.delivery?.deliveryLocation?.address?.countryCode.identificationCode === 'string' &&
    document.delivery.deliveryLocation.address.countryCode.identificationCode.trim() !== '';
  return schematronResult(rule, passed);
}
