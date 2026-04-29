import { useEffect, useState } from "react";
import { useSearchParams, Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const WaitlistConfirmed = () => {
  const { t } = useTranslation();
  const { locale } = useParams();
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<"loading" | "ok" | "fail">("loading");

  useEffect(() => {
    if (!token) {
      setState("fail");
      return;
    }
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke("waitlist-confirm", {
          body: { token },
        });
        if (error || !data?.ok) setState("fail");
        else setState("ok");
      } catch {
        setState("fail");
      }
    })();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center container py-20">
        <div className="max-w-md w-full text-center bg-card rounded-2xl border border-border p-10 shadow-card">
          {state === "loading" && (
            <>
              <Loader2 className="size-12 mx-auto text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">{t("waitlist.confirming")}</p>
            </>
          )}
          {state === "ok" && (
            <>
              <div className="size-16 mx-auto rounded-full bg-secondary-soft flex items-center justify-center mb-5">
                <CheckCircle2 className="size-9 text-secondary" />
              </div>
              <h1 className="text-2xl font-bold mb-3">{t("waitlist.confirmedTitle")}</h1>
              <p className="text-muted-foreground mb-6">{t("waitlist.confirmedBody")}</p>
              <Button asChild variant="hero">
                <Link to={`/${locale}`}>← Home</Link>
              </Button>
            </>
          )}
          {state === "fail" && (
            <>
              <div className="size-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-5">
                <XCircle className="size-9 text-destructive" />
              </div>
              <p className="text-muted-foreground mb-6">{t("waitlist.confirmInvalid")}</p>
              <Button asChild variant="outline">
                <Link to={`/${locale}`}>← Home</Link>
              </Button>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WaitlistConfirmed;
