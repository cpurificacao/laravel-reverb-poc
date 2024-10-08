import { useEffect, useState } from "react";

const PROTOCOL = "ws";
const HOSTNAME = "10.91.116.93:8080";
const RESOURCE = "/app/kqxrglweub341c9w4nxz";

const socket = new WebSocket(`${PROTOCOL}://${HOSTNAME}${RESOURCE}`);

export const Chat = () => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    socket.addEventListener("open", onSocketOpen);
    socket.addEventListener("message", onSocketMessage);
    socket.addEventListener("close", onSocketClose);
    socket.addEventListener("error", onSocketError);

    console.log("socket state", socket.readyState);
  }, []);

  function onSocketOpen(this: WebSocket, e: Event) {
    const subscriber = {
      event: "pusher:subscribe",
      data: {
        channel: "geo-location",
      },
    };

    console.log("[onSocketOpen] socket state", this.readyState);

    this.send(JSON.stringify(subscriber));
  }

  function onSocketMessage(this: WebSocket, e: MessageEvent) {
    const message = JSON.parse(e.data);

    console.log("Received message:", message);

    setMessages((previous: any) => [...previous, message]);
  }

  function onSocketClose(this: WebSocket, e: CloseEvent) {
    console.log("socket connection closed.");
  }

  function onSocketError(this: WebSocket, e: Event) {
    console.log("socket error:", e);
  }

  function onButtonClick(socket: WebSocket) {
    socket.send("Hello World!!");
  }

  return (
    <div>
      <h2>Geo Locations</h2>

      <button onClick={() => onButtonClick(socket)}>Click me!</button>

      <ul>
        {messages.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
