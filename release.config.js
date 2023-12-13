let service = process.env.SERVICE;

module.exports = {
    branches: 'main',
    commitPaths: [`${service}/*`, 'common/*', '*.*'],
    tagFormat: service + '-v${version}',
    repositoryUrl: 'https://github.com/brascat/release-please-test',
    debug: 'false',
    plugins: [
            '@semantic-release/commit-analyzer',
            '@semantic-release/release-notes-generator',
        [
            '@semantic-release/github',
            {
                labels: false,
                failComment: false,
                failTitle: false,
                successComment: 'This issue has been resolved in version ' +
                    service +
                    '-v${nextRelease.version} \n\nThe release is available on [GitHub release](<github_release_url>)'
            }
        ]
    ],
    preset: 'conventionalcommits',
    presetConfig: {
        types: [
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'chore', section: 'Chores' },
            { type: 'docs', hidden: true },
            { type: 'style', hidden: true },
            { type: 'refactor', section: 'Refactoring' },
            { type: 'perf', hidden: true },
            { type: 'test', hidden: true },
        ],
    }

}