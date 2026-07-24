'use client';

import ImpactBadge from './ImpactBadge';
import { formatRupiah } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export default function RecommendationCard({ recommendation }) {
  const { title, impact, estimated_monthly_saving_idr, description } = recommendation;

  return (
    <div className="glass-card rounded-3xl p-5 border border-white/80 flex flex-col justify-between hover:shadow-glass-hover transition-all space-y-4">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-900/10 text-emerald-900 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-semibold text-emerald-950 text-sm leading-snug">{title}</h3>
          </div>
          <ImpactBadge impact={impact} />
        </div>
        <p className="text-xs text-emerald-900/70 mt-3 leading-relaxed font-normal">{description}</p>
      </div>

      <div className="pt-3 border-t border-black/5 flex items-center justify-between">
        <span className="text-xs text-emerald-900/60 font-medium">Potensi Hemat</span>
        <span className="text-emerald-950 font-bold text-sm">
          ~{formatRupiah(estimated_monthly_saving_idr)}/bln
        </span>
      </div>
    </div>
  );
}
