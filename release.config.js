const fs = require('fs');
let service = process.env.SERVICE;
const inputFile = 'gib-impacted.log';

function processPathsFile() {
    const affectedPaths = []
    const fileContent = fs.readFileSync(inputFile, 'utf-8', (err, data) => {
        console.error('Error processing the file:', data);
    })
    console.log(fileContent);
    const lines = fileContent.split('\n');

    lines.forEach((line) => {
        if(line !== "common" && line !== "") {
            const modifiedLine = line + '/*';
            affectedPaths.push(modifiedLine);
        }
    })
    console.log('Services affected: ', affectedPaths);

    return affectedPaths;
}

module.exports = {
    branches: 'main',
    commitPaths: processPathsFile(inputFile),
    //commitPaths: [`${service}/*`, 'common/*', '*.*'],
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