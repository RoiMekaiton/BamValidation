import React, { useState } from "react";
import { useWebSocket } from "./useWebSocket"; // make sure the path is correct

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  useWebSocket("ws://localhost:5000", setMessage);

  const normalized = message.toLowerCase();

  const backgroundColor =
    normalized === "green"
      ? "green"
      : normalized === "red"
      ? "red"
      : "white";
  
  const messageToScreen = normalized === "green"
      ? "מי שמוציא מילה מהפה אני שובר אותו"
      : normalized === "red"
      ? "אחשלי היקר אתה חופשי לדבר ללא חשש" : "שמישהו יגיד כבר ירוק או אדום";

  const imageSrc =
    normalized === "green"
      ? "/green.jpeg"
      : normalized === "red"
      ? "/red.jpeg"
      : undefined;

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "4rem",
      }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={normalized}
          style={{ width: "400px", marginBottom: "20px" }}
        />
      )}
      {messageToScreen}
    </div>
  );
};

export default App;