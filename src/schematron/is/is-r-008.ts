import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-008',
  level: 'fatal',
  message: '[IS-R-008]-If seller is icelandic and invoice contains supporting description EINDAGI then the id form must be YYYY-MM-DD',
} as const satisfies SchematronRule;

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function validateIsR008(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const eindagiReferences = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === 'EINDAGI');
  if (eindagiReferences.length === 0) {
    return schematronResult(rule, true);
  }
  const passed = eindagiReferences.every(ref => {
    const id = ref.id.id;
    return id.length === 10 && DATE_REGEX.test(id) && !Number.isNaN(Date.parse(id));
  });
  return schematronResult(rule, passed);
}
