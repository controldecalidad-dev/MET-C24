import { type Recomendacion, type Estado } from "@/lib/types";

const recomendacionClases: Record<Recomendacion, string> = {
  "Recomendado": "bg-green-100 text-green-800",
  "Recomendado con reservas": "bg-yellow-100 text-yellow-800",
  "No recomendado": "bg-red-100 text-red-800",
  "Pendiente": "bg-gray-100 text-gray-600",
};

const estadoClases: Record<Estado, string> = {
  "Borrador": "bg-gray-100 text-gray-600",
  "En evaluación": "bg-blue-100 text-blue-800",
  "Completado": "bg-green-100 text-green-800",
  "Archivado": "bg-gray-200 text-gray-500",
};

export function BadgeRecomendacion({ value }: { value: Recomendacion }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${recomendacionClases[value]}`}>
      {value}
    </span>
  );
}

export function BadgeEstado({ value }: { value: Estado }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${estadoClases[value]}`}>
      {value}
    </span>
  );
}
