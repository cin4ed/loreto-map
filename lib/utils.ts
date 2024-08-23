import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Zones
export interface ZoneType {
  id: number;
  key: string;
  name: string;
  color: string;
  bgClass: string;
  description: string;
}

export const zoneTypes: ZoneType[] = [
  {
    id: 1,
    key: "H",
    name: "Habitacional",
    color: "#FF5733",
    bgClass: "bg-[#FF5733]",
    description: "Zona destinada a la construcción de viviendas unifamiliares.",
  },
  {
    id: 2,
    key: "HP",
    name: "Habitacional Plurifamiliar",
    color: "#33FF57",
    bgClass: "bg-[#33FF57]",
    description:
      "Zona destinada a la construcción de viviendas multifamiliares.",
  },
  {
    id: 3,
    key: "TR",
    name: "Turístico Residencial",
    color: "#3357FF",
    bgClass: "bg-[#3357FF]",
    description: "Zona destinada a la construcción de viviendas vacacionales.",
  },
  {
    id: 4,
    key: "CU",
    name: "Comercio y Servicios",
    color: "#FF33A8",
    bgClass: "bg-[#FF33A8]",
    description: "Zona destinada a la construcción de locales comerciales.",
  },
  {
    id: 5,
    key: "M",
    name: "Mixto Comercial",
    color: "#FF8C33",
    bgClass: "bg-[#FF8C33]",
    description:
      "Zona destinada a la construcción de locales comerciales y viviendas.",
  },
  {
    id: 6,
    key: "E",
    name: "Equipamiento",
    color: "#33FFF2",
    bgClass: "bg-[#33FFF2]",
    description: "Zona destinada a la construcción de equipamiento urbano.",
  },
  {
    id: 7,
    key: "IN",
    name: "Industrial",
    color: "#FFC733",
    bgClass: "bg-[#FFC733]",
    description: "Zona destinada a la construcción de naves industriales.",
  },
  {
    id: 8,
    key: "Z",
    name: "Zona Verde",
    color: "#33FF85",
    bgClass: "bg-[#33FF85]",
    description: "Zona destinada a la conservación de áreas verdes.",
  },
  {
    id: 9,
    key: "PC",
    name: "Preservación Conservación",
    color: "#C733FF",
    bgClass: "bg-[#C733FF]",
    description: "Zona destinada a la conservación de patrimonio histórico.",
  },
  {
    id: 10,
    key: "V",
    name: "Vialidades",
    color: "#FF3333",
    bgClass: "bg-[#FF3333]",
    description: "Zona destinada a la construcción de vialidades.",
  },
  {
    id: 11,
    key: "AT",
    name: "Alojamiento Turístico",
    color: "#33A8FF",
    bgClass: "bg-[#33A8FF]",
    description: "Zona destinada a la construcción de hoteles y moteles.",
  },
  {
    id: 12,
    key: "CO",
    name: "Corredor Turístico",
    color: "#FF6F33",
    bgClass: "bg-[#FF6F33]",
    description: "Zona destinada a la construcción de corredores turísticos.",
  },
];

export function getZoneTypeByKey(
  key: string,
  zoneTypes: ZoneType[],
): ZoneType | null {
  return zoneTypes.find((zone) => zone.key === key) || null;
}
