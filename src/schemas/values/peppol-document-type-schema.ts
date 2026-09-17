import { Predicate, Schema } from 'effect';

import type { DocumentTypesTableKeys } from '#/values/document-type.generated';

import { opaque } from '#/schemas/utils/opaque.ts';
import { documentTypesTable, documentTypesTableKeys } from '#/values/document-type.generated';

/**
 * @description A full PEPPOL document type identifier in `<scheme>::<value>` form. The scheme prefix and value must both be known.
 *
 * @see {@link documentTypesTable}
 */
export class PeppolDocumentType extends opaque<PeppolDocumentType>()(
  Schema.TemplateLiteral([Schema.Literals(documentTypesTableKeys), Schema.Literal('::'), Schema.String])
    .check(
      Schema.makeFilter((val: string) => {
        const [prefix, ...suffix] = val.split('::');
        if (Predicate.isNullish(prefix) || !documentTypesTableKeys.includes(prefix as never)) return false;
        const info = documentTypesTable[prefix as DocumentTypesTableKeys];
        return Predicate.isNotNullish(info) && info.some(v => v === suffix.join('::'));
      })
    )
    .pipe(Schema.toStandardSchemaV1)
) {}
