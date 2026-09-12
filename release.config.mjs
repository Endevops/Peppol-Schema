/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  // Semantic-release configuration
  // Full strategy: see docs/versioning.md
  branches: ['master', { name: 'develop', prerelease: 'beta' }, { name: 'feature/*', prerelease: 'alpha' }, { name: 'hotfix/*', prerelease: 'rc' }],
  tagFormat: 'v${version}',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' },
        ],
        parserOpts: { noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'] },
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
};
