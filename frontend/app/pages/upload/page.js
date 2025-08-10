"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader } from "@/components/ui/loader";
import { useChatStore } from "@/app/chatStore";

export default function UploadPage() {
  // Mengambil state dan actions dari store Zustand
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
  } = useChatStore();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim() || !fileContent) {
      setError("Pastikan Anda sudah memilih file dan mengisi pertanyaan.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("fileContent", fileContent);
    formData.append("question", question);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/api/chat`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Menambahkan pertanyaan dan jawaban baru ke riwayat
      addResponse({
        question: question,
        answer: response.data.answer,
      });

      // Mengosongkan input pertanyaan
      setQuestion("");
    } catch (err) {
      setError(
        "Terjadi kesalahan saat menghubungi server. " +
          (err.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Analisis File CSV Anda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input type="file" accept=".csv" onChange={handleFileChange} />

            {responses.length > 0 && (
              <ScrollArea className="h-64 w-full rounded-md border p-4">
                {responses.map((res, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-bold text-blue-500">Anda:</p>
                    <p className="mb-2">{res.question}</p>
                    <p className="font-bold text-green-500">AI:</p>
                    <p>{res.answer}</p>
                  </div>
                ))}
              </ScrollArea>
            )}

            <div className="flex flex-col space-y-2">
              <Textarea
                placeholder="Tanyakan apa saja tentang data di file Anda..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={!file}
              />
              <Button
                onClick={handleAskQuestion}
                disabled={loading || !question.trim() || !file}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              >
                {loading ? <Loader /> : "Kirim Pertanyaan"}
              </Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
