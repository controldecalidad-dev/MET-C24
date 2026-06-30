"use client";

import { CampoTexto, CampoSelect } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { InteligenciaArtificial } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

const TIPO_IA = [
  { value: "vision_computacional", label: "Visión computacional" },
  { value: "deteccion_objetos", label: "Detección de objetos (YOLO, etc.)" },
  { value: "reconocimiento_facial", label: "Reconocimiento facial" },
  { value: "anomaly_detection", label: "Detección de anomalías" },
  { value: "llm_asistido", label: "LLM asistido" },
  { value: "hibrido", label: "Híbrido (múltiples modelos)" },
  { value: "reglas", label: "Basado en reglas (sin IA)" },
];

interface Props {
  data: InteligenciaArtificial;
  onChange: (data: InteligenciaArtificial) => void;
}

export function SecIA({ data, onChange }: Props) {
  const set = (key: keyof InteligenciaArtificial) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampoSelect
          label="Tipo de IA utilizada"
          options={TIPO_IA}
          value={data.tipoIA}
          onChange={set("tipoIA")}
        />
        <CampoTexto
          label="Precisión de detección"
          placeholder="% de detección, métricas, condiciones de prueba..."
          value={data.precisionDeteccion}
          onChange={set("precisionDeteccion")}
        />
        <CampoTexto
          label="Falsos positivos / negativos"
          placeholder="Frecuencia observada, condiciones que los generan..."
          value={data.falsosPositivos}
          onChange={set("falsosPositivos")}
        />
        <CampoTexto
          label="Aprendizaje adaptativo"
          placeholder="¿Puede re-entrenarse? ¿Con datos propios?"
          value={data.aprendizajeAdaptativo}
          onChange={set("aprendizajeAdaptativo")}
        />
        <CampoTexto
          label="Transparencia del modelo"
          placeholder="¿Explica sus decisiones? ¿Auditable?"
          value={data.transparenciaModelo}
          onChange={set("transparenciaModelo")}
        />
        <CampoTexto
          label="Notas adicionales"
          value={data.notas}
          onChange={set("notas")}
        />
      </div>
      <div className="pt-2 border-t border-gray-100">
        <SliderPuntaje
          label="Puntaje — Inteligencia Artificial"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.ia}
        />
      </div>
    </div>
  );
}
