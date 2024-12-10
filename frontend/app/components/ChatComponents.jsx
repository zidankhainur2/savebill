"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function ChatComponent() {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (data.status === "success") {
        setResponses((prev) => [...prev, { text: data.answer }]);
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-2">
        {responses.map((response, index) => (
          <div key={index} className="p-2 bg-gray-100 rounded">
            {response.text}
          </div>
        ))}
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your message..."
          className="w-full"
        />
        <Button onClick={handleChat} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </Button>
      </div>
    </Card>
  );
}

export default ChatComponent;
