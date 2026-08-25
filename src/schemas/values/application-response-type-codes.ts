import * as z from 'zod/mini';

import type { ApplicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated';

import { applicationResponseTypeCodesKeys } from '#/values/application-response-type-codes.generated';

export type PeppolApplicationResponseType = ApplicationResponseTypeCodesKeys;

export function applicationResponseTypeCodeSchema(error?: string) {
  return z.string(error).check(z.refine(val => applicationResponseTypeCodesKeys.includes(val as never), error));
}
