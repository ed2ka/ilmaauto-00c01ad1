## Problem

On `/prijava`, the blurred ILMA background image is positioned with `absolute inset-0` inside the page wrapper (`min-h-screen`). The Registracija tab is taller than Prijava, so when the user switches tabs the wrapper height changes, the `<img>` (with `h-full object-cover scale-110`) gets re-sized/re-cropped, and the visible background composition jumps.

## Fix

In `src/pages/Auth.tsx`, decouple the background from the content height by anchoring it to the viewport instead of the wrapper:

1. Change the background `<img>` from `absolute inset-0 w-full h-full object-cover blur-md scale-110` to `fixed inset-0 w-screen h-screen object-cover blur-md scale-110` (and add `pointer-events-none`).
2. Change the dark overlay from `absolute inset-0 bg-header/70` to `fixed inset-0 bg-header/70 pointer-events-none`.
3. Keep `main` with `relative z-10` so the form sits above the fixed layers.

Result: the background fills the viewport and stays identical in size/crop regardless of which tab (Prijava / Registracija / Zaboravljena lozinka) is active or how tall the card grows.

No other files change.