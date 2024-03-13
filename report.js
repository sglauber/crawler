const printReport = (pages) => {
    const pageEntries = Object.entries(pages).sort((a,b) => mySort(a[1],b[1]))

    console.log(`The report is starting...`);
    for(let [url, count] of pageEntries) {
        console.log(`Found ${count} internal links to ${url}`);
    }
};


const mySort = (a, b) => {
    return b - a;
};

module.exports = { printReport };
