const brandLogoMap: Record<string, string> = {
  "AUDI": "https://www.carlogos.org/car-logos/audi-logo-2016.png",
  "BMW": "https://www.carlogos.org/car-logos/bmw-logo-2020.png",
  "CITROEN": "https://www.carlogos.org/car-logos/citroen-logo-2022.png",
  "DACIA": "https://www.carlogos.org/car-logos/dacia-logo-2021.png",
  "FIAT": "https://www.carlogos.org/car-logos/fiat-logo-2020.png",
  "FORD": "https://www.carlogos.org/car-logos/ford-logo-2017.png",
  "HYUNDAI": "https://www.carlogos.org/car-logos/hyundai-logo-2011.png",
  "IVECO": "https://www.carlogos.org/car-logos/iveco-logo.png",
  "KIA": "https://www.carlogos.org/car-logos/kia-logo-2021.png",
  "LAND ROVER": "https://www.carlogos.org/car-logos/land-rover-logo.png",
  "MERCEDES": "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011.png",
  "OPEL": "https://www.carlogos.org/car-logos/opel-logo-2020.png",
  "PEUGEOT": "https://www.carlogos.org/car-logos/peugeot-logo-2021.png",
  "RENAULT": "https://www.carlogos.org/car-logos/renault-logo-2021.png",
  "SEAT": "https://www.carlogos.org/car-logos/seat-logo-2017.png",
  "SKODA": "https://www.carlogos.org/car-logos/skoda-logo-2022.png",
  "SMART": "https://www.carlogos.org/car-logos/smart-logo.png",
  "VOLKSWAGEN": "https://www.carlogos.org/car-logos/volkswagen-logo-2019.png",
  "VOLVO": "https://www.carlogos.org/car-logos/volvo-logo-2014.png",
};

export function getBrandLogo(marka: string): string | null {
  const key = marka.toUpperCase().trim();
  return brandLogoMap[key] ?? null;
}

export function getBrandName(marka: string): string {
  if (!marka) return "";
  return marka.charAt(0).toUpperCase() + marka.slice(1).toLowerCase();
}
