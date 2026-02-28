/**
 * Formatira cijenu u bosanski format: 1.000,00 KM
 */
export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Po dogovoru";
  return (
    new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price) + " KM"
  );
}
