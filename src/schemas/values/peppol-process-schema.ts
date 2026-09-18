import { Schema } from 'effect';

import type { ProcessesKeys } from '#/values/processes.generated';

import { processes, processesKeys } from '#/values/processes.generated';

/**
 * @description A full PEPPOL business process identifier in `<scheme>::<value>` form from the known processes table.
 *
 * @example
 *   ```ts
 *   'cenbii-procid-ubl::urn:fdc:peppol.eu:2017:poacc:billing:01:1.0';
 *   ```;
 *
 * @see {@link processes}
 */
export const PeppolProcess = Schema.TemplateLiteral([Schema.Literals(processesKeys), Schema.Literal('::'), Schema.String])
  .check(
    Schema.makeFilter((val: string) => {
      const [prefix, suffix] = val.split('::');
      if (prefix === undefined || suffix === undefined) return false;
      const info = processes[prefix as ProcessesKeys];
      return info !== undefined && info.some(v => v === suffix);
    })
  )
  .pipe(Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolProcess}.
 */
export type PeppolProcess = Schema.Schema.Type<typeof PeppolProcess>;

/**
 * @description A PEPPOL business process identifier key as defined by the processes codelist.
 *
 * @see {@link processes}
 */
export type PeppolProcesses = Schema.Codec.Encoded<typeof PeppolProcess>;
