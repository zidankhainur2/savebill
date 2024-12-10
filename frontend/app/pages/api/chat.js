import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "http://localhost:8080/chat",
        req.body,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to communicate with the backend" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
