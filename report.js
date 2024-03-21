export const printReport = (pages) => {
  console.log("===============");
  console.log("     REPORT    ");
  console.log("===============");
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const count = sortedPage[1];
    console.log(`Found ${count} internal links to ${url}`);
  }
};

export const sortPages = (pages) => {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((pageA, pageB) => {
    return pageB[1] - pageA[1];
  });
  return pagesArr;
};
