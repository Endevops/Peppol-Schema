import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolInvoiceLine } from '#/schemas/fields/invoice-line-schema';
import type { RecursivePartial } from '#/types';

import { decodeLineShared } from '#/decoders/fields/decode-line-shared';
import { decodeQuantity } from '#/decoders/fields/decode-quantity';
import { getArray } from '#/helpers/get-array';

export function decodeInvoiceLines(doc: XmlNode, ...path: Array<string>): Array<RecursivePartial<PeppolInvoiceLine>> | undefined {
  const arr = getArray(doc, ...path);
  if (!arr.length) return undefined;

  return arr.map(lineNode => {
    const shared = decodeLineShared(lineNode);
    return { ...shared, invoicedQuantity: decodeQuantity(lineNode, 'cbc:InvoicedQuantity') };
  });
}
