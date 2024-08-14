"use client";
import { useState, useRef, useEffect } from 'react';

export default function ChatRoom() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat room!", sender: "System" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // This effect scrolls the message container to the bottom whenever a new message is added.
  useEffect(() => {
    if (messages.length > 1) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if(inputMessage.trim()) {
      const userMessage = {id: messages.length + 1, text: inputMessage, sender: "User"};
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputMessage("");
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputMessage }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMessages(prevMessages => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: data.response, sender: "AI" }
        ]);
      } catch (error) {
        console.error("Error in AI response:", error);
        setMessages(prevMessages => [
          ...prevMessages,
          { id: prevMessages.length + 1, text: "Sorry, I encountered an error.", sender: "AI" }
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4 mb-16">
        {/* Map messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-2 rounded-lg flex ${
              message.sender === "User" ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`p-2 rounded-lg max-w-[70%] ${
              message.sender === "User" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}>
              <p className="font-bold">{message.sender}</p>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white fixed bottom-0 left-0 right-0">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>
      </form>
    </main>
  );
}