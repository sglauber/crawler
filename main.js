const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {
    const ARGV_EXPECTED_SIZE = 3;

    if(argv.length !== ARGV_EXPECTED_SIZE ) {
        throw new Error('You must provide one argument as the baseURL');
        return;
    }

    const baseURL = argv[2];
    console.log(`Starting crawler: ${baseURL}`);

    const res = await crawlPage(baseURL, baseURL, {});
    printReport(res);
}

main();
