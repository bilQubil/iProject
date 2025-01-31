import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChatHistory((prev) => [...prev, userMessage]);
    
    setMessage("");

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/askme", { prompt:message },
        {        
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },       
      });
    // console.log(response.data, '<<< response')
    //   const data = await response.json();
      const botMessage = { sender: "bot", text: response.data.reply };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { sender: "bot", text: "Sorry, something went wrong." };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="w-80 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center p-3 bg-blue-500 text-white rounded-t-lg">
            <h3 className="text-sm font-medium">Chat with Gemini AI</h3>
            <button onClick={toggleChat}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 p-3 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-lg ${
                  chat.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
                }`}
              >
                {chat.text}
              </div>
            ))}
            {loading && <div className="text-gray-500">Typing...</div>}
          </div>
          <div className="p-3 flex items-center space-x-2 border-t">
            <input
              type="text"
              className="flex-1 px-3 py-2 border rounded-lg"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Chatbox;
