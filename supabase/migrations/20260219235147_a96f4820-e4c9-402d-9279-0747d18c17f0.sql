
DROP FUNCTION IF EXISTS public.search_parts(text,text,text,text,text,integer,integer);

CREATE FUNCTION public.search_parts(p_marka text DEFAULT NULL::text, p_tip text DEFAULT NULL::text, p_dio text DEFAULT NULL::text, p_broj text DEFAULT NULL::text, p_query text DEFAULT NULL::text, p_limit integer DEFAULT 20, p_offset integer DEFAULT 0)
 RETURNS TABLE(id bigint, dio text, broj text, marka text, tip text, model text, slika1 text, slika2 text, slika3 text, is_available boolean, cijena numeric, created_at timestamp with time zone, total_count bigint)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_total BIGINT;
BEGIN
  SELECT count(*) INTO v_total
  FROM public.parts pt
  WHERE (p_marka IS NULL OR pt.marka ILIKE p_marka)
    AND (p_tip IS NULL OR pt.tip ILIKE p_tip)
    AND (p_dio IS NULL OR pt.dio ILIKE '%' || p_dio || '%')
    AND (p_broj IS NULL OR pt.broj ILIKE '%' || p_broj || '%')
    AND (p_query IS NULL OR to_tsvector('simple', coalesce(pt.dio, '') || ' ' || coalesce(pt.broj, '') || ' ' || coalesce(pt.marka, '') || ' ' || coalesce(pt.tip, '') || ' ' || coalesce(pt.model, '')) @@ to_tsquery('simple', p_query));

  RETURN QUERY
  SELECT pt.id, pt.dio, pt.broj, pt.marka, pt.tip, pt.model, pt.slika1, pt.slika2, pt.slika3, pt.is_available, pt.cijena, pt.created_at, v_total
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
$function$;
