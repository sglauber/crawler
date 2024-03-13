const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js');

async function main() {
    const ARGV_EXPECTED_SIZE = 3;
    if (argv.length < ARGV_EXPECTED_SIZE){
        console.log('no website provided')
    }

    if (argv.length > ARGV_EXPECTED_SIZE){
        console.log('too many arguments provided')
    }

    const baseURL = argv[2];
    console.log(`Starting crawling of: ${baseURL}`);

    const res = await crawlPage(baseURL, baseURL, {});

    printReport(res);
}

main();
