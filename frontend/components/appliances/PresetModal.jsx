'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { queryKeys } from '@/lib/queryKeys';
import { X, Sparkles, Zap } from 'lucide-react';

export default function PresetModal({ isOpen, onClose, onSelectPreset }) {
  const { data: presets = [], isLoading } = useQuery({
    queryKey: queryKeys.presets(),
    queryFn: () => api.get('/appliances/presets'),
    enabled: isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="glass-card rounded-[2.5rem] max-w-lg w-full p-6 max-h-[80vh] flex flex-col shadow-2xl border border-white/90">
        <div className="flex items-center justify-between pb-3 border-b border-black/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <h2 className="text-base font-bold text-emerald-950">Katalog Perangkat Populer</h2>
          </div>
          <button onClick={onClose} className="p-1 text-emerald-900/50 hover:text-emerald-950 rounded-full hover:bg-black/5">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {isLoading ? (
            <p className="text-xs text-emerald-900/40 col-span-2 text-center py-8">Memuat katalog preset...</p>
          ) : (
            presets.map((preset) => (
              <button
                key={preset.id || preset.name}
                onClick={() => {
                  onSelectPreset({
                    name: preset.name,
                    watt: preset.default_watt,
                    qty: 1,
                    daily_hours: 4,
                  });
                  onClose();
                }}
                className="text-left p-3.5 rounded-2xl border border-black/5 bg-white/70 hover:bg-white hover:shadow-xs transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-emerald-950 group-hover:text-emerald-700">
                    {preset.name}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wide bg-emerald-900/5 px-2 py-0.5 rounded-full text-emerald-900/70">
                    {preset.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-900/50">
                  <Zap className="w-3 h-3 text-emerald-700" />
                  <span>{preset.default_watt} Watt</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
