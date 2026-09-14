import { Effect } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeApplicationResponseBase = Effect.fn(function* (value: XmlNode) {
  const root = value || {};
  const doc: XmlNode = yield* getProp(root, 'ubl:ApplicationResponse');

  return {
    base: {
      customizationId: yield* strOrUnd(doc, 'cbc:CustomizationID'),
      id: yield* strOrUnd(doc, 'cbc:ID'),
      issueDate: yield* strOrUnd(doc, 'cbc:IssueDate'),
      issueTime: yield* strOrUnd(doc, 'cbc:IssueTime'),
    },
    doc,
  };
});
