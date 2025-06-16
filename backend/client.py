import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(('127.0.0.1', 5000))

client.send(('Hello From Client'.encode()))
print(client.recv(1024).decode())