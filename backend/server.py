import socket

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(('127.0.0.1', 5000))

server.listen(1)

while True:
    client, addr = server.accept()
    print(client.recv(1024).decode())
    client.send('Hello from server'.encode())