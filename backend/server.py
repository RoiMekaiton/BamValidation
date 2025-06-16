import asyncio
import websockets
import speech_recognition as sr

r = sr.Recognizer()

async def handler(websocket):
    with sr.Microphone() as source:
        while True:
            audio_text = r.listen(source)
            text = r.recognize_google(audio_text, language="he-ISR")
            if str(text).split().__contains__("ירוק"):
                await websocket.send("green")
            elif str(text).split().__contains__("אדום"):
                await websocket.send("red")

async def main():
    async with websockets.serve(handler, "localhost", 5000):
        print("WebSocket server started at ws://localhost:5000")
        await asyncio.Future()  # run forever

asyncio.run(main())