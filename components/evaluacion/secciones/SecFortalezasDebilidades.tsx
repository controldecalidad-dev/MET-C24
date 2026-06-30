"use client";

import { CampoTexto } from "@/components/ui/Campo";

interface Props {
  fortalezas: string;
  debilidades: string;
  onChangeFortalezas: (v: string) => void;
  onChangeDebilidades: (v: string) => void;
}

export function SecFortalezasDebilidades({ fortalezas, debilidades, onChangeFortalezas, onChangeDebilidades }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1">
        <CampoTexto
          label="Fortalezas"
          placeholder="• Integración rápida&#10;• IA con alta precisión&#10;• Buen soporte local..."
          value={fortalezas}
          onChange={(e) => onChangeFortalezas(e.target.value)}
          rows={6}
        />
        <p className="text-xs text-green-600">Aspectos positivos destacados</p>
      </div>
      <div className="space-y-1">
        <CampoTexto
          label="Debilidades"
          placeholder="• Sin API REST nativa&#10;• Costo elevado por sitio&#10;• Soporte solo en inglés..."
          value={debilidades}
          onChange={(e) => onChangeDebilidades(e.target.value)}
          rows={6}
        />
        <p className="text-xs text-red-600">Puntos débiles o limitaciones</p>
      </div>
    </div>
  );
}
