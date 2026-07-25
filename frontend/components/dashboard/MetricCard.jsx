'use client';

export default function MetricCard({ label, value, subtitle, icon: Icon, valueColor = 'text-[#0A0A0A]', highlight = false }) {
  if (highlight) {
    return (
      <div className="bg-black/[0.02] p-1.5 rounded-[1.5rem] ring-1 ring-black/[0.04]">
        <div className="bg-[#1A3D2F] rounded-[calc(1.5rem-0.375rem)] p-5 flex flex-col justify-between h-full relative overflow-hidden transition-transform duration-200 hover:scale-[1.02] shadow-[0_4px_20px_rgba(26,61,47,0.1)]">
          <div className="relative z-10 flex items-center justify-between mb-4">
            <span className="text-[10px] font-semibold tracking-widest text-white/60 uppercase">{label}</span>
            {Icon && (
              <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center shadow-sm ring-1 ring-white/5">
                <Icon className="w-4 h-4" />
              </div>
            )}
          </div>
          <div className="relative z-10">
            <p className="text-2xl font-semibold text-white tracking-tighter leading-none mb-1">{value}</p>
            {subtitle && (
              <p className="text-[11px] text-white/50 font-medium mt-2 pt-2 border-t border-white/10">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/[0.02] p-1.5 rounded-[1.5rem] ring-1 ring-black/[0.04]">
      <div className="bg-white rounded-[calc(1.5rem-0.375rem)] p-5 flex flex-col justify-between h-full border border-black/[0.04] transition-transform duration-200 hover:scale-[1.02] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-semibold tracking-widest text-black/40 uppercase">{label}</span>
          {Icon && (
            <div className="w-8 h-8 rounded-full bg-black/5 text-[#1A3D2F] flex items-center justify-center ring-1 ring-black/[0.04]">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
        <div>
          <p className={`text-2xl font-semibold tracking-tighter leading-none mb-1 ${valueColor}`}>{value}</p>
          {subtitle && (
            <p className="text-[11px] text-black/40 font-medium mt-2 pt-2 border-t border-black/[0.04]">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
