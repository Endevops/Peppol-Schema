import * as z from 'zod/mini';

import { opStatusActionSchema } from '#/schemas/values/op-status-action';
import { opStatusReasonSchema } from '#/schemas/values/op-status-reason';

export const invoiceResponseStatusReasonCode = z.discriminatedUnion('listId', [
  z.object({
    value: opStatusActionSchema(),
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: z.literal('OPStatusAction'),
  }),
  z.object({
    value: opStatusReasonSchema(),
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: z.literal('OPStatusReason'),
  }),
]);
export type InvoiceResponseStatusReasonCode = z.infer<typeof invoiceResponseStatusReasonCode>;
