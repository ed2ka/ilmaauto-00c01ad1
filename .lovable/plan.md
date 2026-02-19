

## Napredna fotogalerija za stranicu detalja dijela

Kreiranje profesionalne fotogalerije inspirisane referencom (OLX/auto oglasi stil) sa svim trazenim funkcionalnostima.

### Funkcionalnosti

**1. Brojac slika (1/3)**
- U donjem lijevom uglu glavne slike prikazan overlay badge sa trenutnom pozicijom: "1 / 3"
- Azurira se automatski pri promjeni slike

**2. Strelice lijevo/desno na glavnoj slici**
- Poluprozirna dugmad sa ChevronLeft/ChevronRight ikonama
- Pozicionirana na sredini lijeve i desne strane slike
- Sakrivaju se ako nema prethodne/sljedece slike

**3. Fullscreen dugme**
- Ikona Maximize u donjem desnom uglu glavne slike
- Klikom otvara fullscreen overlay (tamna pozadina, slika na sredini)

**4. Fullscreen overlay**
- Crna pozadina (bg-black/90) sa slikom centriranom na ekranu
- Strelice lijevo/desno za navigaciju
- Brojac slika (1/3) prikazan i u fullscreenu
- X dugme za zatvaranje u gornjem desnom uglu
- Klik na samu sliku takodjer zatvara fullscreen
- ESC tipka zatvara fullscreen

**5. Swipe podrska (touch)**
- Na mobilnom/touchscreenu: swipe lijevo/desno mijenja sliku
- Radi i na glavnoj slici i u fullscreen modu
- Implementacija preko touch event handlera (touchstart/touchend)

**6. Klik na glavnu sliku otvara fullscreen**
- Klik na veliku sliku = otvara fullscreen prikaz

**7. Thumbnailovi se sinhronizuju**
- Aktivni thumbnail ima border oznaku
- Pri navigaciji strelicama ili swipeom, thumbnail se automatski azurira

### Tehnicke napomene

**Novi fajl:**
- `src/components/PartImageGallery.tsx` -- samostalni komponent sa svom logikom galerije

**Fajl koji se mijenja:**
- `src/pages/PartDetail.tsx` -- zamjena trenutne sekcije slika sa novim `PartImageGallery` komponentom

**State management:**
- `activeImg` (number) -- indeks trenutne slike
- `isFullscreen` (boolean) -- da li je fullscreen otvoren
- `touchStartX` (ref) -- za detekciju swipe smjera

**Touch/Swipe implementacija:**
- `onTouchStart` bilježi pocetnu X poziciju
- `onTouchEnd` racuna razliku -- ako je > 50px, mijenja sliku
- Radi i na glavnoj slici i u fullscreen overlayju

**Fullscreen overlay:**
- Fixed pozicija (fixed inset-0 z-50)
- Portal renderovanje za izbjegavanje z-index problema
- Keyboard listener za ESC (useEffect sa document.addEventListener)
- Klik na sliku zatvara fullscreen (onClick na img elementu)

**Koristene ikone (lucide-react):**
- `ChevronLeft`, `ChevronRight` -- strelice za navigaciju
- `Maximize` -- fullscreen dugme
- `X` -- zatvaranje fullscreena

