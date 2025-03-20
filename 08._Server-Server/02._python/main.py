from fastapi import FastAPI
import requests
app = FastAPI()

@app.get("/fastapiData")
def root():
    return { "data": "This is data from FastAPI" }


@app.get("/requestExpressData")
def root():
    response = requests.get("http://127.0.0.1:8080/expressData")
    data = response.json()
    return data