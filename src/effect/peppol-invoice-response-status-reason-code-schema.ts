import { Schema } from 'effect';

import { opStatusActionSchema } from '#/effect/values/op-status-action-schema';
import { opStatusReasonSchema } from '#/effect/values/op-status-reason-schema';

export const peppolInvoiceResponseStatusReasonCodeSchema = Schema.Union([
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

export type InvoiceResponseStatusReasonCode = typeof peppolInvoiceResponseStatusReasonCodeSchema.Type;
