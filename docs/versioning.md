# Versioning Strategy

Semantic Versioning driven by **Conventional Commits**, executed automatically by
[**semantic-release**](https://semantic-release.gitbook.io/semantic-release) in CI.
There is no manual version bumping and no GitVersion/.NET dependency.

## Model

- **Version numbers** follow [SemVer 2.0.0](https://semver.org/): `MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]`.
- **Version selection** is derived from commit messages. A commit that does not match a
  release rule triggers no release.
- **Tags** are created automatically as `vMAJOR.MINOR.PATCH` (e.g. `v1.2.3`) and are the
  only tags the repository uses.
- **Changelog / GitHub releases** are generated from the same commits.

## Branch → channel mapping

| Branch      | Version channel        | Example          | npm dist-tag |
| ----------- | ---------------------- | ---------------- | ------------ |
| `master`    | Stable release         | `1.2.3`          | `latest`     |
| `develop`   | Beta prerelease        | `1.2.3-beta.1`   | `beta`       |
| `feature/*` | Alpha prerelease       | `1.2.3-alpha.1`  | `alpha`      |
| `hotfix/*`  | Release-candidate prerelease | `1.2.3-rc.1` | `rc`       |

Stable releases happen **only** on `master`. Pre-release channels never touch `latest`.
Work that lands on a pre-release branch is re-analyzed when merged into `master`, so the
same commits can produce `1.2.3-beta.1` on `develop` and then `1.2.3` on `master`.

## Version bump rules

Applied from the **most significant** commit since the last release.

| Commit message                                        | Bump   | Example result |
| ----------------------------------------------------- | ------ | -------------- |
| `feat!:` / `fix!:` / `BREAKING CHANGE:` footer        | MAJOR  | `1.2.3` → `2.0.0` |
| `feat:`                                               | MINOR  | `1.2.3` → `1.3.0` |
| `fix:`, `perf:`                                      | PATCH  | `1.2.3` → `1.2.4` |
| `build:`, `chore:`, `ci:`, `docs:`, `refactor:`, `revert:`, `style:`, `test:` | no release | — |

Breaking changes are expressed either with an `!` after the type (`feat!:`)
or with a `BREAKING CHANGE:` trailer in the commit body.

**First release:** the repository has no tags yet and the package is at `0.0.1`.
The first release will be computed from existing history and land as `1.0.0`
(the project already contains `feat:` commits), which is above the currently
published `0.0.1`.

## What CI does

`.github/workflows/ci.yml`:

1. **`build-test`** runs on every push and pull request: `pnpm install`,
   `pnpm lint`, `pnpm test`, `pnpm build`.
2. **`release`** runs after a successful `build-test`, on pushes to `master`,
   `develop`, `feature/*` or `hotfix/*` only. It runs `semantic-release`, which:
   - analyzes commits since the last tag,
   - computes the next version per the rules above,
   - updates `package.json` in the packed artifact,
   - publishes to npm with OIDC **trusted publishing** and **provenance**
     (no `NPM_TOKEN` secret needed; the job carries `id-token: write`),
   - pushes the `vX.Y.Z` tag,
   - opens a GitHub Release with the generated changelog.

If no release-worthy commit exists, `semantic-release` exits without releasing.

## Manual operations

| Goal                       | How                                                             |
| -------------------------- | --------------------------------------------------------------- |
| Cut a patch release        | Commit `fix:` on `master` (or merge a PR with one) and push.    |
| Cut a minor release        | Commit `feat:` on `master` and push.                            |
| Cut a major release        | Commit with `BREAKING CHANGE:` / `feat!:` on `master` and push. |
| Release a beta             | Push to `develop`.                                              |
| Release an alpha           | Push to a `feature/*` branch.                                   |
| Publish no version         | Use `chore:`, `docs:`, `refactor:`, etc.                        |

Do **not** tag releases by hand. `v*` tags created manually bypass the changelog and
provenance flow and can confuse the next analysis.

## Migration from GitVersion

The old `GitVersion.yml` (Invoicify) maps as follows:

| GitVersion concept                                   | semantic-release equivalent                                |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| `.NET` runtime + `gittools/actions/gitversion/*`     | Node.js `semantic-release` + a workflow job                |
| `commit-message-incrementing: Enabled`               | Conventional Commits analysis (built-in)                   |
| `major-version-bump-message` regex                   | `BREAKING CHANGE:` footer / `!` suffix                     |
| `minor-version-bump-message` (`feat`)                | `feat:` commits                                            |
| `patch-version-bump-message` (`fix`/`chore`/...)     | `fix:`, `perf:` commits                                    |
| `tag-prefix: '[vV]?'`                                | `tagFormat: 'v${version}'`                                 |
| `mode: ContinuousDeployment`                         | release on every push to a release branch                  |
| `branches.main` (`^master$`, release)                | `master` (stable)                                          |
| `branches.develop` (label `beta`)                    | `develop` → `prerelease: beta`                             |
| `branches.feature` (label `alpha`)                   | `feature/*` → `prerelease: alpha`                          |
| `branches.hotfix` (patch)                            | `hotfix/*` → `prerelease: rc`                              |
| `prevent-increment.when-current-commit-tagged`       | built-in: tagged commits are skipped                       |
| `mathieudutour/github-tag-action`                    | tag created by `semantic-release` itself                   |
| git-cliff changelog                                  | `@semantic-release/release-notes-generator` + `@semantic-release/github` |

## Configuration files

| File                  | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `.releaserc.yml`      | Branch → channel mapping and plugin list            |
| `.github/workflows/ci.yml` | Build/test gate + `release` job                 |
| `package.json`        | `semantic-release` in `devDependencies`            |

## Related

- [Conventional Commits specification](https://www.conventionalcommits.org)
- [semantic-release docs](https://semantic-release.gitbook.io/semantic-release)
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers)
