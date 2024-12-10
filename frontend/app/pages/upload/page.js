"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/app/components/Navbar";
import { toast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null); 
  const [uploadHistory, setUploadHistory] = useState([]); 
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== "text/csv") {
      toast({
        title: "Kesalahan Format File",
        description: "Hanya file CSV yang diizinkan.",
        variant: "destructive",
      });
      return;
    }

    if (uploadedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "Kesalahan Ukuran File",
        description: "Ukuran file terlalu besar. Maksimal 5MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(uploadedFile);
    toast({
      title: "File Dipilih",
      description: `${uploadedFile.name} siap untuk diunggah.`,
      variant: "default",
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Tidak Ada File",
        description: "Silakan pilih file untuk diunggah.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal mengunggah file.");
      }

      const data = await response.json();

      // Set hasil analisis
      setAnalysisResult(data.answer);

      // Tambahkan ke riwayat
      setUploadHistory((prev) => [
        ...prev,
        { name: file.name, result: data.answer },
      ]);

      toast({
        title: "Unggahan Berhasil",
        description: `Hasil analisis: ${data.answer}`,
        variant: "success",
      });

      // Reset input file
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast({
        title: "Kesalahan Unggahan",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">
                Unggah Data CSV
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer 
                transition-all duration-300 ${
                  file
                    ? "border-green-500 bg-green-50 hover:bg-green-100"
                    : "border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-500"
                }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              {file ? (
                <div className="flex items-center justify-center space-x-2">
                  <Check className="w-6 h-6 text-green-600" />
                  <span className="text-green-700">{file.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-blue-600 mb-2" />
                  <p className="text-gray-600">Klik untuk memilih file CSV</p>
                  <p className="text-xs text-gray-500 mt-1">Ukuran maks: 5MB</p>
                </div>
              )}
            </div>

            <Button
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 animate-pulse" />
                  <span>Sedang Mengunggah...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Unggah File</span>
                </div>
              )}
            </Button>

            {analysisResult && (
              <div className="mt-6 p-4 border rounded-lg bg-blue-50 text-gray-700">
                <h3 className="font-bold text-lg">Hasil Analisis:</h3>
                <p>{analysisResult}</p>
              </div>
            )}

            {uploadHistory.length > 0 && (
              <div className="mt-8">
                <h3 className="font-bold text-lg">Riwayat Unggahan:</h3>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {uploadHistory.map((history, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{history.name}</span>:{" "}
                      {history.result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
