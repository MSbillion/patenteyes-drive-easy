import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_LANGS = ["it", "en", "ar", "ur", "hi", "zh"];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return json({ error: "Invalid body" }, 400);
    }

    const email = String(body.email ?? "").trim().toLowerCase();
    const preferred_language = String(body.preferred_language ?? "");
    const source_locale = String(body.source_locale ?? "it");

    if (!emailRegex.test(email) || email.length > 255) {
      return json({ error: "Invalid email" }, 400);
    }
    if (!ALLOWED_LANGS.includes(preferred_language)) {
      return json({ error: "Invalid language" }, 400);
    }
    if (!ALLOWED_LANGS.includes(source_locale)) {
      return json({ error: "Invalid source locale" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check duplicate
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id, confirmed")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return json({ ok: true, duplicate: true });
    }

    const { data: inserted, error: insertError } = await supabase
      .from("waitlist")
      .insert({ email, preferred_language, source_locale })
      .select("confirmation_token")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return json({ error: "Insert failed" }, 500);
    }

    // Build confirmation URL — origin sent by client header or fallback
    const origin = req.headers.get("origin") ?? "https://patenteyesapp.com";
    const confirmUrl = `${origin}/${source_locale}/waitlist/confirmed?token=${inserted.confirmation_token}`;

    // TODO: send confirmation email via Resend / Lovable Emails once email domain is configured.
    // For now we log the link so the flow is testable end-to-end.
    console.log(`[Waitlist] ${email} (${preferred_language}, from ${source_locale}) → confirm: ${confirmUrl}`);

    return json({ ok: true, duplicate: false });
  } catch (err) {
    console.error("Unhandled error:", err);
    return json({ error: "Server error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
