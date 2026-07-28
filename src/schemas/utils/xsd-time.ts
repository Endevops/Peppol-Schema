import * as z from 'zod/mini';

export const xsdTime = z
  .string()
  .check(
    z.regex(/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|-0[1-9]|-1\d|-2[0-3]|-00:?(?:0[1-9]|[1-5]\d)|\+[01]\d|\+2[0-3])?(?:|:?[0-5]\d)$/, {
      error: 'Invalid ISO time',
    })
  );
