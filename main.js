import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  const myArgs = process.argv.slice(2);
  try {
    if (myArgs.length !== 1) throw "Invalid Argument Provided!";
    let pages = await crawlPage(myArgs[0], myArgs[0], {});
    printReport(pages);
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

main();
