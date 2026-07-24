'use client';

export default function MetricCard({ label, value, subtitle, icon: Icon, valueColor = 'text-emerald-950', highlight = false }) {
  if (highlight) {
    return (
      <div className="glass-card-dark rounded-3xl p-6 flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium tracking-wide text-emerald-300/80 uppercase">{label}</span>
            {Icon && (
              <div className="w-8 h-8 rounded-full bg-emerald-300/20 text-emerald-300 flex items-center justify-center border border-emerald-300/30">
                <Icon className="w-4 h-4" />
              </div>
            )}
          </div>
          <p className="text-2xl lg:text-3xl font-bold text-emerald-300 mt-2 tracking-tight">{value}</p>
        </div>
        {subtitle && (
          <p className="text-xs text-white/60 mt-3 pt-2 border-t border-white/10 relative z-10">{subtitle}</p>
        )}
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-glass-hover">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium tracking-wide text-emerald-900/60 uppercase">{label}</span>
          {Icon && (
            <div className="w-8 h-8 rounded-full bg-emerald-900/10 text-emerald-900 flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
        <p className={`text-2xl font-bold mt-2 tracking-tight ${valueColor}`}>{value}</p>
      </div>
      {subtitle && (
        <p className="text-xs text-emerald-900/60 mt-3 pt-2 border-t border-black/5 font-medium">{subtitle}</p>
      )}
    </div>
  );
}
