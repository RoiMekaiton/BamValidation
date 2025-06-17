import asyncio
import websockets
import speech_recognition as sr

r = sr.Recognizer()

async def handler(websocket):
    with sr.Microphone() as source:
        while True:
            print("Listening...")
            audio_text = r.listen(source)
            print("Recognizing...")
            try:
                text = r.recognize_google(audio_text, language="he-ISR")
                print(f"Recognized: {text}")
                if "ירוק" in text:
                    await websocket.send("green")
                elif "אדום" in text:
                    await websocket.send("red")
            except Exception as e:
                print(f"Recognition error: {e}")

async def main():
    async with websockets.serve(handler, "0.0.0.0", 5000):
        print("WebSocket server started at ws://localhost:5000")
        await asyncio.Future()  # run forever

asyncio.run(main())
