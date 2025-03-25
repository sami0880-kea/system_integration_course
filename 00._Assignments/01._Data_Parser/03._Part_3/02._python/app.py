from fastapi import FastAPI, UploadFile, HTTPException
import xml.etree.ElementTree as ET
import yaml
import json
import csv
import io
import httpx

app = FastAPI()
NODE_SERVER = "http://localhost:8080"

async def parse_txt(file_content: bytes):
    try:
        return file_content.decode('utf-8').splitlines()
    except Exception as error:
        print(f"Error parsing TXT file: {error}")
        return None

async def parse_xml(file_content: bytes):
    try:
        root = ET.fromstring(file_content)
        
        def xml_to_dict(element):
            result = {}
            for child in element:
                if len(child) > 0:
                    child_tags = [grandchild.tag for grandchild in child]
                    if len(set(child_tags)) == 1 and len(child_tags) > 1:
                        result[child.tag] = [grandchild.text for grandchild in child]
                    else:
                        result[child.tag] = xml_to_dict(child)
                else:
                    result[child.tag] = child.text
            return result
        
        return xml_to_dict(root)
    except Exception as error:
        print(f"Error parsing XML file: {error}")
        return None

async def parse_yaml(file_content: bytes):
    try:
        return yaml.safe_load(file_content)
    except Exception as error:
        print(f"Error parsing YAML file: {error}")
        return None

async def parse_json(file_content: bytes):
    try:
        return json.loads(file_content)
    except Exception as error:
        print(f"Error parsing JSON file: {error}")
        return None

async def parse_csv(file_content: bytes):
    try:
        csv_file = io.StringIO(file_content.decode('utf-8'))
        csv_reader = csv.DictReader(csv_file)
        records = []
        for row in csv_reader:
            processed_row = {
                key: value.split(';') if ';' in value else value
                for key, value in row.items()
            }
            records.append(processed_row)
        return records
    except Exception as error:
        print(f"Error parsing CSV file: {error}")
        return None

@app.post("/parse/txt")
async def parse_txt_file(file: UploadFile):
    try:
        content = await file.read()
        data = await parse_txt(content)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing TXT file: {str(e)}")

@app.post("/parse/xml")
async def parse_xml_file(file: UploadFile):
    try:
        content = await file.read()
        data = await parse_xml(content)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing XML file: {str(e)}")

@app.post("/parse/yaml")
async def parse_yaml_file(file: UploadFile):
    try:
        content = await file.read()
        data = await parse_yaml(content)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing YAML file: {str(e)}")

@app.post("/parse/json")
async def parse_json_file(file: UploadFile):
    try:
        content = await file.read()
        data = await parse_json(content)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing JSON file: {str(e)}")

@app.post("/parse/csv")
async def parse_csv_file(file: UploadFile):
    try:
        content = await file.read()
        data = await parse_csv(content)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing CSV file: {str(e)}")

@app.post("/get/{file_type}")
async def get_from_node(file_type: str, file: UploadFile):
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{NODE_SERVER}/parse/{file_type}", files={"file": file.file})
            response.raise_for_status()
            return response.json()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error fetching from Node server: {str(e)}")

if __name__ == "__main__":
    app.run()