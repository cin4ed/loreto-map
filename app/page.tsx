"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Map from "@/components/map";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapIcon, SearchIcon, BuildingIcon, StoreIcon } from "lucide-react";

const secondaryZoneTypes = [
  {
    id: 1,
    key: "H",
    name: "Habitacional",
  },
  {
    id: 2,
    key: "HP",
    name: "Habitacional Plurifamiliar",
  },
  {
    id: 3,
    key: "TR",
    name: "Turístico Residencial",
  },
  {
    id: 4,
    key: "CU",
    name: "Comercio y Servicios",
  },
  {
    id: 5,
    key: "M",
    name: "Mixto Comercial",
  },
  {
    id: 6,
    key: "E",
    name: "Equipamiento",
  },
  {
    id: 7,
    key: "IN",
    name: "Industrial",
  },
  {
    id: 8,
    key: "Z",
    name: "Zona Verde",
  },
  {
    id: 9,
    key: "PC",
    name: "Preservación Conservación",
  },
  {
    id: 10,
    key: "V",
    name: "Vialidades",
  },
  {
    id: 11,
    key: "AT",
    name: "Alojamiento Turístico",
  },
  {
    id: 12,
    key: "CO",
    name: "Corredor Turístico",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
  }

  return (
    <main className="min-h-screen grid grid-cols-6">
      <div className="p-4 col-span-2">
        <h1 className="text-2xl font-bold">eZon</h1>
        <Separator />
        <div className="mt-4 space-y-5">
          {/* Search Box */}
          <div className="border rounded-lg p-2 bg-zinc-50">
            <h3 className="font-bold">Buscar</h3>
            <Separator className="mt-1" />
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
                    <div
                      key={type.id}
                      className="text-xs border rounded p-1 cursor-pointer hover:bg-zinc-100"
                    >
                      {type.name}
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
        </div>
      </div>
      <div className="min-h-screen col-start-3 col-span-4 border-l">
        <Map />
      </div>
    </main>
  );
}
