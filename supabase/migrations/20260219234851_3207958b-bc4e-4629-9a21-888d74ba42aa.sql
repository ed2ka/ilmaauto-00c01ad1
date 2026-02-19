
-- Add cijena column to parts table
ALTER TABLE public.parts ADD COLUMN cijena numeric(10,2) DEFAULT NULL;

-- Create orders table
CREATE TABLE public.orders (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  part_id bigint NOT NULL REFERENCES public.parts(id),
  part_name text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  part_price numeric(10,2),
  shipping_price numeric(10,2) NOT NULL DEFAULT 10.00,
  total_price numeric(10,2),
  status text NOT NULL DEFAULT 'nova',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public ordering without auth)
CREATE POLICY "Anyone can place an order"
  ON public.orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can view orders (admin access)
CREATE POLICY "Authenticated users can view orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (true);
