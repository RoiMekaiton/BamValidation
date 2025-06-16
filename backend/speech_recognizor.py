import speech_recognition as sr

r = sr.Recognizer()

with sr.Microphone() as source:
    while True:
        audio_text = r.listen(source)
        text = r.recognize_google(audio_text, language="he-ISR")
        print(text)
