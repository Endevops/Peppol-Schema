import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolMessageLevelResponseParty } from '#/schemas/message-level-response-party-schema';
import type { RecursivePartial } from '#/types';

import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address';
import { getProp } from '#/helpers/get-prop';

export function decodeMessageLevelParty(party: XmlNode, ...path: Array<string>): RecursivePartial<PeppolMessageLevelResponseParty> | undefined {
  const val = getProp(party, ...path);
  if (!val) return undefined;
  return { endpointId: decodeElectronicAddress(val, 'cbc:EndpointID') };
}
