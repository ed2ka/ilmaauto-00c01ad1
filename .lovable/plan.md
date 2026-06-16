U `src/components/Footer.tsx`, u BRAND koloni (prva lijeva), iznad teksta "ILMA AUTO / ORIGINALNI AUTODIJELOVI" dodati priloženi okrugli logo.

Koraci:
1. Upload `user-uploads://logo-2.png` kao Lovable asset → `src/assets/ilma-auto-logo-round.png.asset.json`.
2. Import pointera u `Footer.tsx`.
3. Iznad `<div className="font-bold text-2xl ...">ILMA AUTO</div>` (linija 61) dodati `<img src={logo.url} alt="ILMA AUTO" className="w-16 h-16 mb-3" />`.

Ništa drugo se ne mijenja.