import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, TextField, Typography, Card, CardContent } from "@mui/material";

function Home() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [moreMessage, setMoreMessage] = useState([]);

  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Include socketId in the emitted data
    socket.emit("message", { message, room, socketId });
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log(`User connected ${socket.id}`);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMoreMessage((message) => [...message, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="main bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="container mx-auto p-4 max-w-md">
        <Card className="shadow-lg">
          <CardContent>
            <Typography variant="h5" className="mb-4 text-center">
              Hello! {socketId}
            </Typography>
            <form onSubmit={handleSubmit} className="mb-4">
              <TextField
                fullWidth
                variant="outlined"
                label="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-4"
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="mb-4"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </form>
            <div className="messages">
              {moreMessage.map((item, key) => (
                <Typography key={key} variant="body1" className="mb-2 p-2 border-b border-gray-300">
                  {item}
                </Typography>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
