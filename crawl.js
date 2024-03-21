import { JSDOM } from "jsdom";

export const normalizeURL = (url) => {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;

  if (fullPath.endsWith("/")) {
    fullPath = fullPath.slice(0, -1);
  }

  return fullPath;
};

export const getURLsFromHTML = (htmlBody, baseURL) => {
  const dom = new JSDOM(htmlBody, { url: baseURL });
  const links = Array.from(dom.window.document.querySelectorAll("a"));
  const urls = [];

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href) {
      const absoluteURL = new URL(href, baseURL).href;
      urls.push(absoluteURL);
    }
  });

  return urls;
};

export const crawlPage = async (baseURL, currentURL, pages) => {
  const currentHost = new URL(currentURL);
  const baseHost = new URL(baseURL);

  if (currentHost.hostname !== baseHost.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`crawling ${currentURL}`);

  try {
    const response = await fetch(currentURL);
    const contentType = response.headers.get("content-type");

    if (response.status >= 400) {
      console.error(`Error ${response.status}: ${response.statusText}`);
      return pages;
    }

    if (contentType && !contentType.includes("text/html")) {
      console.error("Error: Content-type is not text/html");
      return pages;
    }

    const htmlText = await response.text();
    const urlsToParse = getURLsFromHTML(htmlText, currentURL);

    for (const nextURL of urlsToParse) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }

    return pages;
  } catch (error) {
    console.error(error.message);
  }
};
