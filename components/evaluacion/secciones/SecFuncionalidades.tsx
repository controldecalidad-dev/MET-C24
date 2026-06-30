"use client";

import { CampoTexto } from "@/components/ui/Campo";
import type { Funcionalidades } from "@/lib/types";

interface Props {
  data: Funcionalidades;
  onChange: (data: Funcionalidades) => void;
}

export function SecFuncionalidades({ data, onChange }: Props) {
  const set = (key: keyof Funcionalidades) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <CampoTexto
          label="Listado de funcionalidades principales"
          placeholder="Listar las funciones core del producto..."
          value={data.listadoPrincipal}
          onChange={set("listadoPrincipal")}
          rows={4}
        />
      </div>
      <CampoTexto
        label="Funciones destacadas"
        placeholder="¿Qué lo diferencia de la competencia?"
        value={data.funcionesDestacadas}
        onChange={set("funcionesDestacadas")}
      />
      <CampoTexto
        label="Limitaciones conocidas"
        placeholder="¿Qué NO puede hacer? ¿Qué falta?"
        value={data.limitaciones}
        onChange={set("limitaciones")}
      />
      <div className="md:col-span-2">
        <CampoTexto
          label="Roadmap del producto"
          placeholder="¿Qué planean agregar? ¿Con qué frecuencia actualizan?"
          value={data.roadmap}
          onChange={set("roadmap")}
        />
      </div>
    </div>
  );
}
