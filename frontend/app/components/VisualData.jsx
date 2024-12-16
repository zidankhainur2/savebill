import React, { useState } from "react";
import { Zap, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Data Persentase Rumah Tangga dengan Listrik PLN
const electricityAccessData = [
  { provinsi: "ACEH", persentase: 99.73, region: "Sumatera" },
  { provinsi: "SUMATERA UTARA", persentase: 99.23, region: "Sumatera" },
  { provinsi: "SUMATERA BARAT", persentase: 98.95, region: "Sumatera" },
  { provinsi: "RIAU", persentase: 96.6, region: "Sumatera" },
  { provinsi: "JAMBI", persentase: 98.9, region: "Sumatera" },
  { provinsi: "SUMATERA SELATAN", persentase: 97.02, region: "Sumatera" },
  { provinsi: "BENGKULU", persentase: 99.75, region: "Sumatera" },
  { provinsi: "LAMPUNG", persentase: 99.21, region: "Sumatera" },
  { provinsi: "KEP. BANGKA BELITUNG", persentase: 99.66, region: "Sumatera" },
  { provinsi: "KEP. RIAU", persentase: 98.39, region: "Sumatera" },
  { provinsi: "DKI JAKARTA", persentase: 99.97, region: "Jawa" },
  { provinsi: "JAWA BARAT", persentase: 99.9, region: "Jawa" },
  { provinsi: "JAWA TENGAH", persentase: 99.94, region: "Jawa" },
  { provinsi: "DI YOGYAKARTA", persentase: 100, region: "Jawa" },
  { provinsi: "JAWA TIMUR", persentase: 99.71, region: "Jawa" },
  { provinsi: "BANTEN", persentase: 99.79, region: "Jawa" },
  { provinsi: "BALI", persentase: 99.9, region: "Bali & Nusa Tenggara" },
  {
    provinsi: "NUSA TENGGARA BARAT",
    persentase: 99.89,
    region: "Bali & Nusa Tenggara",
  },
  {
    provinsi: "NUSA TENGGARA TIMUR",
    persentase: 91.01,
    region: "Bali & Nusa Tenggara",
  },
  { provinsi: "KALIMANTAN BARAT", persentase: 92.95, region: "Kalimantan" },
  { provinsi: "KALIMANTAN TENGAH", persentase: 89.04, region: "Kalimantan" },
  { provinsi: "KALIMANTAN SELATAN", persentase: 98.89, region: "Kalimantan" },
  { provinsi: "KALIMANTAN TIMUR", persentase: 96.5, region: "Kalimantan" },
  { provinsi: "KALIMANTAN UTARA", persentase: 96.18, region: "Kalimantan" },
  { provinsi: "SULAWESI UTARA", persentase: 99.67, region: "Sulawesi" },
  { provinsi: "SULAWESI TENGAH", persentase: 96.6, region: "Sulawesi" },
  { provinsi: "SULAWESI SELATAN", persentase: 98.23, region: "Sulawesi" },
  { provinsi: "SULAWESI TENGGARA", persentase: 97.83, region: "Sulawesi" },
  { provinsi: "GORONTALO", persentase: 98.99, region: "Sulawesi" },
  { provinsi: "SULAWESI BARAT", persentase: 94.99, region: "Sulawesi" },
  { provinsi: "MALUKU", persentase: 95.37, region: "Maluku & Papua" },
  { provinsi: "MALUKU UTARA", persentase: 94.27, region: "Maluku & Papua" },
  { provinsi: "PAPUA BARAT", persentase: 82.31, region: "Maluku & Papua" },
  { provinsi: "PAPUA BARAT DAYA", persentase: 87.86, region: "Maluku & Papua" },
  { provinsi: "PAPUA", persentase: 90.24, region: "Maluku & Papua" },
  { provinsi: "PAPUA SELATAN", persentase: 67.05, region: "Maluku & Papua" },
  { provinsi: "PAPUA TENGAH", persentase: 35.27, region: "Maluku & Papua" },
  { provinsi: "PAPUA PEGUNUNGAN", persentase: 14.53, region: "Maluku & Papua" },
];

export default function IndonesiaElectricityAccessMap() {
  const [viewMode, setViewMode] = useState("region");

  const getColorIntensity = (percentage) => {
    if (percentage >= 99) return "#00ff00"; // green for high access
    if (percentage >= 95) return "#7cfc00"; // lighter green
    if (percentage >= 90) return "#32cd32"; // medium green
    if (percentage >= 80) return "#90ee90"; // light green
    if (percentage >= 70) return "#ffd700"; // yellow
    if (percentage >= 50) return "#ffa500"; // orange
    return "#ff4500"; // red for low access
  };

  const averageAccess =
    electricityAccessData.reduce((sum, item) => sum + item.persentase, 0) /
    electricityAccessData.length;
  const lowestAccess = Math.min(
    ...electricityAccessData.map((item) => item.persentase)
  );
  const highestAccess = Math.max(
    ...electricityAccessData.map((item) => item.persentase)
  );

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-screen py-12 text-yellow-400">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 flex items-center justify-center space-x-4">
            <Zap className="w-12 h-12 text-yellow-500 animate-pulse" />
            <span>Akses Listrik PLN Indonesia 2024</span>
            <Globe className="w-12 h-12 text-green-600 animate-pulse" />
          </h1>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto">
            Pemetaan Persentase Rumah Tangga dengan Akses Listrik PLN
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-lg bg-gray-800 border border-yellow-400">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-yellow-400">
                  Peta Akses Listrik PLN
                </CardTitle>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode("region")}
                    className={`px-4 py-2 rounded-md ${
                      viewMode === "region"
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700 text-yellow-400"
                    } transition-colors duration-300`}
                  >
                    Berdasar Wilayah
                  </button>
                  <button
                    onClick={() => setViewMode("persentase")}
                    className={`px-4 py-2 rounded-md ${
                      viewMode === "persentase"
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700 text-yellow-400"
                    } transition-colors duration-300`}
                  >
                    Persentase
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-700 rounded-lg p-4">
                {viewMode === "region" ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {electricityAccessData
                      .reduce((acc, item) => {
                        if (!acc.find((r) => r.region === item.region)) {
                          acc.push({
                            region: item.region,
                            persentase:
                              electricityAccessData
                                .filter((p) => p.region === item.region)
                                .reduce((sum, p) => sum + p.persentase, 0) /
                              electricityAccessData.filter(
                                (p) => p.region === item.region
                              ).length,
                          });
                        }
                        return acc;
                      }, [])
                      .map((region) => (
                        <div
                          key={region.region}
                          className="p-4 rounded-lg shadow-md text-center"
                          style={{
                            backgroundColor: getColorIntensity(
                              region.persentase
                            ),
                          }}
                        >
                          <h3 className="font-semibold text-lg text-yellow-400">
                            {region.region}
                          </h3>
                          <p className="text-yellow-300">
                            {region.persentase.toFixed(2)}%
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {electricityAccessData
                      .sort((a, b) => b.persentase - a.persentase)
                      .map((provinsi) => (
                        <div
                          key={provinsi.provinsi}
                          className="p-4 rounded-lg shadow-md text-center"
                          style={{
                            backgroundColor: getColorIntensity(
                              provinsi.persentase
                            ),
                          }}
                        >
                          <h3 className="font-semibold text-lg text-yellow-400">
                            {provinsi.provinsi}
                          </h3>
                          <p className="text-yellow-300">
                            {provinsi.persentase}%
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-gray-800 border border-yellow-400">
            <CardHeader>
              <CardTitle className="text-yellow-400">
                Statistik Akses Listrik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-yellow-400">
                    {averageAccess.toFixed(2)}%
                  </h3>
                  <p className="text-sm text-gray-200">Rata-rata Nasional</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-yellow-500">
                    {highestAccess.toFixed(2)}%
                  </h3>
                  <p className="text-sm text-gray-200">Tertinggi</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-yellow-600">
                    {lowestAccess.toFixed(2)}%
                  </h3>
                  <p className="text-sm text-gray-200">Terendah</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-yellow-700">
                    {
                      electricityAccessData.filter(
                        (item) => item.persentase < 90
                      ).length
                    }
                  </h3>
                  <p className="text-sm text-gray-200">Provinsi di Bawah 90%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 shadow-lg bg-gray-800 border border-yellow-400">
            <CardHeader>
              <CardTitle className="text-yellow-400">
                Provinsi dengan Akses Listrik Rendah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {electricityAccessData
                  .filter((item) => item.persentase < 90)
                  .sort((a, b) => a.persentase - b.persentase)
                  .map((provinsi) => (
                    <div
                      key={provinsi.provinsi}
                      className="p-4 bg-gray-700 rounded-lg shadow-md border-l-4 border-red-500"
                    >
                      <h3 className="font-semibold text-lg text-yellow-400">
                        {provinsi.provinsi}
                      </h3>
                      <p className="text-red-600 font-semibold">
                        {provinsi.persentase}% Akses Listrik
                      </p>
                      <p className="text-gray-200">{provinsi.region}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
