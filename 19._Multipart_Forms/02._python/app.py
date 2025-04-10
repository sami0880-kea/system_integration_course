from fastapi import FastAPI, Form, File, UploadFile
from typing import Optional
import uuid
import random
from datetime import datetime
import aiofiles


app = FastAPI()

@app.post("/form")
def basic_form(username: str = Form(...), password: str = Form(default=..., min_length=8)):
    print(username, password)
    return { 
        "username": username,
    }

# @app.post("/fileform")
# def file_form(file: bytes = File(...), description: Optional[str] = Form(None)):
#     with open('uploads/file', "wb") as f:
#         f.write(file)
#     return { "message": "File uploaded", }

# @app.post("/fileform")
# async def file_form(file: UploadFile = File(...), description: Optional[str] = Form(None)):
#     contents = await file.read()
#     print(contents)
#     return { "filename": file.filename }

# @app.post("/fileform")
# async def file_form(file: UploadFile = File(...), description: Optional[str] = Form(None)):
#     safe_filename = file.filename.replace("/", "_").replace("\\", "_")
#     # uniquePrefix = str(uuid.uuid4())
#     uniquePrefix = str(datetime.now().timestamp()) + "-" + str(round(random.random() * 1e9))
#     filename = uniquePrefix + '_' + safe_filename
#     with open('uploads/' + filename, "wb") as f:
#         # f.write(await file.read())
#         # := is a walrus operator
#         while content := await file.read(1024): # Read in chunks of 1024 bytes
#             f.write(content)
#     return {
#         "filename": file.filename,
#         "description": description,
#     }

@app.post("/fileform")
async def file_form(file: UploadFile = File(...), description: Optional[str] = Form(None)):
    safe_filename = file.filename.replace("/", "_").replace("\\", "_")
    # uniquePrefix = str(uuid.uuid4())
    uniquePrefix = str(datetime.now().timestamp()) + "-" + str(round(random.random() * 1e9))
    filename = uniquePrefix + '_' + safe_filename
    async with aiofiles.open('uploads/' + filename, 'wb') as f:
        while content := await file.read(1024):
            await f.write(content)
    return {
        "filename": file.filename,
        "description": description,
    }
