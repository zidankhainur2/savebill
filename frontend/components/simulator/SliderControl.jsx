'use client';

export default function SliderControl({ appliance, hours, onChange }) {
  return (
    <div className="glass-card rounded-3xl p-5 border border-white/80 space-y-3 shadow-glass">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-emerald-950 text-sm">{appliance.name}</h4>
          <p className="text-xs text-emerald-900/60 font-medium">
            {appliance.qty} unit • {appliance.watt} Watt
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-950 bg-white border border-black/5 px-3 py-1 rounded-full shadow-xs">
          {hours} jam/hari
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={24}
        step={0.5}
        value={hours}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-emerald-900 cursor-pointer"
      />
    </div>
  );
}
