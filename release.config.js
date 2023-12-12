let service = process.env.SERVICE;

module.exports = {
    branches: 'main',
    commitPaths: [`${service}/*`, 'common/*'],
    tagFormat: service + '-v${version}',
    repositoryUrl: 'https://github.com/brascat/release-please-test',
    debug: 'false',
    preset: 'conventionalcommits',
    plugins: [
            '@semantic-release/commit-analyzer',
            '@semantic-release/release-notes-generator',
        [
            '@semantic-release/github',
            {
                labels: false,
                failComment: false,
                successComment: 'This issue has been resolved in version ' +
                    service +
                    '-v${nextRelease.version} \n\nThe release is available on [GitHub release](<github_release_url>)',
                discussionCategoryName: 'announcements'
            }
        ]
    ]
}