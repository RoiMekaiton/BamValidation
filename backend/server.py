import asyncio
import websockets

async def handler(websocket):
    while True:
        await websocket.send("green")
        await asyncio.sleep(5)
        await websocket.send("red")
        await asyncio.sleep(5)

async def main():
    async with websockets.serve(handler, "localhost", 5000):
        print("WebSocket server started at ws://localhost:5000")
        await asyncio.Future()  # run forever

asyncio.run(main())