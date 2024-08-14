"use client";
import { useState } from 'react';

export default function ChatRoom() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat room!", sender: "System" },
  ]);
  const [inputMessage, setInputMessage] = useState("");


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: "User" }]);
      setInputMessage("");
    }
  };


  return (
    <main className="flex flex-col min-h-screen bg-gray-100 ">
      <div className="flex-grow overflow-y-auto p-4 mb-16">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-2 rounded-lg ${
              message.sender === "User" ? "bg-blue-500 text-white self-end ml-auto item" : "bg-gray-200 text-gray-800 self-start mr-auto"
            }`}
          >
            <p className="font-bold">{message.sender}</p>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white  fixed bottom-0 left-0 right-0">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </main>
  );
}