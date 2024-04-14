const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

// Create an Express app
const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Handle new WebSocket connections
wss.on("connection", (socket) => {
  console.log("Client connected");

  // Ask for the user's nickname
  socket.send("Please enter your nickname");

  // Listen for the user's nickname
  socket.on("message", (message) => {
    if (message.trim()) {
      const nickname = message.trim();
      if (nicknames.includes(nickname)) {
        socket.send(
          `This nickname is already taken. Please choose another one.`,
        );
      } else {
        nicknames.push(nickname);
        socket.nickname = nickname;
        wss.clients.forEach((client) => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(`${nickname} has joined the chat room`);
          }
        });
      }
    }
  });

  // Listen for messages from the user
  socket.on("message", (message) => {
    console.log(`Received message from ${socket.nickname}: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(`${socket.nickname}: ${message}`);
      }
    });
  });

  // Handle client disconnections
  socket.on("close", () => {
    console.log("Client disconnected");
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(`${socket.nickname} has left the chat room`);
      }
    });
  });
});

// Start the server on port 3000
server.listen(3001, () => {
  console.log("Server listening on port 3001");
});

module.exports.http;
