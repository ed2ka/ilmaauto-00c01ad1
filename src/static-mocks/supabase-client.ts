/* Static-export mock of the Supabase client (aliased in vite.config.ts mode=static). */

const SAMPLE_PARTS: any[] = [
  { id: 1, dio: "FAR PREDNJI LIJEVI", broj: "8R0941005AB", marka: "AUDI", tip: "Q5", model: "2008-2017",
    slika1: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    slika2: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&q=80",
    slika3: null, is_available: true, cijena: 285, created_at: "2025-12-01T10:00:00Z" },
  { id: 2, dio: "PREDNJI BRANIK", broj: "1K0807221J", marka: "VOLKSWAGEN", tip: "GOLF 5", model: "2003-2008",
    slika1: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    slika2: null, slika3: null, is_available: true, cijena: 165, created_at: "2025-12-01T10:00:00Z" },
  { id: 3, dio: "RETROVIZOR DESNI", broj: "51167282632", marka: "BMW", tip: "E90", model: "2005-2011",
    slika1: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    slika2: null, slika3: null, is_available: true, cijena: 95, created_at: "2025-12-01T10:00:00Z" },
  { id: 4, dio: "STOP SVJETLO LIJEVO", broj: "A2049063701", marka: "MERCEDES", tip: "W204", model: "2007-2014",
    slika1: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    slika2: null, slika3: null, is_available: true, cijena: 120, created_at: "2025-12-01T10:00:00Z" },
  { id: 5, dio: "MOTOR 2.0 TDI", broj: "CBAB", marka: "VOLKSWAGEN", tip: "PASSAT B6", model: "2005-2010",
    slika1: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&q=80",
    slika2: null, slika3: null, is_available: true, cijena: 2450, created_at: "2025-12-01T10:00:00Z" },
  { id: 6, dio: "MJENJAC AUTOMATSKI", broj: "0AM", marka: "AUDI", tip: "A4 B8", model: "2008-2015",
    slika1: "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80",
    slika2: null, slika3: null, is_available: false, cijena: null, created_at: "2025-12-01T10:00:00Z" },
  { id: 7, dio: "AIRBAG VOLANA", broj: "8200748545", marka: "RENAULT", tip: "MEGANE 2", model: "2002-2009",
    slika1: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80",
    slika2: null, slika3: null, is_available: true, cijena: 65, created_at: "2025-12-01T10:00:00Z" },
  { id: 8, dio: 'ALU FELGE 17"', broj: "5GG601025", marka: "VOLKSWAGEN", tip: "GOLF 7", model: "2012-2020",
    slika1: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80",
    slika2: null, slika3: null, is_available: true, cijena: 420, created_at: "2025-12-01T10:00:00Z" },
];

type Filter = { col: string; op: string; val: any };

class Builder {
  table: string;
  filters: Filter[] = [];
  isHead = false; isCount = false; isSingle = false;
  inserting: any = null; deleting = false;
  constructor(table: string) { this.table = table; }
  select(_c?: any, o?: { count?: string; head?: boolean }) {
    if (o?.head) this.isHead = true;
    if (o?.count) this.isCount = true;
    return this;
  }
  insert(p: any) { this.inserting = p; return this; }
  delete() { this.deleting = true; return this; }
  update(_p: any) { return this; }
  eq(col: string, val: any) { this.filters.push({ col, op: "eq", val }); return this; }
  in(col: string, val: any) { this.filters.push({ col, op: "in", val }); return this; }
  order(_c: string, _o?: any) { return this; }
  limit(_n: number) { return this; }
  range() { return this; }
  single() { this.isSingle = true; return this._resolve(); }
  maybeSingle() { this.isSingle = true; return this._resolve(); }
  then(onF: any, onR?: any) { return this._resolve().then(onF, onR); }
  async _resolve(): Promise<any> {
    if (this.deleting || this.inserting) return { data: null, error: null, count: 0 };
    let rows: any[] = this.table === "parts" ? [...SAMPLE_PARTS] : [];
    if (this.isHead && this.isCount) return { data: null, error: null, count: SAMPLE_PARTS.length };
    for (const f of this.filters) {
      if (f.op === "eq") rows = rows.filter((r) => String(r[f.col]) === String(f.val));
      if (f.op === "in") rows = rows.filter((r) => f.val.includes(r[f.col]));
    }
    if (this.isSingle) return { data: rows[0] ?? null, error: rows[0] ? null : { message: "not found" } };
    return { data: rows, error: null };
  }
}

const mockClient: any = {
  from(table: string) { return new Builder(table); },
  rpc(name: string, args: any) {
    if (name === "search_parts") {
      let rows = [...SAMPLE_PARTS];
      const { p_marka, p_tip, p_dio, p_broj, p_query, p_limit = 20, p_offset = 0 } = args || {};
      if (p_marka) rows = rows.filter((r) => r.marka === p_marka);
      if (p_tip) rows = rows.filter((r) => r.tip === p_tip);
      if (p_dio) rows = rows.filter((r) => r.dio.toLowerCase().includes(String(p_dio).toLowerCase()));
      if (p_broj) rows = rows.filter((r) => r.broj.toLowerCase().includes(String(p_broj).toLowerCase()));
      if (p_query) {
        const q = String(p_query).toLowerCase();
        rows = rows.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(q)));
      }
      const total = rows.length;
      return Promise.resolve({ data: rows.slice(p_offset, p_offset + p_limit).map((r) => ({ ...r, total_count: total })), error: null });
    }
    if (name === "create_inquiry") return Promise.resolve({ data: 1, error: null });
    if (name === "claim_guest_inquiry") return Promise.resolve({ data: true, error: null });
    return Promise.resolve({ data: null, error: null });
  },
  functions: {
    invoke: () => Promise.resolve({ data: { error: "Offline (statična) verzija – funkcija nije dostupna." }, error: null }),
  },
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    onAuthStateChange: (cb: any) => {
      setTimeout(() => cb("INITIAL_SESSION", null), 0);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: "Prijava nije dostupna u offline (statičnoj) verziji." } as any }),
    signUp: async () => ({ data: { user: null, session: null }, error: { message: "Registracija nije dostupna u offline (statičnoj) verziji." } as any }),
    signOut: async () => ({ error: null }),
    resetPasswordForEmail: async () => ({ data: null, error: { message: "Reset lozinke nije dostupan u offline verziji." } as any }),
    updateUser: async () => ({ data: null, error: { message: "Nedostupno u offline verziji." } as any }),
    setSession: async () => ({ data: { session: null, user: null }, error: null }),
  },
};

export const supabase: any = mockClient;
