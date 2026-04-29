import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/i18n/config";
import { LocaleLayout, LocaleRedirect } from "@/i18n/LocaleLayout";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import WaitlistConfirmed from "./pages/WaitlistConfirmed.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LocaleRedirect />} />
          <Route path="/:locale" element={<LocaleLayout />}>
            <Route index element={<Index />} />
            <Route path="waitlist/confirmed" element={<WaitlistConfirmed />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
