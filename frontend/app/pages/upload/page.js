"use client";

import { useState, useRef } from "react";
import { Upload, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/app/components/Navbar";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [fileQuestion, setFileQuestion] = useState("");
  const [query, setQuery] = useState("");
  const [chatResponses, setChatResponses] = useState([]);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(""); // State for storing analysis result
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
      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        setAnalysisResult(response.data.answer); // Save the analysis result
        setUploadHistory((prev) => [
          ...prev,
          {
            name: file.name,
            question: fileQuestion,
            result: response.data.answer,
          },
        ]);

        toast({
          title: "Unggahan Berhasil",
          description: `Hasil analisis: ${response.data.answer}`,
          variant: "success",
        });

        setFile(null);
        setFileQuestion("");
        fileInputRef.current.value = "";
      } else {
        toast({
          title: "Kesalahan Unggahan",
          description: "Gagal menganalisa file.",
          variant: "destructive",
        });
      }
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
      const response = await axios.post("http://localhost:8080/chat", {
        query,
      });

      if (response.data.status === "success") {
        setChatResponses((prev) => [
          ...prev,
          { sender: "user", text: query },
          { sender: "ai", text: response.data.answer },
        ]);
        setQuery("");
        scrollToBottom();
      } else {
        toast({
          title: "Kesalahan Chat",
          description: "Tidak dapat memberikan jawaban.",
          variant: "destructive",
        });
      }
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
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto p-6 flex flex-col gap-6 pt-20">
        {/* Upload Card */}
        <Card className="shadow-lg bg-gray-800 border border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500">Unggah Data CSV</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer hover:border-yellow-500"
              onClick={() => fileInputRef.current?.click()}
            >
              {file ? (
                <Check className="text-yellow-500 w-8 h-8 mx-auto" />
              ) : (
                <Upload className="text-yellow-500 w-8 h-8 mx-auto" />
              )}
              <p className="mt-2 text-yellow-500">
                {file ? file.name : "Klik untuk memilih file CSV"}
              </p>
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
              className="mb-4 bg-gray-700 text-white border-gray-600 focus:border-yellow-500"
            />
            <Button
              onClick={handleUpload}
              disabled={loadingUpload || !fileQuestion.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            >
              {loadingUpload ? "Mengunggah..." : "Unggah File"}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Result Card */}
        {analysisResult && (
          <Card className="shadow-lg bg-gray-800 border border-gray-700">
            <CardHeader>
              <CardTitle className="text-yellow-500">Hasil Analisis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-500">{analysisResult}</p>
            </CardContent>
          </Card>
        )}

        {/* Chat Card */}
        <Card className="shadow-lg bg-gray-800 border border-gray-700 flex-grow">
          <CardHeader>
            <CardTitle className="text-yellow-500">Chat dengan AI</CardTitle>
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
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {response.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik pesan Anda..."
                disabled={loadingChat}
                className="bg-gray-700 text-white border-gray-600 focus:border-yellow-500"
              />
              <Button
                onClick={handleChat}
                disabled={loadingChat || !query.trim()}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              >
                {loadingChat ? "Mengirim..." : <Send className="w-5 h-5" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
