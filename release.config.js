let service = process.env.SERVICE;

module.exports = {
    branches: 'main',
    commitPaths: [`${service}/*`, 'common/*'],
    tagFormat: service + '-v${version}',
    repositoryUrl:'https://github.com/brascat/release-please-test',
    debug:'false',
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/github'
    ]
}