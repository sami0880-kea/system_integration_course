import fs from "fs";
import * as cheerio from "cheerio";

// const response = await fetch("https://www.proshop.dk/baerbar");
// const result = await response.text();
// fs.writeFileSync("index.html", result);

import { load } from "cheerio";

const page = await fs.readFileSync("index.html", "utf8");

const $ = load(page);

const products = [];

$("#products [product]").each((index, element) => {
  const product = $(element);
  const name = product.find("[product-display-name]").text();
  const price = product.find(".site-currency-lg").text();
  products.push({ name, price });
});

console.log(products);
