# Language switcher u TopBar-u

## Cilj
Odmah desno od social media ikona dodati dropdown za odabir jezika sa zastavicama i kodovima: **BIH, CRO, SRB, EN, DE**.

## Implementacija

### 1. Zastavice
Koristim **emoji zastavice** (🇧🇦 🇭🇷 🇷🇸 🇬🇧 🇩🇪) — bez dodatnih asseta, native rendering na svim modernim OS-ima, jednostavno. (Ako želiš SVG zastavice umjesto emojija, javi i prebacujem.)

### 2. Nova komponenta `src/components/LanguageSwitcher.tsx`
- shadcn `DropdownMenu` (već postoji u projektu).
- Trigger: trenutna zastava + kod (npr. "🇧🇦 BIH") + chevron, stilizovan da se uklopi u TopBar (tekst-xs, opacity-90, hover-100).
- Items: zastava + kod + puni naziv države (BIH — Bosna i Hercegovina, CRO — Hrvatska, SRB — Srbija, EN — English, DE — Deutsch).
- State u `useState` lokalno za sad, perzistira u `localStorage` pod ključem `ilma_lang`. Default: `BIH`.
- **Ne** integrišem stvarni i18n (react-i18next) — samo UI switcher. Ako poslije zatražiš prevod sadržaja, dodajem i18n biblioteku tada.

### 3. `TopBar.tsx` izmjena
- Importuje `LanguageSwitcher`.
- Wrapper-uje postojeću `<div className="flex items-center gap-1">` (social) i novi `<LanguageSwitcher />` u zajednički flex container sa gapom, tako da je switcher desno od WhatsApp ikone, sa vertikalnim separatorom između.

### 4. Mobile
TopBar je vidljiv i na mobile — switcher ostaje vidljiv (kompaktna verzija: samo zastava + kod, bez punog naziva, pun naziv samo u dropdown listi).

## Šta NE radim
- Ne prevodim postojeći sadržaj sajta (to je veći posao — react-i18next + sve string resurse). Samo dodajem switcher UI sa state-om.
- Ne diram social ikone niti tekst lijevo.
