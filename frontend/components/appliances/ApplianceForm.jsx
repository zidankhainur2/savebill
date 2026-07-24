'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function ApplianceForm({ isOpen, onClose, onSubmit, initialData = null, onOpenPresets }) {
  const [name, setName] = useState('');
  const [watt, setWatt] = useState('');
  const [qty, setQty] = useState(1);
  const [dailyHours, setDailyHours] = useState(4);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setWatt(initialData.watt || '');
      setQty(initialData.qty || 1);
      setDailyHours(initialData.daily_hours || 4);
    } else {
      setName('');
      setWatt('');
      setQty(1);
      setDailyHours(4);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      watt: Number(watt),
      qty: Number(qty),
      daily_hours: Number(dailyHours),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="glass-card rounded-[2.5rem] max-w-md w-full p-6 shadow-2xl border border-white/90 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/5">
          <h2 className="text-base font-bold text-emerald-950">
            {initialData ? 'Edit Perangkat' : 'Tambah Perangkat Baru'}
          </h2>
          <button onClick={onClose} className="p-1.5 text-emerald-900/50 hover:text-emerald-950 rounded-full hover:bg-black/5">
            <X className="w-4 h-4" />
          </button>
        </div>

        {!initialData && onOpenPresets && (
          <button
            type="button"
            onClick={onOpenPresets}
            className="w-full py-2.5 px-4 rounded-full border border-black/5 text-emerald-900 bg-white/80 font-medium text-xs flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Pilih dari Katalog Preset</span>
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-emerald-900/80 pl-1">Nama Perangkat</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AC Kamar Utama"
              className="w-full px-4 py-2.5 rounded-2xl border border-black/5 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900 text-sm transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-emerald-900/80 pl-1">Daya (Watt)</label>
              <input
                type="number"
                required
                min={1}
                value={watt}
                onChange={(e) => setWatt(e.target.value)}
                placeholder="400"
                className="w-full px-4 py-2.5 rounded-2xl border border-black/5 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900 text-sm transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-emerald-900/80 pl-1">Jumlah (Unit)</label>
              <input
                type="number"
                required
                min={1}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-black/5 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-900/20 focus:border-emerald-900 text-sm transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-medium text-emerald-900/80 pl-1">
              <span>Penggunaan Harian</span>
              <span className="text-emerald-950 font-bold">{dailyHours} Jam/Hari</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={24}
              step={0.5}
              value={dailyHours}
              onChange={(e) => setDailyHours(e.target.value)}
              className="w-full accent-emerald-900 cursor-pointer"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-black/5 text-emerald-900 font-medium text-xs hover:bg-white/50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full bg-emerald-900 text-white font-medium text-xs hover:bg-emerald-950 transition-all shadow-md"
            >
              Simpan Perangkat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
