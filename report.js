export function printReport(pages) {
  // Create items array
  var items = Object.keys(pages).map(function (key) {
    return [key, pages[key]];
  });
  // Sort the array based on the second element
  items.sort(function (first, second) {
    return second[1] - first[1];
  });
  items.map((ele) => {
    console.log(`Found ${ele[1]} internal links to ${ele[0]}`)
  })
}
