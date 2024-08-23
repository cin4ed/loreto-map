"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const zones = {
  "H": {
    key: "H",
    name: "Habitacional",
    color: "#FF5733",
    class: "bg-[#FF5733]",
    description: "Zona destinada a la construcción de viviendas unifamiliares.",
  },
  "HP": {
    key: "HP",
    name: "Habitacional Plurifamiliar",
    color: "#33FF57",
    class: "bg-[#33FF57]",
    description: "Zona destinada a la construcción de viviendas multifamiliares.",
  },
  "TR": {
    key: "TR",
    name: "Turístico Residencial",
    color: "#3357FF",
    class: "bg-[#3357FF]",
    description: "Zona destinada a la construcción de viviendas vacacionales.",
  },
  "CU": {
    key: "CU",
    name: "Comercio y Servicios",
    color: "#FF33A8",
    class: "bg-[#FF33A8]",
    description: "Zona destinada a la construcción de locales comerciales.",
  },
  "M": {
    key: "M",
    name: "Mixto Comercial",
    color: "#FF8C33",
    class: "bg-[#FF8C33]",
    description: "Zona destinada a la construcción de locales comerciales y viviendas.",
  },
  "E": {
    key: "E",
    name: "Equipamiento",
    color: "#33FFF2",
    class: "bg-[#33FFF2]",
    description: "Zona destinada a la construcción de equipamiento urbano.",
  },
  "IN": {
    key: "IN",
    name: "Industrial",
    color: "#FFC733",
    class: "bg-[#FFC733]",
    description: "Zona destinada a la construcción de naves industriales.",
  },
  "Z": {
    key: "Z",
    name: "Zona Verde",
    color: "#33FF85",
    class: "bg-[#33FF85]",
    description: "Zona destinada a la conservación de áreas verdes.",
  },
  "PC": {
    key: "PC",
    name: "Preservación Conservación",
    color: "#C733FF",
    class: "bg-[#C733FF]",
    description: "Zona destinada a la conservación de patrimonio histórico.",
  },
  "V": {
    key: "V",
    name: "Vialidades",
    color: "#FF3333",
    class: "bg-[#FF3333]",
    description: "Zona destinada a la construcción de vialidades.",
  },
  "AT": {
    key: "AT",
    name: "Alojamiento Turístico",
    color: "#33A8FF",
    class: "bg-[#33A8FF]",
    description: "Zona destinada a la construcción de hoteles y moteles.",
  },
  "CO": {
    key: "CO",
    name: "Corredor Turístico",
    color: "#FF6F33",
    class: "bg-[#FF6F33]",
    description: "Zona destinada a la construcción de corredores turísticos.",
  },
}

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>();
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-111.3415);
  const [lat, setLat] = useState(26.0143);
  const [zoom, setZoom] = useState(16.46);
  const [selectedZone, setSelectedZone] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);

  useEffect(() => {
    // Initialize map only once
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/kenneth-quintero/cm043gkrp00eo01pwcjwxfbmj",
      center: [lng, lat],
      zoom: 14.7,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Get 
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      // Fly to the location
      map.current?.flyTo({
        zoom: zoom,
        pitch: 70,
        bearing: 45,
        speed: 0.5,
      });

      // Get zone properties on click
      map.current.on("click", "ezone-dataset", (e) => {
        const zone = e.features[0].properties;
        setSelectedZone(zone);
        console.log(zone);
      });

      // Handle when the mouse hover over a zone
      map.current.on("mouseenter", "ezone-dataset", function (e) {
        // Change the cursor to a pointer when the mouse is over a zone
        map.current.getCanvas().style.cursor = "pointer";

        // Get the zone when the mouse hovers over it
        const zoneKey = e.features[0].properties.secondaryZone;
        const zone = zones[zoneKey];
        setHoveredZone(zone);
      });

      map.current.on("mouseleave", "ezone-dataset", function () {
        // Reset the cursor when the mouse leaves the zone
        map.current.getCanvas().style.cursor = "";

        // Remove the hovered zone
        setHoveredZone(null);
      });

      // Add a source for the highlighted polygon
      // map.current.addSource("highlighted-polygon", {
      //   type: "geojson",
      //   data: {
      //     type: "FeatureCollection",
      //     features: [],
      //   },
      // });

      // Add a layer to display the highlighted polygon
      // map.current.addLayer({
      //   id: "highlighted-polygon-layer",
      //   type: "line",
      //   source: "highlighted-polygon",
      //   paint: {
      //     "line-color": "#FF0000", // Outline color (e.g., red)
      //     "line-width": 3, // Width of the outline
      //   },
      // });

      // Detect clicks on the polygon layer
      // map.current.on("click", "ezone-uso-de-suelo", function (e) {
      //   var clickedPolygon = e.features[0];

      //   // Update the source with the clicked polygon data
      //   map.current.getSource("highlighted-polygon").setData({
      //     type: "FeatureCollection",
      //     features: [clickedPolygon],
      //   });

        // // Optionally, show the properties in a popup
        // new mapboxgl.Popup()
        //   .setLngLat(e.lngLat)
        //   .setHTML(
        //     `<strong>${clickedPolygon.properties.name}</strong><br>Type: ${clickedPolygon.properties.type}`
        //   )
        //   .addTo(map.current);
      // });
    });
  });

  return (
    <div className="relative">
      <div className="absolute z-10 m-2 top-0 left-0 text-xs text-muted-foreground rounded border p-1 bg-muted opacity-50 hover:opacity-100">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      {/* Show hovered zone type */}
      {hoveredZone && (
        <div className="absolute z-10 left-0 bottom-0 m-2 p-2 bg-background flex gap-2 items-center border rounded-md">
          <div className={`h-4 w-4 rounded ${hoveredZone.class}`}></div>
          <p>{hoveredZone.name}</p>
        </div>
      )}
      <div ref={mapContainer} className="min-h-screen"></div>
    </div>
  );
}
