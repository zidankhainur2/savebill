'use client';

import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Save, Zap, Target, Bell, Check, User, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const [householdName, setHouseholdName] = useState('Rumah Utama');
  const [powerVa, setPowerVa] = useState(1300);
  const [monthlyBudget, setMonthlyBudget] = useState(500000);
  const [alertThreshold, setAlertThreshold] = useState(80);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        if (session.user.user_metadata?.household_name) {
          setHouseholdName(session.user.user_metadata.household_name);
        }
        if (session.user.user_metadata?.power_va) {
          setPowerVa(session.user.user_metadata.power_va);
        }
        if (session.user.user_metadata?.monthly_budget) {
          setMonthlyBudget(session.user.user_metadata.monthly_budget);
        }
      }
    });

    const storedSettings = localStorage.getItem('savebill_user_settings');
    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings);
        if (parsed.powerVa) setPowerVa(parsed.powerVa);
        if (parsed.monthlyBudget) setMonthlyBudget(parsed.monthlyBudget);
        if (parsed.alertThreshold) setAlertThreshold(parsed.alertThreshold);
        if (parsed.householdName) setHouseholdName(parsed.householdName);
      } catch (e) {
        console.error('Failed to parse settings:', e);
      }
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSavedSuccess(false);

    const settingsData = {
      householdName,
      powerVa,
      monthlyBudget,
      alertThreshold,
    };

    localStorage.setItem('savebill_user_settings', JSON.stringify(settingsData));

    try {
      await supabase.auth.updateUser({
        data: {
          household_name: householdName,
          power_va: powerVa,
          monthly_budget: monthlyBudget,
          alert_threshold: alertThreshold,
        },
      });
    } catch (err) {
      console.warn('Supabase update non-fatal:', err);
    }

    // Invalidate summary queries so all dashboard pages refetch with new power_va
    queryClient.invalidateQueries({ queryKey: ['summary'] });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-medium text-emerald-900/60 uppercase tracking-wider">Pengaturan Profil & Anggaran</span>
          <h1 className="text-2xl font-bold text-emerald-950 tracking-tight">Pengaturan Listrik Rumah</h1>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
            <Check className="w-4 h-4" />
            <span>Pengaturan Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-black/5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5">
            <User className="w-4 h-4 text-[#1A3D2F]" />
            <h2 className="text-base font-bold text-emerald-950">Profil Rumah Tangga</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-emerald-950">Nama Rumah / Lokasi</label>
              <input
                type="text"
                required
                value={householdName}
                onChange={(e) => setHouseholdName(e.target.value)}
                placeholder="Contoh: Rumah Utama / Ruko"
                className="w-full px-4 py-2.5 rounded-2xl border border-black/10 bg-[#F6F7F2] text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-[#1A3D2F]/20 focus:border-[#1A3D2F]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-emerald-950">Email Pengguna</label>
              <input
                type="email"
                disabled
                value={user?.email || 'user@savebill.id'}
                className="w-full px-4 py-2.5 rounded-2xl border border-black/5 bg-gray-100 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* PLN Tariff & Budget Configuration */}
        <div className="bg-white rounded-3xl p-6 border border-black/5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5">
            <Zap className="w-4 h-4 text-[#1A3D2F]" />
            <h2 className="text-base font-bold text-emerald-950">Golongan Daya PLN & Target Anggaran</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-emerald-950">Golongan Daya Listrik (VA)</label>
              <select
                value={powerVa}
                onChange={(e) => setPowerVa(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-2xl border border-black/10 bg-[#F6F7F2] text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-[#1A3D2F]/20 focus:border-[#1A3D2F]"
              >
                <option value={450}>450 VA (Subsidi - Rp 415/kWh)</option>
                <option value={900}>900 VA (R-1M Non-Subsidi - Rp 1.352/kWh)</option>
                <option value={1300}>1.300 VA (R-1 Standar - Rp 1.444,70/kWh)</option>
                <option value={2200}>2.200 VA (R-1 Menengah - Rp 1.444,70/kWh)</option>
                <option value={3500}>3.500 VA (R-2 Besar - Rp 1.699,53/kWh)</option>
                <option value={5500}>5.500 VA (R-2 Utama - Rp 1.699,53/kWh)</option>
              </select>
              <p className="text-[11px] text-emerald-900/60">
                Memengaruhi kalkulasi perkiraan tagihan resmi per kWh.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-emerald-950">Target Batas Anggaran Bulanan (IDR)</label>
              <input
                type="number"
                step={10000}
                required
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                placeholder="500000"
                className="w-full px-4 py-2.5 rounded-2xl border border-black/10 bg-[#F6F7F2] text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-[#1A3D2F]/20 focus:border-[#1A3D2F]"
              />
              <p className="text-[11px] text-emerald-900/60">
                Batas atas tagihan yang ingin Anda capai per bulan.
              </p>
            </div>
          </div>
        </div>

        {/* Alert Notifications Threshold */}
        <div className="bg-white rounded-3xl p-6 border border-black/5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5">
            <Bell className="w-4 h-4 text-[#1A3D2F]" />
            <h2 className="text-base font-bold text-emerald-950">Ambang Peringatan & Notifikasi</h2>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-emerald-950">
              Notifikasi saat estimasi tagihan mencapai % Anggaran:
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={50}
                max={100}
                step={5}
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(Number(e.target.value))}
                className="flex-1 accent-[#1A3D2F]"
              />
              <span className="text-sm font-bold text-emerald-950 bg-[#F6F7F2] px-3 py-1 rounded-full border border-black/5 min-w-[70px] text-center">
                {alertThreshold}%
              </span>
            </div>
            <p className="text-xs text-emerald-900/60">
              Sistem akan menampilkan status peringatan di dashboard jika estimasi bulanan melampaui {alertThreshold}% dari Rp {monthlyBudget.toLocaleString('id-ID')}.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button type="submit" className="pill-btn-dark !text-xs !py-3 !px-7">
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  );
}
