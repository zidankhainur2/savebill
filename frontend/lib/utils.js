import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatRupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n || 0);

export const formatKwh = (n) => `${(n || 0).toFixed(1)} kWh`;

export function getUserPowerVa() {
  if (typeof window === 'undefined') return 1300;
  try {
    const stored = localStorage.getItem('savebill_user_settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.powerVa) return Number(parsed.powerVa);
    }
  } catch (e) {
    console.error('Failed to parse stored powerVa:', e);
  }
  return 1300;
}

export function useUserPowerVa() {
  const [powerVa, setPowerVa] = useState(getUserPowerVa());

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.user_metadata?.power_va) {
        const vaFromMeta = Number(session.user.user_metadata.power_va);
        setPowerVa(vaFromMeta);
        try {
          const stored = localStorage.getItem('savebill_user_settings');
          const parsed = stored ? JSON.parse(stored) : {};
          parsed.powerVa = vaFromMeta;
          localStorage.setItem('savebill_user_settings', JSON.stringify(parsed));
        } catch (e) {}
      }
    });
  }, []);

  return powerVa;
}
