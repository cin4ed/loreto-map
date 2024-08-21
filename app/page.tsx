"use client";

import mapboxgl from "mapbox-gl";
import { useRef, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>();
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-111.3426);
  const [lat, setLat] = useState(26.0111);
  const [zoom, setZoom] = useState(14.13);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedFeatureProperties, setSelectedFeatureProperties] =
    useState(null);

  useEffect(() => {
    // Initialize map only once
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/kenneth-quintero/cm043gkrp00eo01pwcjwxfbmj",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("load", () => {
      map.current.on("click", "ezone-uso-de-suelo", (e) => {
        const properties = e.features[0].properties;
        setSelectedFeatureProperties(properties);
        console.log(properties);
      });

      // Add a source for the highlighted polygon
      map.current.addSource("highlighted-polygon", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      // Add a layer to display the highlighted polygon
      map.current.addLayer({
        id: "highlighted-polygon-layer",
        type: "line",
        source: "highlighted-polygon",
        paint: {
          "line-color": "#FF0000", // Outline color (e.g., red)
          "line-width": 3, // Width of the outline
        },
      });

      // Detect clicks on the polygon layer
      map.current.on("click", "ezone-uso-de-suelo", function (e) {
        var clickedPolygon = e.features[0];

        // Update the source with the clicked polygon data
        map.current.getSource("highlighted-polygon").setData({
          type: "FeatureCollection",
          features: [clickedPolygon],
        });

        // // Optionally, show the properties in a popup
        // new mapboxgl.Popup()
        //   .setLngLat(e.lngLat)
        //   .setHTML(
        //     `<strong>${clickedPolygon.properties.name}</strong><br>Type: ${clickedPolygon.properties.type}`
        //   )
        //   .addTo(map.current);
      });

      map.current.on("mouseenter", "ezone-uso-de-suelo", function () {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "ezone-uso-de-suelo", function () {
        map.current.getCanvas().style.cursor = "";
      });
    });
  }, []);

  return (
    <main className="min-h-screen grid grid-cols-6">
      <div className="p-4 col-span-2">
        <h1 className="text-2xl font-bold">eZon</h1>
        <Separator />
        <h2 className="text-xl font-semibold mt-4">Propiedades</h2>
        <p>Selecciona una zona para ver más información.</p>
        <pre className="bg-gray-100 p-4 rounded-lg">
          {JSON.stringify(selectedFeatureProperties, null, 2)}
        </pre>
      </div>
      <div className="min-h-screen col-start-3 col-span-4 border-l">
        <div className="absolute m-2 top-0 right-0 text-xs text-muted-foreground rounded border p-1 bg-muted opacity-50 hover:opacity-100">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="min-h-screen"></div>
      </div>
    </main>
  );
}
