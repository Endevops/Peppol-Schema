import type { XmlNode } from '#/helpers/get-prop';
import type { InvoiceDocumentResponseParty } from '#/schemas/invoice-response';
import type { RecursivePartial } from '#/types';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeInvoiceMessageDocumentParty(
  party: XmlNode,
  ...path: Array<string>
): RecursivePartial<InvoiceDocumentResponseParty> | undefined {
  const val = getProp(party, ...path);
  if (!val) return undefined;
  const partyName = getProp(val, 'cac:PartyName');
  return {
    partyIdentification: decodeIdentifier(val, 'cac:PartyIdentification', 'cbc:ID'),
    partyName: partyName ? { name: strOrUnd(partyName, 'cbc:Name') } : undefined,
  };
}
