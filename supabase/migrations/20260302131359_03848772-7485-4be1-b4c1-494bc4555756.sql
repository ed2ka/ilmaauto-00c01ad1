DROP POLICY IF EXISTS "Anyone can create inquiry" ON public.part_inquiries;
DROP POLICY IF EXISTS "Users can view own inquiries" ON public.part_inquiries;

CREATE POLICY "Anyone can create inquiry"
  ON public.part_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own inquiries"
  ON public.part_inquiries FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());