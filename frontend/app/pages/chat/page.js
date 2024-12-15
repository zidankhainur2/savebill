"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion"; // Import motion
import Navbar from "@/app/components/Navbar";

function ChatComponent() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]); // Stores both user messages and AI responses
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleChat = async () => {
    if (!query.trim()) return; // Prevent sending empty messages

    setLoading(true);

    // Add user message to chat history with green color
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

  // Scroll to bottom when messages are updated
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [responses]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Chat Card */}
      <Card className="flex-grow m-4 p-4 shadow-lg rounded-lg bg-white flex flex-col">
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto space-y-4 p-2"
        >
          {responses.map((response, index) => (
            <motion.div
              key={index}
              className={`flex ${
                response.sender === "user" ? "justify-end" : "justify-start"
              }`}
              initial={{ opacity: 0, y: 10 }} // Initial state for animation
              animate={{ opacity: 1, y: 0 }} // Animate to full opacity and no vertical shift
              transition={{ duration: 0.3 }} // Duration of the animation
            >
              <div
                className={`max-w-md p-3 rounded-lg shadow ${
                  response.sender === "user"
                    ? "bg-green-500 text-white" // User color updated to green
                    : response.sender === "ai"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {response.sender === "ai" && loading && !response.text ? (
                  // Skeleton loader while waiting for AI response
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="mt-2 h-4 bg-gray-300 rounded w-48"></div>
                  </div>
                ) : (
                  response.text
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input and Button */}
        <div className="flex items-center gap-2 mt-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} // Fade in the input field
            className="flex-grow"
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={loading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} // Fade in the button
          >
            <Button
              onClick={handleChat}
              disabled={loading || !query.trim()}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </motion.div>
        </div>
      </Card>
    </div>
  );
}

export default ChatComponent;
