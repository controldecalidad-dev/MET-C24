"use client";

import { CampoTexto, CampoSelect } from "@/components/ui/Campo";
import { SliderPuntaje } from "@/components/ui/SliderPuntaje";
import type { Seguridad } from "@/lib/types";
import { PESOS } from "@/lib/scoring";

const NIVEL = [
  { value: "alto", label: "Alto" },
  { value: "medio", label: "Medio" },
  { value: "bajo", label: "Bajo" },
  { value: "no_aplica", label: "No aplica / Desconocido" },
];

interface Props {
  data: Seguridad;
  onChange: (data: Seguridad) => void;
}

export function SecSeguridad({ data, onChange }: Props) {
  const set = (key: keyof Seguridad) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CampoTexto
          label="Cifrado de datos"
          placeholder="En tránsito y en reposo, protocolos usados..."
          value={data.cifradoDatos}
          onChange={set("cifradoDatos")}
        />
        <CampoTexto
          label="Autenticación"
          placeholder="2FA, SSO, OAuth, LDAP..."
          value={data.autenticacion}
          onChange={set("autenticacion")}
        />
        <CampoTexto
          label="Cumplimiento normativo"
          placeholder="ISO 27001, GDPR, Ley 25326, SOC2..."
          value={data.cumplimientoNormativo}
          onChange={set("cumplimientoNormativo")}
        />
        <CampoSelect
          label="Gestión de accesos"
          options={NIVEL}
          value={data.gestionAccesos}
          onChange={set("gestionAccesos")}
        />
        <CampoTexto
          label="Auditorías y logs"
          placeholder="¿Guarda logs? ¿Por cuánto tiempo? ¿Auditable?"
          value={data.auditorias}
          onChange={set("auditorias")}
        />
        <CampoTexto
          label="Notas adicionales"
          value={data.notas}
          onChange={set("notas")}
        />
      </div>
      <div className="pt-2 border-t border-gray-100">
        <SliderPuntaje
          label="Puntaje — Seguridad"
          value={data.puntaje}
          onChange={(v) => onChange({ ...data, puntaje: v })}
          peso={PESOS.seguridad}
        />
      </div>
    </div>
  );
}
