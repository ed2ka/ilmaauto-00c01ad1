
-- Table for part inquiries
CREATE TABLE public.part_inquiries (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id),
  search_query text not null,
  customer_name text not null default '',
  customer_phone text not null default '',
  customer_email text not null default '',
  status text not null default 'novi',
  created_at timestamptz not null default now()
);

ALTER TABLE public.part_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can create inquiry (guests too)
CREATE POLICY "Anyone can create inquiry" ON public.part_inquiries FOR INSERT WITH CHECK (true);

-- Users can view own inquiries
CREATE POLICY "Users can view own inquiries" ON public.part_inquiries FOR SELECT USING (user_id = auth.uid());

-- Claim function for guest inquiries
CREATE OR REPLACE FUNCTION public.claim_guest_inquiry(p_inquiry_id bigint, p_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE part_inquiries SET user_id = p_user_id
  WHERE id = p_inquiry_id AND user_id IS NULL;
  RETURN FOUND;
END;
$$;
