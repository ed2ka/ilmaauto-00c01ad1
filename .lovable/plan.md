
## Klik na sliku: zone za navigaciju vs fullscreen

Trenutno cijela slika otvara fullscreen pri kliku, a strelice su jedini nacin za navigaciju. Korisnik zeli da klik na lijevu/desnu stranu slike lista slike, a klik na sredinu otvara fullscreen.

### Kako ce raditi

Slika se dijeli na 3 nevidljive zone:
- **Lijeva trecina (0-33%)**: klik = prethodna slika
- **Sredina (33-66%)**: klik = otvori fullscreen
- **Desna trecina (66-100%)**: klik = sljedeca slika

Isto ponasanje vazi i u fullscreen modu:
- Lijeva/desna trecina = navigacija
- Sredina = zatvori fullscreen

### Tehnicke promjene

**Fajl:** `src/components/PartImageGallery.tsx`

**1. Zamjena onClick handlera na glavnom kontejneru slike**

Umjesto `onClick={() => setIsFullscreen(true)}`, novi handler racuna gdje je korisnik kliknuo:

```typescript
const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const ratio = clickX / width;

  if (ratio < 0.33) {
    goPrev();
  } else if (ratio > 0.66) {
    goNext();
  } else {
    setIsFullscreen(true);
  }
};
```

**2. Isti princip u fullscreen overlayju**

Fullscreen slika dobija slican handler -- klik na lijevu/desnu trecinu lista, klik na sredinu zatvara fullscreen:

```typescript
const handleFullscreenImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const ratio = clickX / width;

  if (ratio < 0.33) {
    goPrev();
  } else if (ratio > 0.66) {
    goNext();
  } else {
    setIsFullscreen(false);
  }
};
```

**3. Strelice ostaju kao vizualni indikator**

Arrow dugmad i dalje postoje sa `e.stopPropagation()` tako da ne interferiraju sa zone-based klikom. Sluze kao vizualni hint korisniku da moze listati.

**4. Kursor se mijenja po zonama (opciono poboljsanje)**

Sredina slike zadrzava `cursor-pointer`, a lijeva/desna zona mogu imati odgovarajuci kursor, ali ovo se moze ostaviti jednostavno sa jednim kursorom za cijelu sliku.

### Rezime promjena
- Jedan fajl: `src/components/PartImageGallery.tsx`
- Dodaju se 2 nove funkcije (`handleImageClick`, `handleFullscreenImageClick`)
- Mijenja se `onClick` na glavnom image kontejneru i fullscreen img elementu
- Swipe, strelice, thumbnailovi, keyboard navigacija -- sve ostaje isto
