import { useEffect, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LangCode = "BIH" | "CRO" | "SRB" | "EN" | "DE";

const LANGUAGES: { code: LangCode; flag: string; name: string }[] = [
  { code: "BIH", flag: "🇧🇦", name: "Bosna i Hercegovina" },
  { code: "CRO", flag: "🇭🇷", name: "Hrvatska" },
  { code: "SRB", flag: "🇷🇸", name: "Srbija" },
  { code: "EN", flag: "🇬🇧", name: "English" },
  { code: "DE", flag: "🇩🇪", name: "Deutsch" },
];

const STORAGE_KEY = "ilma_lang";

const LanguageSwitcher = () => {
  const [current, setCurrent] = useState<LangCode>("BIH");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (saved && LANGUAGES.some((l) => l.code === saved)) setCurrent(saved);
  }, []);

  const select = (code: LangCode) => {
    setCurrent(code);
    localStorage.setItem(STORAGE_KEY, code);
  };

  const active = LANGUAGES.find((l) => l.code === current)!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 px-2 py-1 rounded-[9px] text-[11px] font-medium opacity-90 hover:opacity-100 hover:bg-white/10 transition-all outline-none"
        aria-label="Promijeni jezik"
      >
        <span className="text-sm leading-none">{active.flag}</span>
        <ChevronDown className="w-3 h-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[220px] z-[100]">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => select(lang.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span className="text-xs flex-1">{lang.name}</span>
            {current === lang.code && <Check className="w-3.5 h-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;