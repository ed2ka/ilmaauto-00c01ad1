import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, Send, X, Minus, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME_MSG = `Pozdrav, ja sam ILMA AI, Izvolite? Kako mogu pomoći? Koji dio tražite?

Napomena: ILMA AI nikada od vas neće tražiti bilo kakve lične podatke, niti ih prikuplja u svoju bazu, sav razgovor i podaci koji se razmjenjuju se koriste isključivo u svrhu pretrage i lakšeg pronalaženja dijelova.`;

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const STORAGE_KEY = "ilma-ai-messages";

function loadMessages(): Msg[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [{ role: "assistant", content: WELCOME_MSG }];
}

function saveMessages(msgs: Msg[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {}
}

// Parse [SEARCH_LINK:MARKA:TIP:DIO:TIMESTAMP] tags
function parseSearchLinks(text: string) {
  const linkRegex = /\[SEARCH_LINK:([^:\]]+):([^:\]]*):([^:\]]*):([^\]]+)\]/g;
  const links: { marka: string; tip: string; dio: string; timestamp: string; url: string; label: string }[] = [];
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    const marka = match[1];
    const tip = match[2];
    const dio = match[3];
    const timestamp = match[4];
    const params = new URLSearchParams();
    if (marka) params.set("marka", marka);
    if (tip) params.set("tip", tip);
    if (dio) params.set("dio", dio);
    params.set("t", timestamp);
    const url = `/pretraga?${params.toString()}`;
    const labelParts = [marka, tip].filter(Boolean).join(" ");
    const label = dio ? `Pogledaj rezultate za ${labelParts} - ${dio}` : `Pogledaj rezultate za ${labelParts}`;
    links.push({ marka, tip, dio, timestamp, url, label });
  }
  const cleanText = text.replace(linkRegex, "").trim();
  return { cleanText, links };
}

async function streamChat({
  messages, onDelta, onDone, onError,
}: {
  messages: Msg[]; onDelta: (t: string) => void; onDone: () => void; onError: (status: number) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) { onError(resp.status); return; }
  if (!resp.body) { onDone(); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  let done = false;

  while (!done) {
    const { done: rd, value } = await reader.read();
    if (rd) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const p = JSON.parse(json);
        const c = p.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone();
}

const SearchLinkButton = ({ link }: { link: { url: string; label: string } }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-3 py-2 rounded-md border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
  >
    <ExternalLink className="w-4 h-4 shrink-0" />
    <span>{link.label}</span>
  </a>
);

const MessageBubble = ({ msg }: { msg: Msg }) => {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed bg-primary text-primary-foreground rounded-br-sm">
          {msg.content}
        </div>
      </div>
    );
  }

  const { cleanText, links } = parseSearchLinks(msg.content);

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-2">
        {cleanText && (
          <div className="rounded-lg px-3 py-2 text-sm leading-relaxed bg-muted text-foreground rounded-bl-sm whitespace-pre-wrap">
            {cleanText}
          </div>
        )}
        {links.length > 0 && (
          <div className="space-y-1.5">
            {links.map((l) => <SearchLinkButton key={l.timestamp} link={l} />)}
          </div>
        )}
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-muted rounded-lg px-4 py-2 rounded-bl-sm">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

const WelcomeTypingBubble = ({ text, onComplete }: { text: string; onComplete: () => void }) => {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current++;
      if (indexRef.current > text.length) {
        clearInterval(interval);
        onComplete();
        return;
      }
      setDisplayed(text.slice(0, indexRef.current));
    }, 20);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] space-y-2">
        <div className="rounded-lg px-3 py-2 text-sm leading-relaxed bg-muted text-foreground rounded-bl-sm whitespace-pre-wrap">
          {displayed}
          <span className="inline-block w-[2px] h-[1em] bg-foreground/70 ml-0.5 animate-pulse align-text-bottom" />
        </div>
      </div>
    </div>
  );
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(loadMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTypingWelcome, setIsTypingWelcome] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasAnimatedWelcome = useRef(false);
  const loadedFromStorage = useRef(!!localStorage.getItem(STORAGE_KEY));

  useEffect(() => { saveMessages(messages); }, [messages]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 50);
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, isTypingWelcome, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !hasAnimatedWelcome.current && !loadedFromStorage.current) {
      hasAnimatedWelcome.current = true;
      setIsTypingWelcome(true);
    }
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const send = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    try {
      await streamChat({
        messages: newMessages,
        onDelta: (chunk) => {
          if (!assistantSoFar) {
            setMessages((prev) => [...prev, { role: "assistant", content: chunk }]);
            assistantSoFar = chunk;
          } else {
            assistantSoFar += chunk;
            setMessages((prev) =>
              prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m))
            );
          }
          scrollToBottom();
        },
        onDone: () => setIsLoading(false),
        onError: (status) => {
          setIsLoading(false);
          if (status === 429) {
            toast({ title: "Previše zahtjeva", description: "Pokušajte ponovo za minutu.", variant: "destructive" });
          } else {
            toast({ title: "Greška", description: "Došlo je do greške. Pokušajte ponovo.", variant: "destructive" });
          }
        },
      });
    } catch {
      setIsLoading(false);
      toast({ title: "Greška", description: "Nije moguće povezati se sa asistentom.", variant: "destructive" });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full border border-border bg-background text-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold">AI Pretraga dijelova</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] flex flex-col rounded-xl border border-border bg-background shadow-2xl overflow-hidden sm:w-[380px] sm:h-[500px]
          max-[480px]:w-full max-[480px]:h-full max-[480px]:bottom-0 max-[480px]:right-0 max-[480px]:rounded-none max-[480px]:max-w-none max-[480px]:max-h-none">
          <div className="flex items-center gap-2 px-4 py-3 border-b bg-primary text-primary-foreground shrink-0">
            <MessageCircle className="w-5 h-5" />
            <span className="text-base font-semibold flex-1">ILMA AI</span>
            <button
              onClick={() => {
                setMessages([{ role: "assistant", content: WELCOME_MSG }]);
                setIsTypingWelcome(true);
              }}
              className="p-1 rounded hover:bg-primary-foreground/10 transition-colors"
              aria-label="Obriši chat"
              title="Obriši chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-primary-foreground/10 transition-colors"
              aria-label="Minimiziraj"
            >
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded hover:bg-primary-foreground/10 transition-colors"
              aria-label="Zatvori"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => {
              if (i === 0 && msg.role === "assistant" && msg.content === WELCOME_MSG && isTypingWelcome) {
                return <WelcomeTypingBubble key="welcome-typing" text={WELCOME_MSG} onComplete={() => setIsTypingWelcome(false)} />;
              }
              return <MessageBubble key={i} msg={msg} />;
            })}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && <TypingIndicator />}
          </div>

          <div className="border-t p-3 flex gap-2 shrink-0">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Upišite poruku..."
              disabled={isLoading}
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={isLoading || !input.trim()}
              className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
