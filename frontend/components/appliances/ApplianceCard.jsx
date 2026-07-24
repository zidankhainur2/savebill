'use client';

import { Plug, Trash2, Edit2, Clock, Zap } from 'lucide-react';
import { formatRupiah, formatKwh } from '@/lib/utils';

export default function ApplianceCard({ appliance, onEdit, onDelete, tariff = 1444.7 }) {
  const kwhMonthly = ((appliance.watt * appliance.qty * appliance.daily_hours) / 1000) * 30;
  const costMonthly = kwhMonthly * tariff;

  return (
    <div className="glass-card rounded-3xl p-5 border border-white/80 flex flex-col justify-between hover:shadow-glass-hover transition-all space-y-4">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center font-bold shrink-0">
              <Plug className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-950 text-sm leading-snug">{appliance.name}</h3>
              <p className="text-xs text-emerald-900/60 font-medium mt-0.5">
                {appliance.qty} unit • {appliance.watt} Watt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(appliance)}
              className="p-1.5 text-emerald-900/40 hover:text-emerald-900 rounded-full hover:bg-black/5 transition-colors"
              title="Edit"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(appliance.id)}
              className="p-1.5 text-emerald-900/40 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
              title="Hapus"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-emerald-900/70 my-3 py-2 px-3 bg-white/60 rounded-2xl border border-black/5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>{appliance.daily_hours} jam/hari</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-700" />
            <span>{formatKwh(kwhMonthly)}/bln</span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-black/5 flex items-center justify-between">
        <span className="text-xs text-emerald-900/60 font-medium">Estimasi Biaya</span>
        <span className="text-base font-bold text-emerald-950">{formatRupiah(costMonthly)}</span>
      </div>
    </div>
  );
}
