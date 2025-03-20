import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", ws => {
  console.log("New connection", wss.clients.size);

  ws.on("message", message => {
    console.log("Received message from client:", message);

    wss.clients.forEach(client => {
      client.send(`${message}`);
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected", wss.clients.size);
  });
});
