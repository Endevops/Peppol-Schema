import { Schema } from 'effect';

import { opaque } from '#/effect/utils/opaque';
import { opStatusActionSchema } from '#/effect/values/op-status-action-schema';
import { opStatusReasonSchema } from '#/effect/values/op-status-reason-schema';

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
