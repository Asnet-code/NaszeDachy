// components/RoofMapPage.tsx
"use client";

import { useMemo, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  roofLocations,
  type RoofLocation,
  type RoofTileType,
} from "@/data/roofs";

const markerIcon = L.icon({
  iconUrl: "/roof-icon3.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const tileTypes: RoofTileType[] = ["KODA", "TITANIA", "PREMION"];

const companyPosition: [number, number] = [
  51.39089070082858, 16.18862162770382,
];

const mapCenter: [number, number] = companyPosition;

export default function RoofMapPage() {
  const [selectedType, setSelectedType] = useState<RoofTileType | "">("");
  const [selectedRoof, setSelectedRoof] = useState<RoofLocation | null>(null);

  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker | null>>({});

  const filteredRoofs = useMemo(() => {
    if (!selectedType) return [];
    return roofLocations.filter((roof) => roof.tileType === selectedType);
  }, [selectedType]);

  const handleOpenGoogleMaps = (roof: RoofLocation) => {
    const url =
      roof.googleMapsUrl ??
      `https://www.google.com/maps?q=${encodeURIComponent(roof.address)}&ll=${
        roof.lat
      },${roof.lng}&z=18`;
    window.open(url, "_blank");
  };

  const focusCenter = (lat: number, lng: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.panTo([lat, lng], { animate: true });
  };

  const openMarkerPopup = (id: string) => {
    const marker = markersRef.current[id];
    if (marker) marker.openPopup();
  };

  const handleSelectRoof = (roof: RoofLocation) => {
    if (!selectedType || selectedType !== roof.tileType) {
      setSelectedType(roof.tileType);
    }

    setSelectedRoof(roof);

    Object.values(markersRef.current).forEach((m) => m?.closePopup());

    focusCenter(roof.lat, roof.lng);

    setTimeout(() => openMarkerPopup(roof.id), 300);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900">
      <div className="w-full md:flex-1 h-[50vh] md:h-auto min-h-[320px]">
        <MapContainer
          center={mapCenter}
          zoom={14}
          scrollWheelZoom
          className="h-full w-full"
          ref={mapRef as any}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={companyPosition}
            icon={L.icon({
              iconUrl: "/company-marker.png",
              iconSize: [45, 45],
              iconAnchor: [22, 45],
            })}
            eventHandlers={{
              click: () => {
                focusCenter(companyPosition[0], companyPosition[1]);
              },
            }}
          >
            <Popup autoPan={false}>
              <div className="text-sm space-y-1">
                <div className="font-semibold tracking-tight">
                  VIRTUS LUBIN DACHY
                </div>
                <div className="text-xs text-slate-600">
                  Przemysłowa 14D, Lubin
                </div>
                <button
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps?q=51.39089070082858,16.18862162770382&z=17",
                      "_blank"
                    )
                  }
                  className="mt-2 inline-flex items-center rounded-md bg-blue-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  Otwórz w Google Maps
                </button>
              </div>
            </Popup>
          </Marker>

          {filteredRoofs.map((roof) => (
            <Marker
              key={roof.id}
              position={[roof.lat, roof.lng]}
              icon={markerIcon}
              ref={(m) => {
                if (m) markersRef.current[roof.id] = m;
              }}
              eventHandlers={{
                click: () => {
                  handleSelectRoof(roof);
                },
              }}
            >
              <Popup autoPan={false}>
                <div className="space-y-1 text-sm">
                  <div className="font-semibold leading-snug">{roof.name}</div>
                  <div className="text-xs text-slate-600">{roof.address}</div>
                  <div className="text-[11px] text-slate-500">
                    Dachówka:{" "}
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                      {roof.tileType}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenGoogleMaps(roof)}
                    className="mt-2 inline-flex items-center rounded-md bg-blue-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm hover:bg-blue-700"
                  >
                    Otwórz w Google Maps
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="w-full md:w-[380px] lg:w-[420px] border-t md:border-t-0 md:border-l border-slate-200 bg-white/95 backdrop-blur flex flex-col shadow-lg">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="text-sm font-semibold tracking-tight">
                Mapa realizacji dachów
              </h2>
              <p className="text-[11px] text-slate-500">
                Wybierz rodzaj dachówki, aby zobaczyć realizacje w terenie.
              </p>
            </div>
            {selectedType && (
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 border border-blue-100">
                {filteredRoofs.length} realizacji
              </span>
            )}
          </div>

          <select
            value={selectedType}
            onChange={(e) => {
              const value = e.target.value as RoofTileType | "";
              setSelectedType(value);
              setSelectedRoof(null);
            }}
            className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Wybierz dachówkę</option>
            {tileTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <div className="mt-3 flex gap-2 flex-wrap">
            {tileTypes.map((t) => {
              const isActive = selectedType === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    const value = isActive ? "" : t;
                    setSelectedType(value as RoofTileType | "");
                    setSelectedRoof(null);
                  }}
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredRoofs.map((roof) => (
            <button
              key={roof.id}
              onClick={() => handleSelectRoof(roof)}
              className={`w-full text-left px-4 py-3 border-b border-slate-100 text-sm transition group hover:bg-slate-50 ${
                selectedRoof?.id === roof.id
                  ? "bg-slate-100/80 border-l-4 border-l-blue-600"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-semibold leading-snug">{roof.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {roof.address}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Dachówka:{" "}
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                      {roof.tileType}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                    Szczegóły
                  </span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[11px] text-slate-500 group-hover:bg-blue-600 group-hover:text-white">
                    i
                  </span>
                </div>
              </div>
            </button>
          ))}

          {selectedType === "" && (
            <div className="px-4 py-6 text-xs text-slate-500">
              Wybierz rodzaj dachówki z listy powyżej, aby zobaczyć dostępne
              realizacje na mapie i liście po prawej stronie.
            </div>
          )}

          {selectedType !== "" && filteredRoofs.length === 0 && (
            <div className="px-4 py-6 text-xs text-slate-500">
              Brak realizacji dla wybranej dachówki. Spróbuj wybrać inny typ
              dachówki.
            </div>
          )}
        </div>

        {selectedRoof && (
          <div className="border-t border-slate-200 p-4 space-y-3 bg-slate-50/80">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-semibold leading-snug">
                  {selectedRoof.name}
                </div>
                <div className="text-xs text-slate-600">
                  {selectedRoof.address}
                </div>
                <div className="text-[11px] text-slate-500">
                  Dachówka:{" "}
                  <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                    {selectedRoof.tileType}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleOpenGoogleMaps(selectedRoof)}
                className="rounded-md bg-blue-600 px-2.5 py-1.5 text-[11px] font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Google Maps
              </button>
            </div>

            {selectedRoof.description && (
              <div className="text-xs text-slate-700 leading-relaxed">
                {selectedRoof.description}
              </div>
            )}

            {selectedRoof.images && selectedRoof.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedRoof.images.map((src) => (
                  <img
                    key={src}
                    src={src}
                    loading="lazy"
                    className="h-24 w-32 min-w-[8rem] rounded-md object-cover border border-slate-200 shadow-sm"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
``;
