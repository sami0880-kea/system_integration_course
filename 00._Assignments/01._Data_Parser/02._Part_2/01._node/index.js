import express from "express";
import multer from "multer";
import xml2js from "xml2js";
import yaml from "js-yaml";
import { parse } from "csv-parse";

const app = express();
const upload = multer();

async function parseTextFile(buffer) {
  try {
    const data = buffer.toString("utf8");
    return data.split("\n");
  } catch (error) {
    console.error("Error parsing TXT file:", error);
    return null;
  }
}

async function parseXMLFile(buffer) {
  try {
    const parser = new xml2js.Parser();
    return await parser.parseStringPromise(buffer);
  } catch (error) {
    console.error("Error parsing XML file:", error);
    return null;
  }
}

async function parseYAMLFile(buffer) {
  try {
    return yaml.load(buffer.toString());
  } catch (error) {
    console.error("Error parsing YAML file:", error);
    return null;
  }
}

async function parseJSONFile(buffer) {
  try {
    return JSON.parse(buffer.toString());
  } catch (error) {
    console.error("Error parsing JSON file:", error);
    return null;
  }
}

async function parseCSVFile(buffer) {
  try {
    return new Promise((resolve, reject) => {
      parse(
        buffer,
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

app.post("/parse/txt", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ data: "No file uploaded" });
    const data = await parseTextFile(req.file.buffer);
    res.send(data);
  } catch (error) {
    res.status(500).send({ data: "Error parsing TXT file" });
  }
});

app.post("/parse/xml", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ data: "No file uploaded" });
    const data = await parseXMLFile(req.file.buffer);
    res.send(data);
  } catch (error) {
    res.status(500).send({ data: "Error parsing XML file" });
  }
});

app.post("/parse/yaml", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ data: "No file uploaded" });
    const data = await parseYAMLFile(req.file.buffer);
    res.send(data);
  } catch (error) {
    res.status(500).send({ data: "Error parsing YAML file" });
  }
});

app.post("/parse/json", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ data: "No file uploaded" });
    const data = await parseJSONFile(req.file.buffer);
    res.send(data);
  } catch (error) {
    res.status(500).send({ data: "Error parsing JSON file" });
  }
});

app.post("/parse/csv", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ data: "No file uploaded" });
    const data = await parseCSVFile(req.file.buffer);
    res.send(data);
  } catch (error) {
    res.status(500).send({ data: "Error parsing CSV file" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port`, PORT);
});
