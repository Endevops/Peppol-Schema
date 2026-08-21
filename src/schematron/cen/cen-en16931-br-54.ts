import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-54',
  level: 'fatal',
  message: 'Each Item attribute (BG-32) shall contain an Item attribute name (BT-160) and an Item attribute value (BT-161).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br54(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line =>
    (line.item.additionalItemProperties ?? []).every(
      prop => typeof prop.name === 'string' && prop.name.trim() !== '' && typeof prop.value === 'string' && prop.value.trim() !== ''
    )
  );
  return schematronResult(rule, passed);
}
