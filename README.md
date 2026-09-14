# @endevops/peppol-schema

TypeScript Effect Schema models for **PEPPOL BIS Billing 3.0** — decode, validate and encode **Invoice, Credit Note, Invoice Response and Message Level Response** XML, with generated PEPPOL code lists, Schematron rules and identifier validations (IBAN, GLN, VAT, fiscal codes).

## Install

```bash
pnpm add @endevops/peppol-schema
```

Requires `effect`, `fast-xml-parser` and `fast-xml-builder` as peer dependencies — pnpm installs them automatically unless you opt out.

## Usage

Decode any PEPPOL document from an XML string (dispatches on the root element; `ApplicationResponse` is split by `cbc:ProfileID`):

```ts
import { Schema } from 'effect';
import { PeppolCreditNote, PeppolInvoice, PeppolInvoiceResponse, PeppolMessageLevelResponse, peppolDocumentSchema } from '@endevops/peppol-schema';

const doc = Schema.decodeUnknownSync(peppolDocumentSchema)(xmlString);
if (Schema.is(PeppolInvoice)(doc)) {
  /* doc.invoiceLines … */
} else if (Schema.is(PeppolCreditNote)(doc)) {
  /* doc.creditNoteLines … */
} else if (Schema.is(PeppolInvoiceResponse)(doc)) {
  /* invoice response … */
} else if (Schema.is(PeppolMessageLevelResponse)(doc)) {
  /* message-level response … */
}

// Round-trip back to XML:
const xml = Schema.encodeUnknownSync(peppolDocumentSchema)(doc);
```

Run the Schematron rule set or a single rule:

```ts
import { Effect } from 'effect';
import { Schematron, validateCenEn16931Br01 } from '@endevops/peppol-schema/schematron';

const program = Effect.gen(function* () {
  yield* (yield* Schematron).run(doc); // fails with SchematronValidationError listing every failed rule
  yield* validateCenEn16931Br01(doc); // or run one rule directly
}).pipe(Effect.provide(Schematron.layer));
```

Validate identifiers:

```ts
import { checkPIVA, isValidGLN, isValidIBAN } from '@endevops/peppol-schema/validations';
import { invoiceTypeCodes } from '@endevops/peppol-schema/values';

isValidIBAN('IT60X0542811101000000123456'); // boolean
isValidGLN('7300010000001'); // { success: true } | { success: false; expected; actual }
checkPIVA('01234567890'); // 0 means valid
invoiceTypeCodes['380']; // 'Commercial invoice'
```

## Features

- **4 document types**: Invoice, Credit Note, Invoice Response, Message Level Response (UBL 2.1, BIS Billing 3.0) with XML round-trip via `peppolDocumentSchema`
- **Effect Schema** models with typed decode/encode and `isPeppol*` type guards
- **Generated code lists** (`/values`): currencies, countries, tax schemes, UNCL, UNTDID, EAS, ICD etc. from OpenPEPPOL
- **Schematron rules** (`/schematron`): shared PEPPOL + CEN rules and per-country overlays (`de`, `dk`, `gr`, `is`, `it`, `nl`, `no`, `se`), runnable as an Effect service or one rule at a time
- **Identifier validations** (`/validations`): IBAN, GLN, MOD97/MOD11, Luhn, ABN, plus country checks (IT Partita IVA / Codice Fiscale, SE orgnr, GR TIN)
- **XML options** (`/xml`): `fast-xml-parser` / `fast-xml-builder` options tuned for PEPPOL
- **Translation generator CLI** (`/generate-translations`) for localized field labels

## Entry Points

| Import path                                      | Description                                              |
| ------------------------------------------------ | -------------------------------------------------------- |
| `@endevops/peppol-schema`                        | Document schemas, `peppolDocumentSchema`, types          |
| `@endevops/peppol-schema/generate-translations`  | CLI that generates translation files                     |
| `@endevops/peppol-schema/schematron`             | PEPPOL + CEN + per-country Schematron rules              |
| `@endevops/peppol-schema/validations`            | Identifier and checksum validation rules                 |
| `@endevops/peppol-schema/values`                 | Generated value maps from PEPPOL code lists              |
| `@endevops/peppol-schema/xml`                    | XML parser and builder options                           |
| `@endevops/peppol-schema/constants`              | Doctype ids, process ids, profile ids, transport profile |
| `@endevops/peppol-schema/invoice-response-codes` | Invoice Response status/reason codes                     |

## Development

```bash
pnpm install
pnpm build          # Build with tsdown
pnpm dev            # Watch mode
pnpm lint           # Lint (oxlint --type-aware)
pnpm format         # Format (oxfmt)
pnpm test           # Test (vitest run)
pnpm generate       # Regenerate code lists (bun scripts/values.ts)
tsc --noEmit        # Typecheck
```

## License

Licensed under the [Apache License, Version 2.0](LICENSE).

This project generates code from Peppol BIS Billing 3.0 and related OpenPEPPOL
code lists; see [NOTICE](NOTICE) for attributions.

## Versioning

Versioning is fully automated via **semantic-release** and Conventional Commits:

- `master` → stable releases (`v1.2.3`)
- `develop` → beta prereleases
- `feature/*` → alpha prereleases
- `hotfix/*` → release-candidate prereleases

See [docs/versioning.md](docs/versioning.md) for the full strategy.

## Tech Stack

- [Effect](https://effect.website/) - Typed effects & Schema models
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) / [fast-xml-builder](https://github.com/NaturalIntelligence/fast-xml-builder) - XML parsing
- [tsdown](https://tsdown.dev/) - Bundling (unbundled ESM)
- [oxlint](https://oxc.rs/) / [oxfmt](https://oxc.rs/) - Linting & formatting
- [Vitest](https://vitest.dev/) - Testing
