import { Record, Schema } from 'effect';

import { documentTypesTable } from '#/values/document-type.generated';

const values = Record.values(documentTypesTable).flat();

/**
 * @description Validates the value part of a PEPPOL document type identifier (the portion after the scheme prefix) against the known document type table.
 *
 * @param error - The error message to use when validation fails. Defaults to `'invalid Peppol document type value'`.
 *
 * @returns An Effect schema that accepts only valid document type values.
 *
 * @see {@link documentTypesTable}
 */
export const documentTypeValuesSchema = Schema.String.check(Schema.makeFilter((val: string) => values.includes(val as never)));
