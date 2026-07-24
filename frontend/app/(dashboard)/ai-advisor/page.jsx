'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import RecommendationCard from '@/components/ai-advisor/RecommendationCard';
import { Bot, Sparkles, AlertCircle, RefreshCw, Plug, ArrowUpRight } from 'lucide-react';
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
          className="pill-btn-dark !text-xs !py-1.5 self-start sm:self-auto disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span>Sedang Menganalisis...</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <RefreshCw className="w-3 h-3 animate-spin text-white" />
              </div>
            </>
          ) : (
            <>
              <span>Minta Analisis AI</span>
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </>
          )}
        </button>
      </div>

      {appliances.length === 0 ? (
        <div className="glass-card rounded-[2.5rem] p-12 text-center space-y-4 border border-white/80">
          <div className="w-14 h-14 bg-emerald-900/10 text-emerald-900 rounded-full flex items-center justify-center mx-auto">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-900 text-white font-medium text-xs hover:bg-emerald-950 transition-all shadow-md"
          >
            <span>Ke Halaman Perangkat</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-white/80 animate-pulse space-y-3">
            <div className="h-4 bg-black/5 rounded w-1/4" />
            <div className="h-4 bg-black/5 rounded w-3/4" />
            <div className="h-4 bg-black/5 rounded w-1/2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="h-40 glass-card rounded-3xl animate-pulse" />
            <div className="h-40 glass-card rounded-3xl animate-pulse" />
          </div>
        </div>
      ) : aiMutation.isError ? (
        <div className="glass-card rounded-3xl p-6 bg-red-50/80 border border-red-200 text-red-700 text-center text-sm flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{aiMutation.error?.message || 'Gagal menghubungi service Gemini AI.'}</span>
        </div>
      ) : currentData ? (
        <div className="space-y-6">
          {/* Assessment Block (Ref: Sunrock Dark Glass Card) */}
          <div className="glass-card-dark rounded-[2.5rem] p-6 text-white space-y-3">
            <div className="flex items-center gap-2 text-emerald-300">
              <div className="w-7 h-7 rounded-full bg-emerald-300/20 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm">Evaluasi Konsumsi Bulanan</h3>
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

          {/* Recommendations Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wider">Rekomendasi Tindakan Cerdas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sortedRecommendations.map((rec, idx) => (
                <RecommendationCard key={idx} recommendation={rec} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-[2.5rem] p-12 text-center space-y-4 border border-white/80">
          <Bot className="w-12 h-12 text-emerald-900/30 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-emerald-950">Analisis AI Siap Dijalankan</h3>
            <p className="text-xs text-emerald-900/60 max-w-sm mx-auto">
              Klik tombol &quot;Minta Analisis AI&quot; di atas untuk menghasilkan laporan penghematan dari data perangkat Anda.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
