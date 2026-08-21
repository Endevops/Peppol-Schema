# AGENTS.md — @endevops/peppol-schema

## Quick Reference

| Task               | Command                                         |
| ------------------ | ----------------------------------------------- |
| Build              | `pnpm build`                                    |
| Dev (watch)        | `pnpm dev`                                      |
| Format             | `pnpm oxfmt .`                                  |
| Lint               | `pnpm oxlint`                                   |
| Typecheck          | `tsc --noEmit`                                  |
| Test               | `vitest run` (uses vitest from devDependencies) |
| Sort message files | `mise run sort-messages`                        |

## Project Overview

This is a **TypeScript library** (`@endevops/peppol-schema`) for PEPPOL schema validation and parsing. Built with:

- **tsdown** for bundling (unbundled ESM output)
- **Effect** for typed effects
- **Zod v4** for schema validation
- **fast-xml-parser** / **fast-xml-builder** for XML parsing
- **oxlint** + **oxfmt** for linting/formatting (OxC-based, not ESLint/Prettier)
- **Vitest** for testing (with snapshot testing via `toMatchSnapshot`)

## Structure

```
src/
├── index.ts                    # Main exports
├── schemas.ts                  # Schema exports
├── values.ts                   # Generated values exports
├── document-parser.ts          # Main XML parser (Zod schema)
├── document-parser.spec.ts     # Vitest snapshot tests
├── document.ts                 # Document types
├── helpers.ts                  # Helpers
├── constants.ts                # Constants
├── xml-options.ts              # XML parser options
├── peppol-validations/         # Validation rules
├── schemas/                    # Zod schemas (invoice, credit-note, etc.)
├── values/                     # Generated value enums (from Peppol code lists)
└── decoders/                   # Effect decoders
```

## Key Conventions

### Build & Export

- **Unbundled ESM** via tsdown (`unbundle: true`) — each export maps to its own entry
- Four public entry points: `index`, `schemas`, `validations`, `values`
- Types generated with `dts: { sourcemap: true }`
- `package.json` exports use `development` condition for `src/` during dev

### Linting & Formatting

- **oxlint** (not ESLint) with plugins: `oxc`, `typescript`, `unicorn`, `import`, `vitest`, `node`
- **oxfmt** (not Prettier) with 150-char line width, 2-space tabs, single quotes
- Override: `sort-keys` disabled for `schemas/**` and `decoders/**` (generated files)

### TypeScript

- Strict mode with `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `erasableSyntaxOnly`
- Path aliases: `#/*` → `./src/*`
- `verbatimModuleSyntax`, `isolatedModules`, `moduleDetection: force`

### Testing (Vitest)

- Snapshot tests in `document-parser.spec.ts` comparing parsed XML against committed snapshots
- Test files in `test/files/v3/` — invoice, credit-note, invoice-response, message-level-response
- Run single test: `vitest run src/document-parser.spec.ts`
- Snapshots auto-update with `vitest run -u`
- **Note**: `#/*` path aliases don't resolve in tests (no vitest.config.ts) — some tests fail to import. This is a known limitation.

### Generated Code

- `scripts/values.ts` generates value enums from Peppol code lists (run manually via `bun scripts/values.ts`)
- Output goes to `src/values/` — **do not edit generated files directly**
- Generated files have `// oxlint-disable sort-keys` header

### Effect Usage

- Uses `Effect` (v4 beta) for typed effects, `Schema` for decoding
- See `src/decoders/` for Effect Schema decoders

### XML Parsing

- `fast-xml-parser` with options in `src/xml-options.ts`
- `fast-xml-builder` for serialization
- Zod schemas parse XML strings directly

## Common Tasks

### Add a new test file

1. Add XML file to `test/files/v3/<category>/`
2. Add path to `files` array in `document-parser.spec.ts`
3. Run `vitest run -u` to generate snapshot

### Update Peppol code lists

1. Download latest code lists from Peppol
2. Place in `scripts/` (referenced by `scripts/values.ts`)
3. Run `bun scripts/values.ts`
4. Run `pnpm oxlint --fix src/values` to format generated files

## CI / Pre-commit

No CI config found. Recommended local checks before commit:

```bash
pnpm oxlint && pnpm oxfmt --check . && pnpm build && vitest run
```

**Note**: `tsc --noEmit` currently fails due to strict `exactOptionalPropertyTypes: true` in generated/decoder files. Use `pnpm build` (tsdown) for typechecking instead — it passes.

## Notable Dependencies

- **Effect** (`effect@4.0.0-beta.97`) — typed effects, Schema
- **Zod v4** (`zod@4.4.3`) — runtime validation
- **Zod Mini** (`zod/mini`) used in tests for `safeDecode`
- **tsdown** — build (uses Rolldown)
- **oxlint/oxfmt** — lint/format (OxC, fast)

## Gotchas

- **No vitest.config.ts** — uses defaults (globals: true, environment: node)
- **No .gitignore shown** — `dist/` is gitignored
- **pnpm** is package manager (pnpm-lock.yaml present)
- **mise** manages tool versions (Node, pnpm, jq)
- **TypeScript 7** (beta) with `erasableSyntaxOnly`
- Effect v4 is beta — APIs may change
