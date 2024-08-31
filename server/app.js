import express from 'express';
import { Server } from 'socket.io';
import { createServer } from "http";
import Message from './models/make-model.js'; // Correct import path as necessary

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

io.on("connection", (socket) => {
  console.log("User connected");

  // Listen for messages from the client
  socket.on("message", async ({ room, message, socketId }) => {
    console.log({ room, message, socketId });

    // Save the message to MongoDB
    const newMessage = new Message({ message, room, socketId });

    try {
      await newMessage.save();
      console.log(`Message saved to MongoDB: ${newMessage}`);
    } catch (error) {
      console.error('Error saving message to MongoDB:', error);
    }

    // Emit the message to the specified room
    io.to(room).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
