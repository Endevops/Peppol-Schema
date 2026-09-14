import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-65',
  level: 'fatal',
  message: 'The Item classification identifier (BT-158) shall have a Scheme identifier.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br65(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line =>
    (line.item.commodityClassifications ?? []).every(cc => typeof cc.itemClassification.listId === 'string')
  );
  return passed;
}

export const validateCenEn16931Br65 = schematronRule(rule, evaluateCenEn16931Br65);
