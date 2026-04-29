import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Comparison } from "@/components/sections/Comparison";
import { Languages } from "@/components/sections/Languages";
import { Mission } from "@/components/sections/Mission";
import { FinalCta } from "@/components/sections/FinalCta";

const Index = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = t("meta.description");
      document.head.appendChild(m);
    }
  }, [t]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Problem />
        <Solution />
        <HowItWorks />
        <Comparison />
        <Languages />
        <Mission />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
