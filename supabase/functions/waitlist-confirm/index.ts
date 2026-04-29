import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { token } = await req.json().catch(() => ({ token: null }));
    if (!token || typeof token !== "string" || !uuidRegex.test(token)) {
      return json({ ok: false, error: "Invalid token" }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: row, error: selectErr } = await supabase
      .from("waitlist")
      .select("id, confirmed")
      .eq("confirmation_token", token)
      .maybeSingle();

    if (selectErr || !row) return json({ ok: false, error: "Not found" }, 404);

    if (row.confirmed) return json({ ok: true, alreadyConfirmed: true });

    const { error: updateErr } = await supabase
      .from("waitlist")
      .update({ confirmed: true, confirmed_at: new Date().toISOString() })
      .eq("id", row.id);

    if (updateErr) return json({ ok: false, error: "Update failed" }, 500);

    return json({ ok: true });
  } catch (err) {
    console.error("Confirm error:", err);
    return json({ ok: false, error: "Server error" }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
