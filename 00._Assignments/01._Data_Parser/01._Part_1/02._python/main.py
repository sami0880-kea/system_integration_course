import xml.etree.ElementTree as ET
import yaml
import json
import csv
import asyncio

async def parse_text_file(file):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            return f.read().splitlines()
    except Exception as error:
        print(f"Error parsing TXT file: {error}")
        return None

async def parse_xml_file(file):
    try:
        tree = ET.parse(file)
        root = tree.getroot()
        
        def xml_to_dict(element):
            result = {}
            for child in element:
                if len(child) == 0:
                    result[child.tag] = child.text
                else:
                    result[child.tag] = xml_to_dict(child)
            return result
        
        return xml_to_dict(root)
    except Exception as error:
        print(f"Error parsing XML file: {error}")
        return None

async def parse_yaml_file(file):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    except Exception as error:
        print(f"Error parsing YAML file: {error}")
        return None

async def parse_json_file(file):
    try:
        with open(file, 'r') as f:
            return json.load(f)
    except Exception as error:
        print(f"Error parsing JSON file: {error}")
        return None

async def parse_csv_file(file):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            csv_reader = csv.DictReader(f)
            records = []
            for row in csv_reader:
                # Handle semicolon-separated values like in the Node.js version
                processed_row = {
                    key: value.split(';') if ';' in value else value
                    for key, value in row.items()
                }
                records.append(processed_row)
            return records
    except Exception as error:
        print(f"Error parsing CSV file: {error}")
        return None

async def main():
    print("TXT File:", 
          json.dumps(await parse_text_file("../data/messi.txt"), indent=2))
    print("XML File:", 
          json.dumps(await parse_xml_file("../data/messi.xml"), indent=2))
    print("YAML File:", 
          json.dumps(await parse_yaml_file("../data/messi.yaml"), indent=2))
    print("JSON File:", 
          json.dumps(await parse_json_file("../data/messi.json"), indent=2))
    print("CSV File:", 
          json.dumps(await parse_csv_file("../data/messi.csv"), indent=2))

if __name__ == "__main__":
    asyncio.run(main())
