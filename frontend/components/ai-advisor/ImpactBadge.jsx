'use client';

export default function ImpactBadge({ impact = 'MEDIUM' }) {
  const normalized = impact?.toUpperCase() || 'MEDIUM';
  const variants = {
    HIGH: 'bg-red-50 text-red-700 border-red-200',
    MEDIUM: 'bg-amber-50 text-amber-800 border-amber-200',
    LOW: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };

  return (
    <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${variants[normalized] || variants.MEDIUM}`}>
      Impact {normalized}
    </span>
  );
}
