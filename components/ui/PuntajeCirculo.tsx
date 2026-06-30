import { colorPuntaje } from "@/lib/scoring";

interface Props {
  puntaje: number;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { container: "w-12 h-12", text: "text-sm font-bold", label: "text-xs" },
  md: { container: "w-20 h-20", text: "text-xl font-bold", label: "text-xs" },
  lg: { container: "w-28 h-28", text: "text-3xl font-bold", label: "text-sm" },
};

export function PuntajeCirculo({ puntaje, size = "md" }: Props) {
  const s = sizes[size];
  const color = colorPuntaje(puntaje);
  const pct = (puntaje / 10) * 100;
  const stroke = size === "lg" ? 6 : 4;
  const r = size === "lg" ? 50 : size === "md" ? 34 : 22;
  const dim = r * 2 + stroke * 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className={`relative ${s.container} flex items-center justify-center`}>
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        className="absolute inset-0"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={stroke}
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke={puntaje >= 8 ? "#16a34a" : puntaje >= 6 ? "#ca8a04" : "#dc2626"}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="relative text-center">
        <p className={`${s.text} ${color} leading-none`}>{puntaje.toFixed(1)}</p>
        <p className={`${s.label} text-gray-400 leading-none mt-0.5`}>/10</p>
      </div>
    </div>
  );
}
