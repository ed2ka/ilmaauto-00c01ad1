CREATE OR REPLACE FUNCTION public.claim_guest_order(p_order_id bigint, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  UPDATE orders SET user_id = p_user_id
  WHERE id = p_order_id AND user_id IS NULL;
  RETURN FOUND;
END;
$$;