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
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}
