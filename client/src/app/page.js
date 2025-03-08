'use client'
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000"); // Replace with your backend URL

const App = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    // Listen for messages from the server
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.text);
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);
c
  const sendMessage = () => {
    // Send a message to the server
    socket.emit("send_message", { text: message });
  };

  return (
    <div>
      <h1>Socket.IO Practice</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage} className="cursor-pointer">Send Message</button>
      <p>Server Response: {receivedMessage}</p>
    </div>
  );
};

export default App;
