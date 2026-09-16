import { Schema } from 'effect';

import type { ProcessesKeys } from '#/values/processes.generated';

import { opaque } from '#/schemas/utils/opaque.ts';
import { processes, processesKeys } from '#/values/processes.generated';

/**
 * @description Validates a full PEPPOL business process identifier (`<scheme>::<value>`) against the known processes.
 *
 * @param error - The custom error message to use when validation fails. Defaults to `'invalid peppol process identifier'`.
 *
 * @returns An Effect schema that matches a valid `scheme::value` process identifier.
 *
 * @see {@link processes}
 */
export class PeppolProcess extends opaque<PeppolProcess>()(
  Schema.TemplateLiteral([Schema.Literals(processesKeys), Schema.Literal('::'), Schema.String]).check(
    Schema.makeFilter((val: string) => {
      const [prefix, suffix] = val.split('::');
      if (prefix === undefined || suffix === undefined) return false;
      const info = processes[prefix as ProcessesKeys];
      return info !== undefined && info.some(v => v === suffix);
    })
  )
) {}

/**
 * @description A PEPPOL business process identifier key as defined by the processes codelist.
 *
 * @see {@link processes}
 */
export type PeppolProcesses = Schema.Codec.Encoded<typeof PeppolProcess>;
