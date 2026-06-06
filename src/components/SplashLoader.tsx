import React from "react";
import { Loader2, ShieldCheck } from "lucide-react";

interface SplashLoaderProps {
  label?: string;
}

const SplashLoader: React.FC<SplashLoaderProps> = ({ label = "Refreshing your wallet..." }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center gradient-green-deep animate-fadeIn">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fairmonie-light-green/30 blur-3xl animate-float" />
      </div>

      <div className="relative flex flex-col items-center text-white">
        <div className="relative h-24 w-24 mb-6">
          <div className="absolute inset-0 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-green-glow flex items-center justify-center animate-pulse">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-white/30 border-t-white animate-spin" />
        </div>

        <div className="text-2xl font-extrabold tracking-wide">Fairmonie Pay</div>
        <div className="mt-2 flex items-center gap-2 text-sm text-white/85">
          <Loader2 className="w-4 h-4 animate-spin" />
          {label}
        </div>

        <div className="mt-6 h-1.5 w-56 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-white animate-shimmer" />
        </div>

        <p className="mt-5 text-[11px] uppercase tracking-[0.25em] text-white/60">
          Secured • CBN Verified
        </p>
      </div>
    </div>
  );
};

export default SplashLoader;
