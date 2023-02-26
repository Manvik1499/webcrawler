const { test, expect } = require('@jest/globals')

const { normalizeURL } = require('./crawl.js')

test('URL -> normalizedURL', () => {
    expect(normalizeURL('URL')).toBe('URL1');
  });

