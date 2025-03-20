from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"data": "Hello, World!"}

@app.get("/greetings")
def root():
    return {"data": "Greetings!"}

if __name__ == "__main__":
    app.run()