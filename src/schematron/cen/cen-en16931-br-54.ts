import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-54',
  level: 'fatal',
  message: 'Each Item attribute (BG-32) shall contain an Item attribute name (BT-160) and an Item attribute value (BT-161).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br54(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line =>
    (line.item.additionalItemProperties ?? []).every(
      prop => typeof prop.name === 'string' && prop.name.trim() !== '' && typeof prop.value === 'string' && prop.value.trim() !== ''
    )
  );
  return passed;
}

export const validateCenEn16931Br54 = schematronRule(rule, evaluateCenEn16931Br54);
