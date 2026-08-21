import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = { id: 'PEPPOL-EN16931-R008', level: 'fatal', message: 'Document MUST not contain empty elements.' } as const satisfies SchematronRule;

function containsEmptyElement(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return value.trim() === '';
  }
  if (Array.isArray(value)) {
    return value.some(containsEmptyElement);
  }
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).some(containsEmptyElement);
  }
  return false;
}

export function validatePeppolEn16931R008(document: PeppolDocument): SchematronRuleResult {
  return schematronResult(rule, !containsEmptyElement(document));
}
