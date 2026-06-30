"use client";

interface Props {
  label: string;
  value: number;
  onChange: (v: number) => void;
  peso?: number;
}

export function SliderPuntaje({ label, value, onChange, peso }: Props) {
  const color =
    value >= 8 ? "accent-green-600" : value >= 6 ? "accent-yellow-500" : "accent-red-600";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">
          {label}
          {peso !== undefined && (
            <span className="ml-1 text-xs text-gray-400 font-normal">(peso {peso}%)</span>
          )}
        </label>
        <span
          className={`text-lg font-bold tabular-nums ${
            value >= 8 ? "text-green-600" : value >= 6 ? "text-yellow-600" : "text-red-600"
          }`}
        >
          {value}/10
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={0.5}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 ${color}`}
      />
      <div className="flex justify-between text-xs text-gray-400">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );
}
