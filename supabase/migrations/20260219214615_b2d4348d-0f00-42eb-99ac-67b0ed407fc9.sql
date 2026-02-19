
-- Create parts table
CREATE TABLE public.parts (
  id BIGINT PRIMARY KEY,
  dio TEXT NOT NULL,
  broj TEXT NOT NULL DEFAULT '',
  marka TEXT NOT NULL,
  tip TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT '',
  slika1 TEXT,
  slika2 TEXT,
  slika3 TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.parts ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Parts are publicly readable"
ON public.parts FOR SELECT
USING (true);

-- Full-text search index
CREATE INDEX idx_parts_fts ON public.parts
USING GIN (to_tsvector('simple', coalesce(dio, '') || ' ' || coalesce(broj, '') || ' ' || coalesce(marka, '') || ' ' || coalesce(tip, '') || ' ' || coalesce(model, '')));

-- Individual column indexes for filtering
CREATE INDEX idx_parts_marka ON public.parts (marka);
CREATE INDEX idx_parts_tip ON public.parts (tip);
CREATE INDEX idx_parts_dio ON public.parts (dio);
CREATE INDEX idx_parts_broj ON public.parts (broj);

-- Search function
CREATE OR REPLACE FUNCTION public.search_parts(
  p_marka TEXT DEFAULT NULL,
  p_tip TEXT DEFAULT NULL,
  p_dio TEXT DEFAULT NULL,
  p_broj TEXT DEFAULT NULL,
  p_query TEXT DEFAULT NULL,
  p_limit INT DEFAULT 20,
  p_offset INT DEFAULT 0
)
RETURNS TABLE (
  id BIGINT,
  dio TEXT,
  broj TEXT,
  marka TEXT,
  tip TEXT,
  model TEXT,
  slika1 TEXT,
  slika2 TEXT,
  slika3 TEXT,
  is_available BOOLEAN,
  created_at TIMESTAMPTZ,
  total_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total BIGINT;
BEGIN
  -- Count total matching rows
  SELECT count(*) INTO v_total
  FROM public.parts pt
  WHERE (p_marka IS NULL OR pt.marka ILIKE p_marka)
    AND (p_tip IS NULL OR pt.tip ILIKE p_tip)
    AND (p_dio IS NULL OR pt.dio ILIKE '%' || p_dio || '%')
    AND (p_broj IS NULL OR pt.broj ILIKE '%' || p_broj || '%')
    AND (p_query IS NULL OR to_tsvector('simple', coalesce(pt.dio, '') || ' ' || coalesce(pt.broj, '') || ' ' || coalesce(pt.marka, '') || ' ' || coalesce(pt.tip, '') || ' ' || coalesce(pt.model, '')) @@ to_tsquery('simple', p_query));

  RETURN QUERY
  SELECT pt.id, pt.dio, pt.broj, pt.marka, pt.tip, pt.model, pt.slika1, pt.slika2, pt.slika3, pt.is_available, pt.created_at, v_total
  FROM public.parts pt
  WHERE (p_marka IS NULL OR pt.marka ILIKE p_marka)
    AND (p_tip IS NULL OR pt.tip ILIKE p_tip)
    AND (p_dio IS NULL OR pt.dio ILIKE '%' || p_dio || '%')
    AND (p_broj IS NULL OR pt.broj ILIKE '%' || p_broj || '%')
    AND (p_query IS NULL OR to_tsvector('simple', coalesce(pt.dio, '') || ' ' || coalesce(pt.broj, '') || ' ' || coalesce(pt.marka, '') || ' ' || coalesce(pt.tip, '') || ' ' || coalesce(pt.model, '')) @@ to_tsquery('simple', p_query))
  ORDER BY pt.id DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;
