import type { PeppolDocument } from '#/document';
import type { SchematronRuleResult } from '#/schematron/types';

const RULE_ID = 'PEPPOL-EN16931-R001';
const RULE_LEVEL = 'fatal';
const RULE_MESSAGE = 'Business process MUST be provided.';

/**
 * @description Validates the PEPPOL-EN16931-R001 rule: the document MUST contain a business process identifier (`cbc:ProfileID`).
 */
export function validatePeppolEn16931R001(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.profileId === 'string' && document.profileId.trim() !== '';
  return { id: RULE_ID, level: RULE_LEVEL, message: RULE_MESSAGE, passed };
}
