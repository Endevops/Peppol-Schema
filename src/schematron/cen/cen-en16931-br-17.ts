import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-17',
  level: 'fatal',
  message: 'The Payee name (BT-59) shall be provided in the Invoice, if the Payee (BG-10) is different from the Seller (BG-4)',
} as const satisfies SchematronRule;

export function validateCenEn16931Br17(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !document.payeeParty ||
    (typeof document.payeeParty.partyName.name === 'string' &&
      document.payeeParty.partyName.name.trim() !== '' &&
      document.payeeParty.partyName.name !== document.accountingSupplierParty.partyLegalEntity.registrationName &&
      (document.payeeParty.partyIdentification?.id?.id === undefined ||
        document.payeeParty.partyIdentification.id.id !== document.accountingSupplierParty.partyIdentification?.id?.id));
  return schematronResult(rule, passed);
}
