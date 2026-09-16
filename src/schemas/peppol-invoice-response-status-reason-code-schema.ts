import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolOpStatusAction } from '#/schemas/values/op-status-action-schema.ts';
import { PeppolOpStatusReason } from '#/schemas/values/op-status-reason-schema.ts';

export class PeppolInvoiceResponseStatusReasonCodeReason extends opaque<PeppolInvoiceResponseStatusReasonCodeReason>()(
  Schema.Struct({
    value: PeppolOpStatusReason,
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
    value: PeppolOpStatusAction,
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

export class PeppolInvoiceResponseStatusReasonCode extends opaque<PeppolInvoiceResponseStatusReasonCode>()(
  Schema.Union([PeppolInvoiceResponseStatusReasonCodeAction, PeppolInvoiceResponseStatusReasonCodeReason])
) {}
