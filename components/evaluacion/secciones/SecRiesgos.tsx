"use client";

import { CampoTexto } from "@/components/ui/Campo";
import type { Riesgos } from "@/lib/types";

interface Props {
  data: Riesgos;
  onChange: (data: Riesgos) => void;
}

export function SecRiesgos({ data, onChange }: Props) {
  const set = (key: keyof Riesgos) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CampoTexto
        label="Riesgos técnicos"
        placeholder="Dependencias críticas, puntos de falla, obsolescencia..."
        value={data.riesgosTecnicos}
        onChange={set("riesgosTecnicos")}
      />
      <CampoTexto
        label="Riesgos operativos"
        placeholder="Impacto en operaciones si falla, curva de adopción..."
        value={data.riesgosOperativos}
        onChange={set("riesgosOperativos")}
      />
      <CampoTexto
        label="Riesgos del proveedor"
        placeholder="Estabilidad financiera, track record, dependencia..."
        value={data.riesgosProveedor}
        onChange={set("riesgosProveedor")}
      />
      <CampoTexto
        label="Plan de mitigación"
        placeholder="¿Qué acciones tomaría para reducir estos riesgos?"
        value={data.planMitigacion}
        onChange={set("planMitigacion")}
      />
    </div>
  );
}
