"use client";

import { CampoTexto, CampoSelect } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { ExperienciaUso } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

const NIVEL = [
  { value: "muy_buena", label: "Muy buena" },
  { value: "buena", label: "Buena" },
  { value: "regular", label: "Regular" },
  { value: "mala", label: "Mala" },
];

interface Props {
  data: ExperienciaUso;
  onChange: (data: ExperienciaUso) => void;
}

export function SecExperiencia({ data, onChange }: Props) {
  const set = (key: keyof ExperienciaUso) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampoSelect
          label="Facilidad de uso general"
          options={NIVEL}
          value={data.facilidadUso}
          onChange={set("facilidadUso")}
        />
        <CampoSelect
          label="Interfaz de usuario"
          options={NIVEL}
          value={data.interfazUsuario}
          onChange={set("interfazUsuario")}
        />
        <CampoTexto
          label="Curva de aprendizaje"
          placeholder="¿Cuánto tarda un operador nuevo en ser productivo?"
          value={data.curvaAprendizaje}
          onChange={set("curvaAprendizaje")}
        />
        <CampoTexto
          label="Accesibilidad"
          placeholder="¿Funciona en móvil? ¿Web? ¿Desktop?"
          value={data.accesibilidad}
          onChange={set("accesibilidad")}
        />
        <div className="md:col-span-2">
          <CampoTexto
            label="Notas adicionales"
            value={data.notas}
            onChange={set("notas")}
          />
        </div>
      </div>
      <div className="pt-2 border-t border-gray-100">
        <SliderPuntaje
          label="Puntaje — Experiencia de uso"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.experienciaUso}
        />
      </div>
    </div>
  );
}
