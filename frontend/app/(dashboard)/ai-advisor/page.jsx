'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import RecommendationCard from '@/components/ai-advisor/RecommendationCard';
import { Bot, Cpu, AlertCircle, RefreshCw, Plug, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AIAdvisorPage() {
  const queryClient = useQueryClient();

  const { data: appliances = [] } = useQuery({
    queryKey: queryKeys.appliances(),
    queryFn: () => api.get('/appliances'),
  });

  const { data: aiData, isLoading: isFetchingAI } = useQuery({
    queryKey: queryKeys.aiAdvisor(),
    queryFn: () => api.post('/ai/advisor', {}),
    enabled: false,
  });

  const aiMutation = useMutation({
    mutationFn: () => api.post('/ai/advisor', {}),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.aiAdvisor(), data);
    },
  });

  const currentData = aiMutation.data || aiData;
  const isLoading = aiMutation.isPending || isFetchingAI;

  const impactOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
  const sortedRecommendations = currentData?.actionable_recommendations
    ? [...currentData.actionable_recommendations].sort(
        (a, b) => (impactOrder[a.impact] || 4) - (impactOrder[b.impact] || 4)
      )
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wider">AI Recommendation Engine</span>
          <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">AI Energy Advisor</h1>
        </div>

        <button
          onClick={() => aiMutation.mutate()}
          disabled={isLoading || appliances.length === 0}
          className="pill-btn-dark !text-xs !py-2 self-start sm:self-auto disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span>Sedang Menganalisis...</span>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
            </>
          ) : (
            <>
              <span>Jalankan Analisis AI</span>
              <Cpu className="w-3.5 h-3.5 text-emerald-300" />
            </>
          )}
        </button>
      </div>

      {appliances.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-black/5 shadow-xs">
          <div className="w-14 h-14 bg-[#1A3D2F]/10 text-[#1A3D2F] rounded-full flex items-center justify-center mx-auto">
            <Plug className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-emerald-950">Belum Ada Perangkat</h3>
            <p className="text-xs text-emerald-900/60 max-w-sm mx-auto">
              Tambahkan minimal 1 perangkat untuk mendapatkan analisis AI dan rekomendasi penghematan.
            </p>
          </div>
          <Link
            href="/appliances"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A3D2F] text-white font-medium text-xs hover:bg-[#0F2E23] transition-all shadow-xs"
          >
            <span>Ke Halaman Perangkat</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-black/5 animate-pulse space-y-3 shadow-xs">
            <div className="h-4 bg-black/5 rounded w-1/4" />
            <div className="h-4 bg-black/5 rounded w-3/4" />
            <div className="h-4 bg-black/5 rounded w-1/2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="h-40 bg-white rounded-3xl animate-pulse border border-black/5" />
            <div className="h-40 bg-white rounded-3xl animate-pulse border border-black/5" />
          </div>
        </div>
      ) : aiMutation.isError ? (
        <div className="bg-red-50 rounded-3xl p-6 border border-red-200 text-red-700 text-center text-sm flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{aiMutation.error?.message || 'Gagal menghubungi service Gemini AI.'}</span>
        </div>
      ) : currentData ? (
        <div className="space-y-6">
          <div className="bg-[#1A3D2F] rounded-3xl p-6 text-white space-y-3 shadow-xs border border-white/10">
            <div className="flex items-center gap-2 text-emerald-300">
              <div className="w-7 h-7 rounded-full bg-emerald-300/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-300" />
              </div>
              <h3 className="font-bold text-sm">Evaluasi Konsumsi Bulanan</h3>
            </div>
            <p className="text-xs text-white/80 leading-relaxed font-normal">
              {currentData.monthly_assessment}
            </p>
            {currentData.energy_hog_appliance && (
              <p className="text-xs text-emerald-300 font-medium pt-3 border-t border-white/10">
                Perangkat paling tinggi konsumsi: <span className="font-bold text-white">{currentData.energy_hog_appliance}</span>
              </p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Rekomendasi Tindakan Cerdas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sortedRecommendations.map((rec, idx) => (
                <RecommendationCard key={idx} recommendation={rec} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-black/5 shadow-xs">
          <Bot className="w-12 h-12 text-emerald-900/30 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-emerald-950">Analisis AI Siap Dijalankan</h3>
            <p className="text-xs text-emerald-900/60 max-w-sm mx-auto">
              Klik tombol &quot;Jalankan Analisis AI&quot; di atas untuk menghasilkan laporan penghematan dari data perangkat Anda.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
