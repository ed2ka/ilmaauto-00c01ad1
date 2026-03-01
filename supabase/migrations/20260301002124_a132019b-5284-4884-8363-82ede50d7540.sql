CREATE TABLE public.support_chat_codes (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code text NOT NULL,
  user_message text NOT NULL,
  assistant_response text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.support_chat_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert chat logs"
  ON public.support_chat_codes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can read all"
  ON public.support_chat_codes FOR SELECT
  USING (false);