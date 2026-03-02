CREATE OR REPLACE FUNCTION public.create_inquiry(
  p_user_id uuid DEFAULT NULL,
  p_search_query text DEFAULT '',
  p_customer_name text DEFAULT '',
  p_customer_phone text DEFAULT '',
  p_customer_email text DEFAULT ''
)
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_id bigint;
BEGIN
  INSERT INTO part_inquiries (user_id, search_query, customer_name, customer_phone, customer_email)
  VALUES (p_user_id, p_search_query, p_customer_name, p_customer_phone, p_customer_email)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;