"use client";

import Navbar from "@/app/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function ChatComponent() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]); // Stores both user messages and AI responses
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!query.trim()) return; // Prevent sending empty messages

    setLoading(true);

    // Add user message to chat history
    setResponses((prev) => [...prev, { sender: "user", text: query }]);

    try {
      const res = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.answer) {
        // Add AI response to chat history
        setResponses((prev) => [...prev, { sender: "ai", text: data.answer }]);
      } else {
        console.error("API returned no answer");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResponses((prev) => [
        ...prev,
        {
          sender: "system",
          text: "Failed to fetch response from AI. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setQuery(""); // Clear input field after sending
    }
  };

  return (
    <div>
      <Navbar />
      <Card className="p-4">
        <div className="space-y-4">
          {/* Chat Messages */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {responses.map((response, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  response.sender === "user"
                    ? "bg-blue-100 text-blue-800"
                    : response.sender === "ai"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {response.sender === "user"
                  ? "You: "
                  : response.sender === "ai"
                  ? "AI: "
                  : "System: "}
                {response.text}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your message..."
            className="w-full"
            disabled={loading}
          />

          {/* Send Button */}
          <Button onClick={handleChat} disabled={loading || !query.trim()}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ChatComponent;
