"use client";

import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";
import { type ZoneType, zoneTypes, getZoneTypeByKey } from "@/lib/utils";
// import { Satellite } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function Map() {
  const mapContainer = useRef<HTMLElement>();
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-111.3415);
  const [lat, setLat] = useState(26.0143);
  const [zoom, setZoom] = useState(16.46);
  const [selectedZone, setSelectedZone] = useState<ZoneType | null>(null);
  const [hoveredZone, setHoveredZone] = useState<ZoneType | null>(null);
  const [showSatelliteToggleBtn, setShowSatelliteToggleBtn] = useState(false);
  const [satelliteStyleActive, setSatelliteStyleActive] = useState(false);

  useEffect(() => {
    // Initialize map only once
    if (map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current || "",
      style: "mapbox://styles/kenneth-quintero/cm043gkrp00eo01pwcjwxfbmj",
      center: [lng, lat],
      zoom: 14.7,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Update the lng, lat and zoom state when the map moves
    map.current.on("move", () => {
      const lng = parseFloat(map.current!.getCenter().lng.toFixed(4));
      const lat = parseFloat(map.current!.getCenter().lat.toFixed(4));
      const zoom = parseFloat(map.current!.getZoom().toFixed(2));

      setLng(lng);
      setLat(lat);
      setZoom(zoom);
    });

    // Handle map load
    map.current.on("load", () => {
      // Show the satellite toggle button
      setShowSatelliteToggleBtn(true);

      // Fly to the location
      map.current?.flyTo({
        zoom: zoom,
        pitch: 70,
        bearing: 45,
        speed: 0.5,
      });

      // Handle when the mouse hover over a zone (polygon)
      map.current!.on("mouseenter", "ezone-dataset", function (e) {
        // Change the cursor to a pointer when the mouse is over a zone
        map.current!.getCanvas().style.cursor = "pointer";

        // Get the zone when the mouse hovers over it
        const zoneKey = e.features[0].properties.secondaryZone;
        const zone = getZoneTypeByKey(zoneKey, zoneTypes);
        setHoveredZone(zone);
      });

      // Handle when the mouse leaves a zone (polygon)
      map.current!.on("mouseleave", "ezone-dataset", function () {
        // Reset the cursor when the mouse leaves the zone
        map.current!.getCanvas().style.cursor = "";

        // Remove the hovered zone
        setHoveredZone(null);
      });

      // Add a source for the selected polygon, so we can highlight it
      map.current!.addSource("selected-polygon", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      // Add a layer to display the highlighted polygon
      map.current!.addLayer({
        id: "highlighted-polygon-layer",
        type: "line",
        source: "selected-polygon",
        paint: {
          "line-color": "#555555",
          "line-width": 2,
        },
      });

      // Handle clicks on the polygon layer
      map.current!.on("click", "ezone-dataset", (e) => {
        // Get zone properties on click
        const zoneKey = e.features[0].properties.secondaryZone;
        const zone = getZoneTypeByKey(zoneKey, zoneTypes);
        setSelectedZone(zone);

        // Get the clicked polygon
        // const clickedPolygon = e.features[0];
        // map.current!.getSource("selected-polygon").setData({
        //   type: "FeatureCollection",
        //   features: [clickedPolygon],
        // });

        // Build the popup HTML
        const popupHTML = `
          <div class="flex flex-col gap-2">
            <div class="flex gap-2 items-center">
              <div class="h-5 w-5 ${zone?.bgClass} rounded border border-foreground/20 text-[.7rem] flex justify-center items-center">${zone?.key}</div>
              <p class="text-sm">${zone?.name}</p>
            </div>
            <p class="text-sm text-muted-foreground">${zone?.description}</p>
          </div>
        `;

        // Show a popup with the zone information
        new mapboxgl.Popup({
          closeButton: false,
        })
          .setLngLat(e.lngLat)
          .setHTML(popupHTML)
          .addTo(map.current!);

        // Fly to the clicked polygon
        map.current?.flyTo({
          center: e.lngLat,
          zoom: 16.46,
          speed: 0.5,
        });
      });
    });
  });

  // map.current?.on("style.load", () => {
  //   // Add a source for the selected polygon, so we can highlight it
  //   map.current!.addSource("selected-polygon", {
  //     type: "geojson",
  //     data: {
  //       type: "FeatureCollection",
  //       features: [],
  //     },
  //   });
  // });

  function toggleSatelliteLayer() {
    if (satelliteStyleActive) {
      map.current?.setStyle(
        "mapbox://styles/kenneth-quintero/cm043gkrp00eo01pwcjwxfbmj",
      );
    } else {
      map.current?.setStyle(
        "mapbox://styles/kenneth-quintero/cm0779bkn00l901rba1jl7apd",
      );
    }
    // // Add a layer to display the highlighted polygon
    // map.current!.addLayer({
    //   id: "highlighted-polygon-layer",
    //   type: "line",
    //   source: "selected-polygon",
    //   paint: {
    //     "line-color": "#555555",
    //     "line-width": 2,
    //   },
    // });

    setSatelliteStyleActive(!satelliteStyleActive);
  }

  return (
    <div className="relative">
      {/* Show satellite layer button */}
      {showSatelliteToggleBtn && (
        <button
          onClick={toggleSatelliteLayer}
          className="absolute z-10 top-24 right-0 m-2 p-2 rounded border bg-background block w-8 h-8 text-xs shadow hover:bg-background/20 active:bg-secondary"
        >
          {satelliteStyleActive ? "🌍" : "🛰️"}
        </button>
      )}
      {/* Show lng, lat and zoom area */}
      <div className="absolute z-10 m-2 top-0 left-0 text-xs text-muted-foreground rounded border p-1 bg-muted opacity-50 hover:opacity-100">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      {/* Show hovered zone type */}
      {hoveredZone && (
        <div className="absolute z-10 left-0 bottom-0 m-2 p-2 bg-background flex gap-2 items-center border rounded-md">
          <div className={`h-4 w-4 rounded ${hoveredZone.bgClass}`}></div>
          <p>{hoveredZone.name}</p>
        </div>
      )}
      <div ref={mapContainer} className="min-h-screen"></div>
    </div>
  );
}
