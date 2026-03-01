DROP POLICY IF EXISTS "Anyone can place an order" ON public.orders;
CREATE POLICY "Anyone can place an order"
  ON public.orders FOR INSERT
  TO public
  WITH CHECK (true);