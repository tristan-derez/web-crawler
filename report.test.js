import { test, expect, describe } from "@jest/globals";
import { sortPages } from "./report.js";

describe("sortPages function", () => {
  test("sortPages should sort page by number of apparition descending", () => {
    const input = {
      url1: 30,
      url2: 1,
      url3: 3,
      url4: 2,
      url5: 7,
    };
    const actual = sortPages(input);
    const expected = [
      ["url1", 30],
      ["url5", 7],
      ["url3", 3],
      ["url4", 2],
      ["url2", 1],
    ];
    expect(actual).toEqual(expected);
  });

  test("sortPages should return an empty array if input is an empty object", () => {
    const input = {};
    const actual = sortPages(input);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
