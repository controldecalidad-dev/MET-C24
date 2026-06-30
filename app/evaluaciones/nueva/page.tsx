"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEvaluaciones } from "@/hooks/useEvaluaciones";
import { FormularioEvaluacion } from "@/components/evaluacion/FormularioEvaluacion";
import type { Evaluacion } from "@/lib/types";

export default function NuevaEvaluacionPage() {
  const router = useRouter();
  const { crear, guardar } = useEvaluaciones();
  const [guardando, setGuardando] = useState(false);
  const [evaluacion] = useState(() => crear());

  const handleGuardar = async (ev: Evaluacion) => {
    setGuardando(true);
    const guardada = await guardar(ev);
    setGuardando(false);
    router.push(`/evaluaciones/${guardada.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nueva evaluación</h1>
        <p className="text-sm text-gray-500 mt-1">Completá las secciones y asigná puntajes. El resultado se calcula automáticamente.</p>
      </div>
      <FormularioEvaluacion inicial={evaluacion} onGuardar={handleGuardar} guardando={guardando} />
    </div>
  );
}
