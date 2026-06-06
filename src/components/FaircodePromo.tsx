import React, { useEffect, useState } from "react";
import { CreditCard, Sparkles, X, ChevronRight } from "lucide-react";

interface FaircodePromoProps {
  onBuy: () => void;
}

const messages = [
  { title: "Unlock instant withdrawals", sub: "Get your Faircode now — only ₦6,500" },
  { title: "🔥 Limited offer today!", sub: "Buy Faircode & cash out in seconds" },
  { title: "Join 50,000+ smart users", sub: "Activate withdrawals with Faircode" },
  { title: "💸 Withdraw without delay", sub: "Faircode = your fast pass to cash" },
];

const FaircodePromo: React.FC<FaircodePromoProps> = ({ onBuy }) => {
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (hidden) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 3500);
    return () => clearInterval(id);
  }, [hidden]);

  // Auto-reappear after dismissal (keeps gentle pressure)
  useEffect(() => {
    if (!hidden) return;
    const t = setTimeout(() => setHidden(false), 25000);
    return () => clearTimeout(t);
  }, [hidden]);

  if (hidden) return null;

  const msg = messages[index];

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm md:max-w-[380px] animate-slideUp">
      <div className="relative overflow-hidden rounded-2xl gradient-green-light shadow-green-glow border border-white/20">
        <div className="absolute inset-0 animate-shimmer pointer-events-none" />
        <button
          onClick={() => setHidden(true)}
          className="absolute top-2 right-2 p-1 rounded-full text-white/80 hover:bg-white/20 transition"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onBuy}
          className="w-full flex items-center gap-3 p-3 pr-10 text-left text-white"
        >
          <div className="relative h-11 w-11 shrink-0 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <CreditCard className="w-5 h-5" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-200 animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div key={msg.title} className="text-sm font-bold truncate animate-fadeIn">
              {msg.title}
            </div>
            <div key={msg.sub} className="text-[11px] text-white/90 truncate animate-fadeIn">
              {msg.sub}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white text-fairmonie-dark-green text-xs font-bold px-2.5 py-1.5 rounded-full shrink-0">
            Buy <ChevronRight className="w-3 h-3" />
          </div>
        </button>

        <div className="flex justify-center gap-1 pb-1.5">
          {messages.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === index ? "w-4 bg-white" : "w-1 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaircodePromo;
