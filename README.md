# @endevops/peppol-schema

TypeScript library for PEPPOL schema validation and parsing.

## Install

```bash
pnpm add @endevops/peppol-schema
```

## Usage

```ts
import { parseDocument } from '@endevops/peppol-schema';
import { InvoiceSchema } from '@endevops/peppol-schema/schemas';
import { validatePEPPOL } from '@endevops/peppol-schema/validations';
import { InvoiceTypeCode } from '@endevops/peppol-schema/values';
```

## Entry Points

| Import path                           | Description                                  |
| ------------------------------------- | -------------------------------------------- |
| `@endevops/peppol-schema`             | Main exports (parser, types)                 |
| `@endevops/peppol-schema/schemas`     | Zod schemas (invoice, credit-note, etc.)     |
| `@endevops/peppol-schema/validations` | PEPPOL validation rules                      |
| `@endevops/peppol-schema/values`      | Generated value enums from PEPPOL code lists |

## Development

```bash
pnpm install
pnpm build          # Build with tsdown
pnpm dev            # Watch mode
pnpm oxlint         # Lint
pnpm oxfmt .        # Format
pnpm vitest run     # Test
tsc --noEmit        # Typecheck
```

## Tech Stack

- [Effect](https://effect.website/) - Typed effects & Schema decoders
- [Zod v4](https://zod.dev/) - Runtime validation
- [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) / [fast-xml-builder](https://github.com/NaturalIntelligence/fast-xml-builder) - XML parsing
- [tsdown](https://tsdown.dev/) - Bundling (unbundled ESM)
- [oxlint](https://oxc.rs/) / [oxfmt](https://oxc.rs/) - Linting & formatting
- [Vitest](https://vitest.dev/) - Testing

## License

MIT
