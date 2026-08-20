import type { FormatOptions, ParseOptions } from 'date-fns';

import { tz } from '@date-fns/tz';
import { format, parse } from 'date-fns';
import * as z from 'zod/mini';

import { dateOnly } from '#/schemas/fields/date-only-fn';

const dateFnsOptions = { in: tz('UTC') } as const satisfies ParseOptions & FormatOptions;

export function dateOnlyParser() {
  return z.codec(z.date(), z.iso.date(dateOnly.error), {
    decode(value) {
      return typeof value === 'string' ? value : format(value, 'yyyy-MM-dd', dateFnsOptions);
    },
    encode(value) {
      return parse(value, 'yyyy-MM-dd', new Date(), dateFnsOptions);
    },
  });
}
