"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Map from "@/components/map";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapIcon, SearchIcon, BuildingIcon, StoreIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const secondaryZoneTypes = [
  {
    id: 1,
    key: "H",
    name: "Habitacional",
    color: "#FF5733", // Rojo
    description: "Zona destinada a la construcción de viviendas unifamiliares.",
  },
  {
    id: 2,
    key: "HP",
    name: "Habitacional Plurifamiliar",
    color: "#33FF57", // Verde
    description: "Zona destinada a la construcción de viviendas multifamiliares.",
  },
  {
    id: 3,
    key: "TR",
    name: "Turístico Residencial",
    color: "#3357FF", // Azul
    description: "Zona destinada a la construcción de viviendas vacacionales.",
  },
  {
    id: 4,
    key: "CU",
    name: "Comercio y Servicios",
    color: "#FF33A8", // Rosa
    description: "Zona destinada a la construcción de locales comerciales.",
  },
  {
    id: 5,
    key: "M",
    name: "Mixto Comercial",
    color: "#FF8C33", // Naranja
    description: "Zona destinada a la construcción de locales comerciales y viviendas.",
  },
  {
    id: 6,
    key: "E",
    name: "Equipamiento",
    color: "#33FFF2", // Cian
    description: "Zona destinada a la construcción de equipamiento urbano.",
  },
  {
    id: 7,
    key: "IN",
    name: "Industrial",
    color: "#FFC733", // Amarillo
    description: "Zona destinada a la construcción de naves industriales.",
  },
  {
    id: 8,
    key: "Z",
    name: "Zona Verde",
    color: "#33FF85", // Verde Lima
    description: "Zona destinada a la conservación de áreas verdes.",
  },
  {
    id: 9,
    key: "PC",
    name: "Preservación Conservación",
    color: "#C733FF", // Púrpura
    description: "Zona destinada a la conservación de patrimonio histórico.",
  },
  {
    id: 10,
    key: "V",
    name: "Vialidades",
    color: "#FF3333", // Rojo Brillante
    description: "Zona destinada a la construcción de vialidades.",
  },
  {
    id: 11,
    key: "AT",
    name: "Alojamiento Turístico",
    color: "#33A8FF", // Azul Claro
    description: "Zona destinada a la construcción de hoteles y moteles.",
  },
  {
    id: 12,
    key: "CO",
    name: "Corredor Turístico",
    color: "#FF6F33", // Mandarina
    description: "Zona destinada a la construcción de corredores turísticos.",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
  }

  const colorVariants = {
    "H": "bg-[#FF5733]",
    "HP": "bg-[#33FF57]",
    "TR": "bg-[#3357FF]",
    "CU": "bg-[#FF33A8]",
    "M": "bg-[#FF8C33]",
    "E": "bg-[#33FFF2]",
    "IN": "bg-[#FFC733]",
    "Z": "bg-[#33FF85]",
    "PC": "bg-[#C733FF]",
    "V": "bg-[#FF3333]",
    "AT": "bg-[#33A8FF]",
    "CO": "bg-[#FF6F33]",
  }

  return (
    <main className="min-h-screen grid grid-cols-6">
      <div className="p-4 col-span-2 overflow-y-scroll h-screen">
        <h1 className="text-2xl font-bold">eZon</h1>
        <Separator />
        <div className="mt-4 space-y-5">
          {/* Search Box */}
          <div className="border rounded-lg p-2 bg-zinc-50">
            <h3 className="font-bold">Buscar</h3>
            <Separator className="mt-1" />
            <div className="relative">
              <form onSubmit={handleSearch} className="flex space-x-2 mt-2">
                <Input
                  type="text"
                  placeholder="Calle Salvatierra 789, Colonia Centro, Loreto, BCS"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">
                  <SearchIcon className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </form>
            </div>
          </div>
          {/* Filtros */}
          <div className="border rounded-lg p-2 bg-zinc-50">
            <h3 className="font-bold">Filtros</h3>
            <Separator className="mt-1" />
            <div className="mt-2 space-y-4">
              <div>
                <h4 className="text-xs font-bold">Tipo de Zona</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Selecciona uno o varios tipos de zona
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {secondaryZoneTypes.map((type) => (
                    <div className="text-xs flex gap-2 border rounded p-1 cursor-pointer hover:bg-zinc-100">
                      <div className={`w-4 h-4 rounded ${colorVariants[type.key]} opacity-80`}></div>
                      <span>{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold">Superficie</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Selecciona un rango de superficie
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-xs border rounded p-1 cursor-pointer hover:bg-zinc-100">
                    <span>0 - 500 m²</span>
                  </div>
                  <div className="text-xs border rounded p-1 cursor-pointer hover:bg-zinc-100">
                    <span>500 - 1000 m²</span>
                  </div>
                  <div className="text-xs border rounded p-1 cursor-pointer hover:bg-zinc-100">
                    <span>1000 - 2000 m²</span>
                  </div>
                  <div className="text-xs border rounded p-1 cursor-pointer hover:bg-zinc-100">
                    <span>2000 - 5000 m²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Active zone */}
          <div className="border rounded-lg p-2 bg-zinc-50">
            <h3 className="font-bold">Zona activa</h3>
            <Separator className="mt-1" />
            <div className="flex gap-2 items-center mt-2">
              <div className="h-5 w-5 bg-[#33FF57] rounded"></div>
              <h3 className="font-semibold text-lg">Habitacional Plurifamiliar</h3>
            </div>
            <p className="mt-2 text-muted-foreground">Zona destinada a la construcción de viviendas multifamiliares.</p>
            <h3 className="font-bold text-sm mt-2">¿Qué se puede construir aquí?</h3>
            <div className="text-sm">
              <p className="p-2">En una zona habitacional plurifamiliar, se pueden construir estructuras diseñadas para albergar a varias familias en unidades de vivienda separadas. Esto incluye, pero no se limita a:</p>
              <ul className="space-y-2 pl-4">
                <li className="space-y-1"><h4><strong>Edificios de apartamentos:</strong></h4><p className="pl-2">Estructuras de varios pisos con múltiples unidades habitacionales, cada una con sus propias instalaciones de cocina, baño y dormitorios.</p></li>
                <li className="space-y-1"><h4><strong>Condominios:</strong></h4><p className="pl-2">Unidades de vivienda individuales dentro de un complejo más grande, donde los propietarios poseen su unidad específica y comparten áreas comunes y servicios con otros propietarios.</p></li>
                <li className="space-y-1"><h4><strong>Dúplex o triplex:</strong></h4><p className="pl-2">Edificaciones que contienen dos o tres unidades de vivienda independientes, respectivamente, a menudo con entradas separadas para cada unidad.</p></li>
                <li className="space-y-1"><h4><strong>Casas adosadas:</strong></h4><p className="pl-2">Viviendas unifamiliares que comparten una o más paredes con otras casas adosadas, pero tienen entradas independientes y suelen tener varios pisos.</p></li>
                <li className="space-y-1"><h4><strong>Viviendas multifamiliares de baja densidad:</strong></h4><p className="pl-2">Pequeños edificios de apartamentos o complejos de casas adosadas que ofrecen un ambiente más íntimo y menos unidades por área, favoreciendo la privacidad y el espacio.</p></li>
              </ul>
              <p className="mt-4">Cada uno de estos tipos de construcción está diseñado para optimizar el uso del espacio y proporcionar viviendas cómodas y funcionales para múltiples familias, promoviendo así una comunidad densa y eficiente.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen col-start-3 col-span-4 border-l" >
        <Map />
      </div>
    </main>
  );
}
