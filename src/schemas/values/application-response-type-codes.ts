import type { Brand } from 'effect';

import * as z from 'zod/mini';

import { applicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated';

export type ApplicationResponseType = Brand.Branded<string, 'ApplicationResponseType'>;

export function applicationResponseTypeCodeSchema(error?: string) {
  return z
    .string(error)
    .check(z.refine(val => applicationResponseTypeCodesKeys.includes(val as (typeof applicationResponseTypeCodesKeys)[number]), error));
}
