import asyncio
import websockets

async def send_message():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as websocket:
        await websocket.send("This is my message from Python Plain Client")
        print(await websocket.recv())

asyncio.run(send_message())