# AGENTS.md — @endevops/peppol-schema

TypeScript library: PEPPOL BIS Billing 3.0 Effect Schema models for Invoice, CreditNote, InvoiceResponse, MessageLevelResponse XML. Entry: `src/index.ts` (Effect schemas); XML decode/encode lives in `src/schemas/peppol-document-schema.ts` + `src/decoders/`.

## Commands

| Task             | Command                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| Install          | `pnpm install --frozen-lockfile` (engines: node >= 26, pnpm >= 11)     |
| Build / watch    | `pnpm build` / `pnpm dev` (= `vp pack` / `vp pack --watch`)            |
| Lint             | `pnpm lint` (= `vp lint . --type-aware`)                               |
| Format           | `pnpm format` (= `vp fmt`); check everything with `pnpm exec vp check` |
| Test             | `pnpm test` (= `vp test run`); coverage: `pnpm test:coverage`          |
| Single test file | `pnpm exec vp test run src/<name>.spec.ts`                             |
| Codegen          | `pnpm generate` (= `bun scripts/values.ts`, requires bun)              |

Tooling (format, lint, pack, staged checks) is configured in `vite.config.ts`; the former `oxlint.config.ts`, `.oxfmtrc.json` and `tsdown.config.ts` are gone. Pre-commit runs `vp staged` via `.vite-hooks/pre-commit`.

CI (`ci.yml`): `lint` → `test --coverage` → `build`. Release via semantic-release on push (master/develop/feature\/*/hotfix\*); do not hand-version.

## Structure

- `src/index.ts`, `src/types.ts`, `src/xml.ts`, `src/values.ts` — public surface
- `src/schemas/` — Effect Schema models (source of truth for document shapes)
- `src/decoders/` — Effect Schema decoders mirroring `schemas/`
- `src/values/` — generated code-list enums, do not hand-edit (see Codegen)
- `src/schematron/`, `src/peppol-validations/`, `src/constants/`, `src/invoice-response-codes/`, `src/helpers/`, `src/xml/`
- `scripts/values/` + `scripts/generate-translations.ts` — codegen / translation CLI
- `test/` — `custom-matchers.ts` (loaded via `vitest.config.ts` setupFiles), `test-utils.ts`, `schema-asserts.ts`, `files/` fixtures
- `src/__snapshots__/` — committed snapshots; update with `vp test run -u`

Public entry points (8, generated from the `pack` block in `vite.config.ts`): `.`, `./constants`, `./generate-translations`, `./invoice-response-codes`, `./schematron`, `./validations`, `./values`, `./xml`. Note: README also advertises `./effect`, but no `src/effect/` export exists in `package.json`/`vite.config.ts` — verify before importing it.

## Conventions

- TS strict + `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `erasableSyntaxOnly`, `verbatimModuleSyntax`, `moduleDetection: force`. No enums/namespaces or non-erasable syntax.
- Imports: `#/*` → `src/*` (also `#/test/*`, `#/assets/*`; vitest resolves via `tsconfigPaths`). Use `import type` / `type` imports (`consistent-type-imports`, separate-type-imports style). Never import barrel `#/index`, `#/schemas`, `#/values`, `#/effect`, `#/schematron`, `#/constants`, `#/peppol-validations` directly — import the specific file (`no-restricted-imports` is error).
- Lint (`lint` block in `vite.config.ts`): `sort-keys` warn (asc, minKeys 5) but off in `effect|schemas|decoders/**`; `oxc/no-barrel-file` warn except allow-listed index files; `*.spec.ts` may use `any`. Rules come from `@effect/tsgo/oxlint-presets`. Fmt (`fmt` block): 150 width, single quotes, 2-space, sorts imports + package.json scripts. `lint.options.typeCheck` is intentionally off; full type checking runs separately (`tsc --noEmit`) and surfaces two pre-existing errors today.
- Opaque structs: `opaque<Self>()(Schema.Struct({...}))` from `#/schemas/utils/opaque.ts` — never `Schema.Opaque` (doubles `dist/*.d.ts` emit).
- Generated values: objects annotated as `Record<XxxKeys, ...>` so `dist/values.d.ts` collapses to an index signature instead of thousands of props. Keep this pattern in any new generator.

## Testing

- `vitest.config.ts` defines `unit` (`src/**/*.{test,spec}`) and `integration` (`src/**/*.int.{test,spec}`) projects; integration tests get 10s hook / 30s test timeouts. Coverage excludes `src/values/**`, `src/paraglide/**`, specs.
- Adding a fixture: drop XML under `test/files/v3/<category>/`, register path in the spec's `files` array, run `vp test run -u` to write the snapshot.
