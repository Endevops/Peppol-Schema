import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';
import { mimeCodesKeys } from '#/values/mime-codes.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL001',
  level: 'fatal',
  message: 'Mime code must be according to subset of IANA code list.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931CL001(document: PeppolDocument): boolean {
  const mimeCodes = (document.additionalDocumentReferences ?? []).flatMap(ref => {
    const binary = ref.attachment?.embeddedDocumentBinaryObject;
    return binary ? [binary.mimeCode] : [];
  });
  const passed = mimeCodes.every(code => (mimeCodesKeys as ReadonlyArray<string>).includes(code));
  return passed;
}

export const validatePeppolEn16931CL001 = schematronRule(rule, evaluatePeppolEn16931CL001);
