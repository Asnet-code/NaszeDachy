// app/MapPage.tsx
"use client";

import dynamic from "next/dynamic";

const RoofMapPage = dynamic(() => import("../components/RoofMapPage"), {
  ssr: false,
});

export default function MapPage() {
  return <RoofMapPage />;
}
