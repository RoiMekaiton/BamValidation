import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onmessage = (event: MessageEvent) => {
      setMessage(event.data);
    };

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    socket.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const backgroundColor =
    message.toLowerCase() === "green"
      ? "green"
      : message.toLowerCase() === "red"
      ? "red"
      : "white";

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "2rem",
      }}
    >
      Message from backend: {message}
    </div>
  );
};

export default App;