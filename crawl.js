import { JSDOM } from "jsdom";
import fetch from "node-fetch";

export function normalizeURL(URLString) {
  const myURL = new URL(URLString);
  return myURL.href;
}

export function getURLsFromHTML(htmlBody, baseURL) {
  const { document } = new JSDOM(htmlBody).window;
  const allURLs = [];
  document.querySelectorAll("a").forEach((ele) => {
    let urlString = ele.href;
    if (
      urlString.indexOf("http://") === 0 ||
      urlString.indexOf("https://") === 0
    ) {
      allURLs.push(urlString);
    } else {
      urlString = baseURL.concat(urlString);
      allURLs.push(urlString);
    }
  });
  return allURLs;
}

export async function crawlPage(base_url, currentURL, pages) {
  const baseURLObject = new URL(base_url);
  const currentURLObject = new URL(currentURL);

  if (baseURLObject.origin !== currentURLObject.origin) return pages;

  let normalizedcurrentURL = normalizeURL(currentURL);
  if (normalizedcurrentURL in pages) {
    pages[normalizedcurrentURL] += 1;
    return pages;
  }

  pages[normalizedcurrentURL] = 1;
  let response;
  try {
    response = await fetch(normalizedcurrentURL);
    response = await response.text();
  } catch (err) {
    return;
  }

  let allURLs = getURLsFromHTML(response, base_url);

  for (const url of allURLs) {
    await crawlPage(base_url, url, pages);
  }
  return pages;
}
