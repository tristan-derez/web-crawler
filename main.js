import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

const main = async () => {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error("Error: Provide exactly one argument (an URL).");
    process.exit(1);
  }

  const baseURL = args[0];

  try {
    console.log(`Starting crawler at ${baseURL}`);

    const pages = await crawlPage(baseURL, baseURL, {});

    printReport(pages);
  } catch (error) {
    console.error("Error: The provided argument is not a valid URL.");
    process.exit(1);
  }
};

main();
