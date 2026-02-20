import alfaRomeoLogo from "@/assets/brands/alfa-romeo.webp";
import audiLogo from "@/assets/brands/audi.webp";
import bmwLogo from "@/assets/brands/bmw.webp";
import citroenLogo from "@/assets/brands/citroen.webp";
import fiatLogo from "@/assets/brands/fiat.webp";
import fordLogo from "@/assets/brands/ford.webp";
import hyundaiLogo from "@/assets/brands/hyundai.webp";
import mazdaLogo from "@/assets/brands/mazda.webp";
import mercedesLogo from "@/assets/brands/mercedes-benz.webp";

const brandLogoMap: Record<string, string> = {
  "ALFA ROMEO": alfaRomeoLogo,
  "AUDI": audiLogo,
  "BMW": bmwLogo,
  "CITROEN": citroenLogo,
  "FIAT": fiatLogo,
  "FORD": fordLogo,
  "HYUNDAI": hyundaiLogo,
  "MAZDA": mazdaLogo,
  "MERCEDES": mercedesLogo,
};

export function getBrandLogo(marka: string): string | null {
  const key = marka.toUpperCase().trim();
  return brandLogoMap[key] ?? null;
}

export function getBrandName(marka: string): string {
  if (!marka) return "";
  return marka.charAt(0).toUpperCase() + marka.slice(1).toLowerCase();
}

export interface BrandInfo {
  name: string;
  logo: string | null;
}

export const allBrands: BrandInfo[] = [
  { name: "ALFA ROMEO", logo: alfaRomeoLogo },
  { name: "AUDI", logo: audiLogo },
  { name: "BMW", logo: bmwLogo },
  { name: "CITROEN", logo: citroenLogo },
  { name: "DACIA", logo: null },
  { name: "FIAT", logo: fiatLogo },
  { name: "FORD", logo: fordLogo },
  { name: "HYUNDAI", logo: hyundaiLogo },
  { name: "IVECO", logo: null },
  { name: "KIA", logo: null },
  { name: "LAND ROVER", logo: null },
  { name: "MAZDA", logo: mazdaLogo },
  { name: "MERCEDES", logo: mercedesLogo },
  { name: "OPEL", logo: null },
  { name: "PEUGEOT", logo: null },
  { name: "RENAULT", logo: null },
  { name: "SEAT", logo: null },
  { name: "SKODA", logo: null },
  { name: "SMART", logo: null },
  { name: "VOLKSWAGEN", logo: null },
  { name: "VOLVO", logo: null },
];
