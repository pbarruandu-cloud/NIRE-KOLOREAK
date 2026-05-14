import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import DrawMode from "@/pages/DrawMode";
import MyDrawings from "@/pages/MyDrawings";
import PhotoDecorateMode from "@/pages/PhotoDecorateMode";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AnimatedRouter() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch key={location}>
        <Route path="/" component={Home} />
        <Route path="/draw" component={DrawMode} />
        <Route path="/my-drawings" component={MyDrawings} />
        <Route path="/photo-decorate" component={PhotoDecorateMode} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AnimatedRouter />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
