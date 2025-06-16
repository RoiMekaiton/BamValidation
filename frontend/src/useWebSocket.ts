// useWebSocket.ts
import { useEffect, useRef } from "react";

type MessageCallback = (data: string) => void;

export function useWebSocket(
  url: string,
  onMessage: MessageCallback,
  reconnectInterval = 3000
) {
  const ws = useRef<WebSocket | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event: MessageEvent) => {
      onMessage(event.data);
    };

    ws.current.onclose = () => {
      console.warn("WebSocket closed. Reconnecting in", reconnectInterval, "ms");
      timeout.current = setTimeout(connect, reconnectInterval);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      ws.current?.close();
    };
  };

  useEffect(() => {
    connect();

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
      ws.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
}
