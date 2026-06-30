"use client";

import { CampoTexto } from "@/components/ui/Campo";
import type { ObjetivoSolucion } from "@/lib/types";

interface Props {
  data: ObjetivoSolucion;
  onChange: (data: ObjetivoSolucion) => void;
}

export function SecObjetivo({ data, onChange }: Props) {
  const set = (key: keyof ObjetivoSolucion) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CampoTexto
        label="Problema que resuelve"
        placeholder="Describir el problema o necesidad que aborda esta solución..."
        value={data.problemaQueResuelve}
        onChange={set("problemaQueResuelve")}
      />
      <CampoTexto
        label="Caso de uso principal"
        placeholder="ej. Verificación remota de alarmas en tiempo real..."
        value={data.casoDeUso}
        onChange={set("casoDeUso")}
      />
      <CampoTexto
        label="Usuarios objetivo"
        placeholder="ej. Operadores de central, supervisores de campo..."
        value={data.usuariosObjetivo}
        onChange={set("usuariosObjetivo")}
      />
      <CampoTexto
        label="Beneficios esperados"
        placeholder="ej. Reducción de falsas alarmas, mayor tiempo de respuesta..."
        value={data.beneficiosEsperados}
        onChange={set("beneficiosEsperados")}
      />
    </div>
  );
}
