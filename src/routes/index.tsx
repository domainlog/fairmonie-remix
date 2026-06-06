import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const FairmonieApp = lazy(() => import("@/pages/FairmonieApp"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fairmonie — Smart Banking for Everyone" },
      {
        name: "description",
        content:
          "Fairmonie is a modern digital banking experience: send money, buy airtime and data, pay bills, get loans, and earn rewards.",
      },
      { property: "og:title", content: "Fairmonie — Smart Banking" },
      {
        property: "og:description",
        content:
          "Send money, buy airtime and data, pay bills, get loans, and earn rewards — all in one app.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center gradient-green-deep">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
      </div>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center gradient-green-deep">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        </div>
      }
    >
      <FairmonieApp />
    </Suspense>
  );
}
