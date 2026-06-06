import { useState } from "react";
import Auth from "@/components/Auth";
import Dashboard from "@/components/Dashboard";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
}

export default function FairmonieApp() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <TooltipProvider>
      {/* Responsive shell:
          - Mobile: full-bleed, app fills the screen.
          - Tablet/Desktop: app sits inside a centered phone-frame on a
            decorative gradient backdrop so the mobile-tuned UI feels intentional. */}
      <div className="min-h-screen w-full md:flex md:items-center md:justify-center md:p-6 lg:p-10 md:gradient-green-deep">
        {/* Decorative blobs only on larger screens */}
        <div className="pointer-events-none fixed inset-0 z-0 hidden md:block">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-fairmonie-light-green/30 blur-3xl animate-float" />
          <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-fairmonie-dark-green/40 blur-3xl" />
        </div>

        <div
          className="
            relative z-10 w-full
            md:w-[420px] md:max-w-full
            md:rounded-[2.25rem] md:overflow-hidden
            md:border md:border-white/15
            md:shadow-elevated md:bg-background
            md:h-[860px] md:max-h-[92vh]
            md:flex md:flex-col
          "
        >
          <div className="md:flex-1 md:overflow-y-auto md:overscroll-contain">
            {!user ? (
              <Auth onLogin={(u) => setUser(u)} />
            ) : (
              <Dashboard
                user={user}
                onAddMoney={() => {}}
                onLogout={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("currentUser");
                  }
                  setUser(null);
                  toast({
                    title: "Logged Out",
                    description: "You have been successfully logged out.",
                    duration: 3000,
                  });
                }}
              />
            )}
          </div>
        </div>

        {/* Desktop-only side panel with brand context */}
        <aside className="relative z-10 ml-10 hidden max-w-sm text-white lg:block">
          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-md border border-white/20 shadow-elevated">
            <div className="text-xs font-semibold tracking-[0.2em] text-white/70">
              FAIRMONIE
            </div>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Smart banking, designed for everyone.
            </h2>
            <p className="mt-4 text-sm text-white/80 leading-relaxed">
              Send money, buy airtime &amp; data, pay bills, get instant loans,
              and earn rewards — all from one beautifully simple app.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Instant transfers, 24/7
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Low-rate loans in minutes
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-white" />
                Refer friends, earn bonuses
              </li>
            </ul>
          </div>
          <p className="mt-6 text-center text-xs text-white/60">
            Preview optimized for mobile — looks great on every screen.
          </p>
        </aside>
      </div>

      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}
