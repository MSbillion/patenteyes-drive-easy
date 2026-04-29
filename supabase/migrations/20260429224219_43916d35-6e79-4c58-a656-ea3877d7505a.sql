
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  preferred_language TEXT NOT NULL,
  source_locale TEXT NOT NULL DEFAULT 'it',
  confirmed BOOLEAN NOT NULL DEFAULT false,
  confirmation_token UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMPTZ
);

CREATE INDEX idx_waitlist_token ON public.waitlist(confirmation_token);
CREATE INDEX idx_waitlist_email ON public.waitlist(email);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- No public read/write access. All operations go through edge functions using the service role.
-- Deny-all policy by simply not creating any policies — RLS blocks all access by default.
