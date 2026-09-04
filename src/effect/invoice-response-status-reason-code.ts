import { Schema } from 'effect';

import { opStatusActionSchema } from './values/op-status-action';
import { opStatusReasonSchema } from './values/op-status-reason';

export const invoiceResponseStatusReasonCode = Schema.Union([
  Schema.Struct({
    value: opStatusActionSchema(),
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: Schema.Literal('OPStatusAction'),
  }),
  Schema.Struct({
    value: opStatusReasonSchema(),
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: Schema.Literal('OPStatusReason'),
  }),
]);

export type InvoiceResponseStatusReasonCode = typeof invoiceResponseStatusReasonCode.Type;
