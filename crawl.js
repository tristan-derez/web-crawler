import { JSDOM } from "jsdom";

export function normalizeURL(url) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;

  if (fullPath.endsWith("/")) {
    fullPath = fullPath.slice(0, -1);
  }

  return fullPath;
}

export function getURLsFromHTML(htmlBody, baseURL) {
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
}
