import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';
import { mimeCodesKeys } from '#/values/mime-codes.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL001',
  level: 'fatal',
  message: 'Mime code must be according to subset of IANA code list.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931CL001(document: PeppolDocument): SchematronRuleResult {
  const mimeCodes = (document.additionalDocumentReferences ?? []).flatMap(ref => {
    const binary = ref.attachment?.embeddedDocumentBinaryObject;
    return binary ? [binary.mimeCode] : [];
  });
  const passed = mimeCodes.every(code => (mimeCodesKeys as ReadonlyArray<string>).includes(code));
  return schematronResult(rule, passed);
}
