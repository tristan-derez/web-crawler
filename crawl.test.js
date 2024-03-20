import { normalizeURL, getURLsFromHTML } from "./crawl.js";
import { test, expect, describe } from "@jest/globals";

describe("normalizeURL function", () => {
  test("normalizeURL should return an url without the protocol", () => {
    const input = "https://example.com/path";
    const actual = normalizeURL(input);
    const expected = "example.com/path";
    expect(actual).toEqual(expected);
  });

  test("normalizeURL should remove last slash from url", () => {
    const input = "https://example.com/path/";
    const actual = normalizeURL(input);
    const expected = "example.com/path";
    expect(actual).toEqual(expected);
  });

  test("normalizeURL should lowercase capital letters in URL", () => {
    const input = "https://DEV.eXAMPle.com/path";
    const actual = normalizeURL(input);
    const expected = "dev.example.com/path";
    expect(actual).toEqual(expected);
  });

  test("normalizeURL should work with http protocol", () => {
    const input = "http://DEV.eXAMPle.com/path";
    const actual = normalizeURL(input);
    const expected = "dev.example.com/path";
    expect(actual).toEqual(expected);
  });

  test("normalizeURL should throw if the url is not valid", () => {
    const input = "not.an.url";
    expect(() => normalizeURL(input)).toThrow();
  });
});

describe("getURLsFromHTML function", () => {
  test("Converts relative URLs to absolute URLs", () => {
    const htmlBody = '<a href="/page">Link</a>';
    const baseURL = "https://example.com/";
    const expectedURL = "https://example.com/page";
    const urls = getURLsFromHTML(htmlBody, baseURL);
    expect(urls).toContain(expectedURL);
  });

  test("Give the correct link when its not on the same website", () => {
    const htmlBody = "<a href='https://twitter.com/'>thats a link</a>";
    const baseURL = "https://example.com/";
    const expectedURL = "https://twitter.com/";
    const urls = getURLsFromHTML(htmlBody, baseURL);
    expect(urls).toContain(expectedURL);
  });

  test("Finds all <a> tags in the HTML", () => {
    const htmlBody =
      '<a href="/page1">Link 1</a><a href="/page2">Link 2</a><a href="/page3">Link 3</a><a href="/page4">Link 4</a>';
    const baseURL = "https://example.com/";
    const urls = getURLsFromHTML(htmlBody, baseURL);
    expect(urls).toHaveLength(4);
  });
});
