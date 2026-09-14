import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-17',
  level: 'fatal',
  message: 'The Payee name (BT-59) shall be provided in the Invoice, if the Payee (BG-10) is different from the Seller (BG-4)',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br17(document: PeppolDocument): boolean {
  const passed =
    !document.payeeParty ||
    (typeof document.payeeParty.partyName.name === 'string' &&
      document.payeeParty.partyName.name.trim() !== '' &&
      document.payeeParty.partyName.name !== document.accountingSupplierParty.partyLegalEntity.registrationName &&
      (document.payeeParty.partyIdentification?.id?.id === undefined ||
        document.payeeParty.partyIdentification.id.id !== document.accountingSupplierParty.partyIdentification?.id?.id));
  return passed;
}

export const validateCenEn16931Br17 = schematronRule(rule, evaluateCenEn16931Br17);
