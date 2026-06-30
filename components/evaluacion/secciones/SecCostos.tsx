"use client";

import { CampoTexto, CampoSelect } from "@/components/ui/Campo";
import type { Costos } from "@/lib/types";

const MODELO_PRECIO = [
  { value: "suscripcion_mensual", label: "Suscripción mensual" },
  { value: "suscripcion_anual", label: "Suscripción anual" },
  { value: "licencia_perpetua", label: "Licencia perpetua" },
  { value: "por_camara", label: "Por cámara / dispositivo" },
  { value: "por_usuario", label: "Por usuario" },
  { value: "uso_consumo", label: "Uso / consumo" },
  { value: "hibrido", label: "Híbrido" },
];

interface Props {
  data: Costos;
  onChange: (data: Costos) => void;
}

export function SecCostos({ data, onChange }: Props) {
  const setT = (key: keyof Costos) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange({ ...data, [key]: e.target.value });
  const setS = (key: keyof Costos) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    onChange({ ...data, [key]: e.target.value });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CampoSelect
        label="Modelo de precio"
        options={MODELO_PRECIO}
        value={data.modeloPrecio}
        onChange={setS("modeloPrecio")}
      />
      <CampoTexto
        label="Costo de implementación"
        placeholder="Setup, instalación, consultoría inicial..."
        value={data.costoImplementacion}
        onChange={setT("costoImplementacion")}
      />
      <CampoTexto
        label="Costo de licencia / suscripción"
        placeholder="Precio mensual/anual, escala de precios..."
        value={data.costoLicencia}
        onChange={setT("costoLicencia")}
      />
      <CampoTexto
        label="Costos ocultos o adicionales"
        placeholder="Soporte extra, actualizaciones, almacenamiento..."
        value={data.costosOcultos}
        onChange={setT("costosOcultos")}
      />
      <div className="md:col-span-2">
        <CampoTexto
          label="Relación costo-valor"
          placeholder="¿Vale lo que cuesta en función del beneficio esperado?"
          value={data.relacionCostoValor}
          onChange={setT("relacionCostoValor")}
        />
      </div>
    </div>
  );
}
