import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminApp from "./admin/AdminApp";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* MAIN WEBSITE ROUTES — sections as separate URLs */}
            <Route path="/" element={<Index />} />
            <Route path="/gallery" element={<Index />} />
            <Route path="/membership" element={<Index />} />
            <Route path="/donation" element={<Index />} />
            <Route path="/about" element={<About />} />

            {/* ADMIN PANEL (COMPLETELY SEPARATE) */}
            <Route path="/admin/*" element={<AdminApp />} />

            {/* FALLBACK */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;