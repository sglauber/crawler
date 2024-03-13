const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');


test('Check URL with slash', () => {
    const url = 'https://jestjs.io/';
    expect(normalizeURL(url)).toBe('jestjs.io');
});

test('Check URL with pathname', () => {
    const url = 'https://arkosedu.com.br/blog';
    expect(normalizeURL(url)).toBe('arkosedu.com.br/blog');
});


test('Check URL with capital letters', () => {
  const url = 'https://NIXOS.org/learn/';
  expect(normalizeURL(url)).toBe('nixos.org/learn')
});

test('Check URL with port number', () => {
    const url = 'https://www.example.org:1111';
    expect(normalizeURL(url)).toBe('www.example.org:1111')
});


test('Check if it return a fullURL', () => {
    const htmlString = `
    <html>
    <body>
        <a href = "/xyz.html">
    </body>
    </html>
    `;
    const baseURL = 'http://www.example.com';
    expect(getURLsFromHTML(htmlString, baseURL)).toEqual(['http://www.example.com/xyz.html'])
});

test('Check if it return a array of tags', () => {
    const htmlString = `
    <html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://jestjs.io/docs/getting-started"><span>Go to Boot.dev</span></a>
    </body>
    </html>
    `;
    const baseURL = `http://boot.dev/`;
    expect(getURLsFromHTML(htmlString, baseURL)).toEqual(['https://blog.boot.dev/', 'https://jestjs.io/docs/getting-started']);
});

test('getURLsFromHTML handle error', () => {
  const htmlString = `<html><body><a href="no/slash"></a></body></html>`
  const baseURL = 'https://blog.boot.dev'
  expect(getURLsFromHTML(htmlString, baseURL)).toEqual([])
})

