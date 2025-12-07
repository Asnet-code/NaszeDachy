// data/roofs.ts

export type RoofTileType = "KODA" | "TITANIA" | "PREMION"; // rozszerzysz jak chcesz

export interface RoofLocation {
  id: string;
  name: string; // np. "Dom jednorodzinny – ul. Słoneczna 5"
  address: string; // pełny adres
  lat: number;
  lng: number;
  tileType: RoofTileType;
  description: string;
  images: string[]; // ścieżki do /public
  googleMapsUrl?: string; // jak chcesz, można generować z lat/lng
}
export const roofLocations: RoofLocation[] = [
  // ---------------- KODA ----------------
  {
    id: "koda-1",
    name: "Dom jednorodzinny – Słoneczna 5",
    address: "ul. Słoneczna 5, 58-100 Świdnica",
    lat: 50.843,
    lng: 16.491,
    tileType: "KODA",
    description: "Dach czterospadowy, kolor antracyt, realizacja 2023.",
    images: ["/roof1.png", "/roof2.png"],
  },
  {
    id: "koda-2",
    name: "Dom – ul. Budowniczych LGOM 21, Lubin",
    address: "ul. Budowniczych LGOM 21, 59-300 Lubin",
    lat: 51.3878,
    lng: 16.1985,
    tileType: "KODA",
    description: "Dach dwuspadowy, kolor grafitowy.",
    images: ["/roof1.png", "/roof2.png"],
  },
  {
    id: "koda-3",
    name: "Dom – Obora, ul. Tulipanowa 3",
    address: "Obora, ul. Tulipanowa 3, 59-335 Lubin",
    lat: 51.4225,
    lng: 16.1961,
    tileType: "KODA",
    description: "Nowoczesny dach w zabudowie jednorodzinnej.",
    images: ["/roof1.png", "/roof2.png"],
  },
  {
    id: "koda-4",
    name: "Dom – Krzeczyn Wielki 14",
    address: "Krzeczyn Wielki 14, 59-300 Lubin",
    lat: 51.4184,
    lng: 16.1539,
    tileType: "KODA",
    description: "Dachówka KODA, kolor brązowy.",
    images: ["/roof1.png", "/roof2.png"],
  },

  // ---------------- TITANIA ----------------
  {
    id: "titania-1",
    name: "Bliźniak – Akacjowa 12",
    address: "ul. Akacjowa 12, 58-100 Świdnica",
    lat: 50.846,
    lng: 16.495,
    tileType: "TITANIA",
    description: "Nowy dach TITANIA, kolor ceglasty, dach dwuspadowy.",
    images: ["/roof1.png", "/roof2.png"],
  },
  {
    id: "titania-2",
    name: "Dom – Miłoradzice 43",
    address: "Miłoradzice 43, 59-300 Lubin",
    lat: 51.3367,
    lng: 16.2544,
    tileType: "TITANIA",
    description: "Realizacja w nowym osiedlu pod Lubinem.",
    images: ["/roof1.png", "/roof2.png"],
  },
  {
    id: "titania-3",
    name: "Dom – Krzeczyn Mały 27",
    address: "Krzeczyn Mały 27, 59-311 Lubin",
    lat: 51.4349,
    lng: 16.1438,
    tileType: "TITANIA",
    description: "Dachówka TITANIA, kolor grafitowy.",
    images: ["/roof1.png", "/roof2.png"],
  },
  {
    id: "titania-4",
    name: "Dom – Siedlce 59",
    address: "Siedlce 59, 59-300 Lubin",
    lat: 51.3655,
    lng: 16.2642,
    tileType: "TITANIA",
    description: "Dach dwuspadowy z dużą powierzchnią.",
    images: ["/roof1.png", "/roof2.png"],
  },

  // ---------------- PREMION ----------------
  {
    id: "premion-1",
    name: "Dom – Raszówka 88",
    address: "Raszówka 88, 59-300 Lubin",
    lat: 51.3429,
    lng: 16.1503,
    tileType: "PREMION",
    description: "Dach PREMION, kolor czarny, realizacja 2022.",
    images: ["/roof1.png", "/roof2.png"],
  },
  {
    id: "premion-2",
    name: "Dom – Chróstnik 19",
    address: "Chróstnik 19, 59-305 Lubin",
    lat: 51.3714,
    lng: 16.1548,
    tileType: "PREMION",
    description: "Nowoczesny dach w zabudowie jednorodzinnej.",
    images: ["/roof1.png", "/roof2.png"],
  },
  {
    id: "premion-3",
    name: "Dom – Lubin, ul. Jagiellonów 12",
    address: "ul. Jagiellonów 12, 59-300 Lubin",
    lat: 51.3904,
    lng: 16.2011,
    tileType: "PREMION",
    description: "Dachówka PREMION, kolor antracytowy.",
    images: ["/roof1.png", "/roof2.png"],
  },
  {
    id: "premion-4",
    name: "Dom – Obora, ul. Wiśniowa 7",
    address: "Obora, ul. Wiśniowa 7, 59-335 Lubin",
    lat: 51.4244,
    lng: 16.1888,
    tileType: "PREMION",
    description: "Realizacja na nowym osiedlu w Oborze.",
    images: ["/roof1.png", "/roof2.png"],
  },
];
