const { JSDOM } = require('jsdom');

const normalizeURL = (url) => {
    const urlObject = new URL(url);

    const { host } = urlObject;
    const { pathname } = urlObject;
    let normalizedURL = `${host}${pathname}`;

    if(normalizedURL.length > 0 && normalizedURL[normalizedURL.length - 1] === '/') {
        normalizedURL = normalizedURL.slice(0, normalizedURL.length - 1);
    }

    return normalizedURL;
};

const getURLsFromHTML = (htmlString, baseURL) => {
    if(!baseURL) {
        console.log('Please provide a baseURL');
        return;
    }
    const dom = new JSDOM(htmlString);
    const tags = Array.from(dom.window.document.querySelectorAll("a")).map(t => t.href);
    const builtUrls = [];

    for(let i = 0; i < tags.length; i++) {
        if (tags[i][0] === '/') {
            try {
                builtUrls.push(new URL(tags[i], baseURL).href)
            } catch (e){
                console.log(`${e.message}:: ${tags[i]}`)
            }
        } else {
            try {
                builtUrls.push(new URL(tags[i]).href)
            } catch (e) {
                console.log(`${e.message}: ${tags[i]}`)
            }
        }
    }

    return builtUrls;
};


const crawlPage = async (baseURL, currentURL, pages) => {
    const current = new URL(currentURL).host;
    const base = new URL(baseURL).host;

    if(current !== base) {
        return pages;
    }

    const normalizedURL = normalizeURL(currentURL);

    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++;
        return pages;
    } else {
        pages[normalizedURL] = 1;
    }

    let htmlBody = '';
    try {
        const res = await fetch(currentURL);
        if(res.status >= 400) {
            console.log(`Got HTTP error, status code: ${res.status}`);
            return;
        }

        const contentType = res.headers.get("Content-Type");

        if(!contentType.includes('text/html')) {
            console.log('Probably not a valid webpage...')
            return pages;
        }

        htmlBody = await res.text();
    } catch (e) {
        console.log(`${e.message}`)
    }

    const urlArray = getURLsFromHTML(htmlBody, baseURL);

    for(const nextUrl of urlArray) {
        pages = await crawlPage(baseURL, nextUrl, pages);
    }

    return pages;
};

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
