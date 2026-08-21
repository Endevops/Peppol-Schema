import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-65',
  level: 'fatal',
  message: 'The Item classification identifier (BT-158) shall have a Scheme identifier.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br65(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line =>
    (line.item.commodityClassifications ?? []).every(cc => typeof cc.itemClassification.listId === 'string')
  );
  return schematronResult(rule, passed);
}
