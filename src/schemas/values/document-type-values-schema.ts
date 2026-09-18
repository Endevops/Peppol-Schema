import { Record, Schema } from 'effect';

import { documentTypesTable } from '#/values/document-type.generated';

const values = Record.values(documentTypesTable).flat();

/**
 * @description The value part of a PEPPOL document type identifier (the portion after the scheme prefix) from the known document type table.
 *
 * @see {@link documentTypesTable}
 */
export const PeppolDocumentTypeValue = Schema.String.check(Schema.makeFilter((val: string) => values.includes(val as never))).pipe(
  Schema.toStandardSchemaV1
);

/**
 * @description Decoded form of {@link PeppolDocumentTypeValue}.
 */
export type PeppolDocumentTypeValue = Schema.Schema.Type<typeof PeppolDocumentTypeValue>;
