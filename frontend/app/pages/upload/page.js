"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "@/components/ui/loader";
import { useChatStore } from "@/app/chatStore";
import { UploadCloud, FileText, Bot, User, Send, Trash2 } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

// Komponen untuk Placeholder saat chat kosong
function ChatPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <Bot size={48} className="mb-4" />
      <h2 className="text-2xl font-semibold text-gray-300">
        Selamat Datang di Analis AI
      </h2>
      <p>
        Unggah file CSV Anda dan mulailah bertanya untuk mendapatkan wawasan.
      </p>
    </div>
  );
}

// Komponen untuk Bubble Chat AI
function AiBubble({ children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
        <Bot className="w-5 h-5 text-yellow-400" />
      </div>
      <div className="bg-gray-700 rounded-lg p-3 max-w-lg">
        <ReactMarkdown
          className="prose prose-invert prose-sm"
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              />
            ),
          }}
        >
          {children}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// Komponen untuk Bubble Chat Pengguna
function UserBubble({ children }) {
  return (
    <div className="flex justify-end items-start gap-3">
      <div className="bg-yellow-500 text-black rounded-lg p-3 max-w-lg">
        <p>{children}</p>
      </div>
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
        <User className="w-5 h-5 text-white" />
      </div>
    </div>
  );
}

export default function UploadPage() {
  const {
    file,
    fileContent,
    question,
    responses,
    loading,
    error,
    setFile,
    setQuestion,
    setLoading,
    addResponse,
    setError,
    clearChat,
  } = useChatStore();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv") {
        setError("Format file salah. Harap unggah file .csv");
        return;
      }
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!question.trim() || !fileContent) {
      setError("Pastikan Anda sudah memilih file dan mengisi pertanyaan.");
      return;
    }
    setLoading(true);
    setError(null);
    const currentQuestion = question;
    setQuestion(""); // Langsung kosongkan input untuk UX yang lebih baik

    const formData = new FormData();
    formData.append("fileContent", fileContent);
    formData.append("question", currentQuestion);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      addResponse({ sender: "user", text: currentQuestion });
      const response = await axios.post(`${apiUrl}/api/chat`, formData);
      addResponse({ sender: "ai", text: response.data.answer });
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        "Terjadi kesalahan saat menghubungi server.";
      addResponse({ sender: "ai", text: `Error: ${errorMessage}` });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    const fileInput = document.getElementById("file-input");
    if (fileInput) {
      fileInput.value = "";
    }
    clearChat();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-yellow-400">
            Analysis Workspace
          </span>
        </div>
        {responses.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            className="text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Mulai Sesi Baru
          </Button>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex md:flex-row flex-col gap-4 p-4 overflow-hidden">
        {/* Kolom Kiri: Upload & Informasi File */}
        <Card className="w-full md:w-1/3 lg:w-1/4 bg-gray-800 border-gray-700 flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-yellow-400 mb-4">
                Langkah 1: Unggah Data
              </h2>
              <label
                htmlFor="file-input"
                className="flex flex-col items-center justify-center w-full h-32 px-4 text-center border-2 border-dashed rounded-lg cursor-pointer bg-gray-700 border-gray-600 hover:border-yellow-400 hover:bg-gray-600 transition-colors"
              >
                <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                <p className="text-sm text-gray-400">
                  {file ? "Ganti File" : "Pilih file .csv"}
                </p>
              </label>
              <Input
                id="file-input"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              {file && (
                <div className="mt-4 p-3 rounded-md bg-gray-700 text-sm flex items-center gap-2">
                  <FileText className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="truncate">{file.name}</span>
                </div>
              )}
            </div>
            <div className="mt-6">
              <h3 className="text-md font-semibold text-yellow-400 mb-2">
                Panduan
              </h3>
              <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                <li>Pastikan file berformat .csv.</li>
                <li>Ukuran file maksimal 5MB.</li>
                <li>Setelah file diunggah, ajukan pertanyaan di kolom chat.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Kolom Kanan: Chat Interface */}
        <Card className="w-full md:w-2/3 lg:w-3/4 bg-gray-800 border-gray-700 flex flex-col flex-1">
          <CardContent className="p-6 flex flex-col flex-1 overflow-hidden">
            <ScrollArea className="flex-1 pr-4 -mr-4">
              <div className="space-y-6">
                {responses.length === 0 ? (
                  <ChatPlaceholder />
                ) : (
                  responses.map((res, index) =>
                    res.sender === "user" ? (
                      <UserBubble key={index}>{res.text}</UserBubble>
                    ) : (
                      <AiBubble key={index}>{res.text}</AiBubble>
                    )
                  )
                )}
              </div>
            </ScrollArea>
            {error && (
              <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
            )}
            <form
              onSubmit={handleAskQuestion}
              className="mt-4 flex items-start gap-4"
            >
              <Textarea
                placeholder={
                  !file
                    ? "Silakan unggah file CSV terlebih dahulu..."
                    : "Tanyakan apa saja tentang data Anda..."
                }
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={!file || loading}
                className="bg-gray-700 text-base border-gray-600 focus-visible:ring-1 focus-visible:ring-yellow-400 resize-none h-12"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAskQuestion(e);
                  }
                }}
              />
              <Button
                type="submit"
                disabled={loading || !question.trim() || !file}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-12 px-4"
              >
                {loading ? <Loader /> : <Send className="w-5 h-5" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
