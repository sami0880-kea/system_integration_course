console.log(new Date()); // UTC Standard: ISO 8601

console.log(Date()); // Local Date

console.log(Date.now()); // Unix Epoch Time

console.log(new Date().toLocaleString());

const date = new Date();
const danishDate = new Intl.DateTimeFormat("da-dk").format(date);
console.log("Danish Date:", danishDate);

const americanDate = new Intl.DateTimeFormat("en-us").format(date);
console.log("American Date:", americanDate);
