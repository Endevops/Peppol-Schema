import type { FormatOptions, ParseOptions } from 'date-fns';

import { tz } from '@date-fns/tz';
import { format, parse } from 'date-fns';
import * as z from 'zod/mini';

import { xsdTime } from '#/schemas/utils/xsd-time';

const dateFnsOptions = { in: tz('UTC') } as const satisfies ParseOptions & FormatOptions;

/**
 * @description Parser function for date-only values.
 */
export function timeOnlyParser() {
  return z.codec(z.date(), xsdTime, {
    decode(value) {
      return typeof value === 'string' ? value : format(value, 'HH:mm:ssXXX', dateFnsOptions);
    },
    encode(value) {
      return parse(value, 'HH:mm:ssXXX', new Date(), dateFnsOptions);
    },
  });
}
