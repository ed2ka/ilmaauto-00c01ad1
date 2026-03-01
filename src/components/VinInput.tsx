import { useRef, useEffect, useCallback } from "react";
import { ClipboardPaste, ClipboardCopy } from "lucide-react";

const VIN_LENGTH = 17;
const VALID_CHAR = /^[A-Z0-9]$/;
// VIN segments: 3 - 6 - 8 (WMI - VDS - VIS)
const SEGMENT_BREAKS = [3, 9];

interface VinInputProps {
  value: string;
  onChange: (value: string) => void;
}

const VinInput = ({ value, onChange }: VinInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const chars = value.padEnd(VIN_LENGTH, "").slice(0, VIN_LENGTH).split("");

  const updateValue = useCallback(
    (newChars: string[]) => {
      onChange(newChars.join("").replace(/\s/g, ""));
    },
    [onChange]
  );

  const fillFromString = useCallback(
    (raw: string) => {
      const cleaned = raw.replace(/\s/g, "").toUpperCase().slice(0, VIN_LENGTH);
      const newChars = Array(VIN_LENGTH).fill("");
      for (let i = 0; i < cleaned.length; i++) {
        if (VALID_CHAR.test(cleaned[i])) newChars[i] = cleaned[i];
      }
      onChange(newChars.join(""));
      // Focus the field after last filled char
      const nextIdx = Math.min(cleaned.length, VIN_LENGTH - 1);
      setTimeout(() => inputsRef.current[nextIdx]?.focus(), 0);
    },
    [onChange]
  );

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\s/g, "").toUpperCase();
    if (!raw) return;
    const ch = raw.slice(-1);
    if (!VALID_CHAR.test(ch)) return;

    const newChars = [...chars];
    newChars[index] = ch;
    updateValue(newChars);

    if (index < VIN_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newChars = [...chars];
      if (newChars[index]) {
        newChars[index] = "";
        updateValue(newChars);
      } else if (index > 0) {
        newChars[index - 1] = "";
        updateValue(newChars);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < VIN_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    fillFromString(e.clipboardData.getData("text"));
  };

  const handleClipboardButton = async () => {
    try {
      const text = await navigator.clipboard.readText();
      fillFromString(text);
    } catch {
      // Clipboard API not available or denied
    }
  };

  const handleCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API not available or denied
    }
  };

  const renderInput = (i: number) => (
    <input
      key={i}
      ref={(el) => { inputsRef.current[i] = el; }}
      type="text"
      inputMode="text"
      maxLength={2}
      value={chars[i] || ""}
      onChange={(e) => handleChange(i, e)}
      onKeyDown={(e) => handleKeyDown(i, e)}
      onPaste={handlePaste}
      onFocus={(e) => e.target.select()}
      className="w-7 h-9 sm:w-8 sm:h-10 text-center border border-input rounded bg-background text-sm font-mono uppercase text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
      aria-label={`VIN karakter ${i + 1}`}
    />
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Inputi */}
      <div className="flex flex-wrap items-center gap-y-2">
        {/* Grupa A: WMI(0-2) + spacer + VDS(3-8) */}
        <div className="inline-flex items-center gap-0.5 flex-shrink-0">
          {[0, 1, 2].map(renderInput)}
          <span className="w-2" />
          {[3, 4, 5, 6, 7, 8].map(renderInput)}
        </div>
        {/* Grupa B: VIS(9-16) */}
        <div className="inline-flex items-center gap-0.5 flex-shrink-0">
          <span className="w-2 hidden sm:inline-block" />
          {[9, 10, 11, 12, 13, 14, 15, 16].map(renderInput)}
        </div>
      </div>
      {/* Dugmići -- uvijek u zasebnom redu */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleClipboardButton}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Zalijepi iz clipboard-a"
        >
          <ClipboardPaste className="w-4 h-4" />
          <span>Zalijepi</span>
        </button>
        <button
          type="button"
          onClick={handleCopyButton}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="Kopiraj VIN"
        >
          <ClipboardCopy className="w-4 h-4" />
          <span>Kopiraj</span>
        </button>
      </div>
    </div>
  );
};

export default VinInput;
