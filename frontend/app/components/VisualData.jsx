"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Battery,
  Zap,
  Globe,
  TreePine,
  Factory,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data
const monthlyEnergyUsage = [
  { month: "Jan", penggunaan: 450, biaya: 180 },
  { month: "Feb", penggunaan: 420, biaya: 168 },
  { month: "Mar", penggunaan: 480, biaya: 192 },
  { month: "Apr", penggunaan: 500, biaya: 200 },
  { month: "Mei", penggunaan: 470, biaya: 188 },
  { month: "Jun", penggunaan: 520, biaya: 208 },
];

const sumberEnergi = [
  { name: "Fosil", value: 63 },
  { name: "Renewable", value: 27 },
  { name: "Nuklir", value: 10 },
];

const globalEnergyComparison = [
  { negara: "Indonesia", konsumsi: 1.2 },
  { negara: "China", konsumsi: 6.3 },
  { negara: "USA", konsumsi: 4.8 },
  { negara: "India", konsumsi: 3.5 },
  { negara: "Eropa", konsumsi: 2.9 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function EnergyVisualizationPage() {
  const [activeTab, setActiveTab] = useState("bulanan");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-4">
            <Zap className="w-12 h-12 text-yellow-500 animate-pulse" />
            <span>Visualisasi Konsumsi Energi</span>
            <Globe className="w-12 h-12 text-green-600 animate-pulse" />
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Pahami pola konsumsi energi Anda dan konteks global melalui
            visualisasi mendalam
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Grafik Penggunaan Bulanan */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <Battery className="w-6 h-6 text-blue-500" />
                  <span>Penggunaan Energi Bulanan</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab("bulanan")}
                    className={`px-3 py-1 rounded-md ${
                      activeTab === "bulanan"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Konsumsi
                  </button>
                  <button
                    onClick={() => setActiveTab("biaya")}
                    className={`px-3 py-1 rounded-md ${
                      activeTab === "biaya"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    Biaya
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyEnergyUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey={activeTab === "bulanan" ? "penggunaan" : "biaya"}
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Sumber Energi Global */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Factory className="w-6 h-6 text-green-500" />
                <span>Sumber Energi Global</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sumberEnergi}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sumberEnergi.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {sumberEnergi.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>
                      {entry.name}: {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Perbandingan Konsumsi Energi Antar Negara */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-6 h-6 text-blue-500" />
                <span>Perbandingan Konsumsi Energi Antar Negara</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={globalEnergyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="negara" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="konsumsi" fill="#8884d8">
                    {globalEnergyComparison.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.negara === "Indonesia"
                            ? "#10B981"
                            : entry.negara === "China"
                            ? "#3B82F6"
                            : entry.negara === "USA"
                            ? "#6366F1"
                            : "#9333EA"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Statistik Lingkungan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TreePine className="w-6 h-6 text-green-600" />
                <span>Dampak Lingkungan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600">3.2</h3>
                <p className="text-sm text-gray-600">Ton CO2/Kapita</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-600">27%</h3>
                <p className="text-sm text-gray-600">Energi Terbarukan</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-yellow-600">15%</h3>
                <p className="text-sm text-gray-600">Efisiensi Energi</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-purple-600">5.6</h3>
                <p className="text-sm text-gray-600">Pohon/Tahun</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
