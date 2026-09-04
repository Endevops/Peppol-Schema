import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolContact } from '#/schemas/fields/contact-schema';
import type { RecursivePartial } from '#/types';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodeContact(node: XmlNode, ...path: Array<string>): RecursivePartial<PeppolContact> | undefined {
  const contactNode = getProp(node, ...path);
  if (!contactNode) return undefined;

  return {
    electronicMail: strOrUnd(contactNode, 'cbc:ElectronicMail'),
    name: strOrUnd(contactNode, 'cbc:Name'),
    telephone: strOrUnd(contactNode, 'cbc:Telephone'),
  };
}
