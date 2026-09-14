import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { opStatusActionSchema } from '#/schemas/values/op-status-action-schema.ts';
import { opStatusReasonSchema } from '#/schemas/values/op-status-reason-schema.ts';

export class PeppolInvoiceResponseStatusReasonCodeReason extends opaque<PeppolInvoiceResponseStatusReasonCodeReason>()(
  Schema.Struct({
    value: opStatusReasonSchema,
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: Schema.Literal('OPStatusReason'),
  })
) {}

export class PeppolInvoiceResponseStatusReasonCodeAction extends opaque<PeppolInvoiceResponseStatusReasonCodeAction>()(
  Schema.Struct({
    value: opStatusActionSchema,
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: Schema.Literal('OPStatusAction'),
  })
) {}

export const peppolInvoiceResponseStatusReasonCodeSchema = Schema.Union([
  PeppolInvoiceResponseStatusReasonCodeAction,
  PeppolInvoiceResponseStatusReasonCodeReason,
]);

export type PeppolInvoiceResponseStatusReasonCode = typeof peppolInvoiceResponseStatusReasonCodeSchema.Type;
