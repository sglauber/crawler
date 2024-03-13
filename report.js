const printReport = (pages) => {
    const sortedPages = sortPages(pages)

    console.log("--------------------------")
    console.log(`The report is starting...`);
    for(const [url, count] of sortedPages) {
        console.log(`Found ${count} internal links to ${url}`);
    }
    console.log("--------------------------")
};

const sortPages = (pages) => {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((pageA, pageB) => pageB[1] - pageA[1])
    return pagesArr;
};

module.exports = { printReport, sortPages };
