"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/app/components/Navbar";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [fileQuestion, setFileQuestion] = useState("");
  const [query, setQuery] = useState("");
  const [chatResponses, setChatResponses] = useState([]);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Validasi File
  const validateFile = (uploadedFile) => {
    if (!uploadedFile) return false;
    if (uploadedFile.type !== "text/csv") {
      toast({
        title: "Kesalahan Format File",
        description: "Hanya file CSV yang diizinkan.",
        variant: "destructive",
      });
      return false;
    }
    if (uploadedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "Kesalahan Ukuran File",
        description: "Ukuran file terlalu besar. Maksimal 5MB.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!validateFile(uploadedFile)) return;

    setFile(uploadedFile);
    toast({
      title: "File Dipilih",
      description: `${uploadedFile.name} siap untuk diunggah.`,
      variant: "default",
    });
  };

  // Handle Upload File
  const handleUpload = async () => {
    if (!file || !fileQuestion.trim()) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Silakan unggah file CSV dan masukkan pertanyaan.",
        variant: "destructive",
      });
      return;
    }

    setLoadingUpload(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", fileQuestion);

    try {
      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Gagal mengunggah file.");
      const data = await response.json();

      setUploadHistory((prev) => [
        ...prev,
        { name: file.name, question: fileQuestion, result: data.answer },
      ]);

      toast({
        title: "Unggahan Berhasil",
        description: `Hasil analisis: ${data.answer}`,
        variant: "success",
      });

      setFile(null);
      setFileQuestion("");
      fileInputRef.current.value = "";
    } catch (error) {
      toast({
        title: "Kesalahan Unggahan",
        description: error.message || "Gagal mengunggah file.",
        variant: "destructive",
      });
    } finally {
      setLoadingUpload(false);
    }
  };

  // Handle Chat Interaction
  const handleChat = async () => {
    if (!query.trim()) return;

    setLoadingChat(true);
    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) throw new Error("Gagal mengirim pesan.");

      const data = await response.json();
      setChatResponses((prev) => [
        ...prev,
        { sender: "user", text: query },
        { sender: "ai", text: data.answer },
      ]);
      setQuery("");
      scrollToBottom();
    } catch (error) {
      toast({
        title: "Kesalahan Chat",
        description: error.message || "Gagal mengirim pesan.",
        variant: "destructive",
      });
    } finally {
      setLoadingChat(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col gap-6">
        {/* Upload Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Unggah Data CSV</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer hover:border-blue-500"
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? (
                <Check className="text-green-600" />
              ) : (
                <Upload className="text-blue-500" />
              )}
              <p>{file ? file.name : "Klik untuk memilih file CSV"}</p>
            </motion.div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <Input
              value={fileQuestion}
              onChange={(e) => setFileQuestion(e.target.value)}
              placeholder="Masukkan pertanyaan..."
              className="mb-4"
            />
            <Button
              className="bg-green-500"
              onClick={handleUpload}
              disabled={loadingUpload || !fileQuestion.trim()}
            >
              {loadingUpload ? "Mengunggah..." : "Unggah File"}
            </Button>
          </CardContent>
        </Card>

        {/* Chat Card */}
        <Card className="shadow-lg flex-grow">
          <CardHeader>
            <CardTitle>Chat dengan AI</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-96">
            <div
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto p-2 space-y-3"
            >
              {chatResponses.map((response, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    response.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-md shadow-lg ${
                      response.sender === "user"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {response.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik pesan Anda..."
                disabled={loadingChat}
              />
              <Button
                className="bg-green-500"
                onClick={handleChat}
                disabled={loadingChat || !query.trim()}
              >
                {loadingChat ? "Mengirim..." : <Send />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
