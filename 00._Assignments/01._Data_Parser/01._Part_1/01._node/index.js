import fs from "fs";
import xml2js from "xml2js";
import yaml from "js-yaml";
import { parse } from "csv-parse";

async function parseTextFile(file) {
  try {
    const data = await fs.promises.readFile(file, "utf8");
    return data.split("\n");
  } catch (error) {
    console.error("Error parsing TXT file:", error);
    return null;
  }
}

async function parseXMLFile(file) {
  try {
    const data = await fs.promises.readFile(file);
    const parser = new xml2js.Parser();
    return await parser.parseStringPromise(data);
  } catch (error) {
    console.error("Error parsing XML file:", error);
    return null;
  }
}

async function parseYAMLFile(file) {
  try {
    const data = await fs.promises.readFile(file);
    return yaml.load(data);
  } catch (error) {
    console.error("Error parsing YAML file:", error);
    return null;
  }
}

async function parseJSONFile(file) {
  try {
    const data = await fs.promises.readFile(file);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing JSON file:", error);
    return null;
  }
}

async function parseCSVFile(file) {
  try {
    const data = await fs.promises.readFile(file);
    return new Promise((resolve, reject) => {
      parse(
        data,
        {
          columns: true,
          cast: value => {
            if (value.includes(";")) {
              return value.split(";");
            }
            return value;
          },
        },
        (error, records) => {
          if (error) reject(error);
          else resolve(records);
        }
      );
    });
  } catch (error) {
    console.error("Error parsing CSV file:", error);
    return null;
  }
}

(async () => {
  console.log(
    "TXT File: ",
    JSON.stringify(await parseTextFile("../data/messi.txt"), null, 2)
  );
  console.log(
    "XML File: ",
    JSON.stringify(await parseXMLFile("../data/messi.xml"), null, 2)
  );
  console.log(
    "YAML File: ",
    JSON.stringify(await parseYAMLFile("../data/messi.yaml"), null, 2)
  );
  console.log(
    "JSON File: ",
    JSON.stringify(await parseJSONFile("../data/messi.json"), null, 2)
  );
  console.log(
    "CSV File: ",
    JSON.stringify(await parseCSVFile("../data/messi.csv"), null, 2)
  );
})();
