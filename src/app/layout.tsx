// src/app/layout.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import getServerConfig from "@/module/lib/server/config";

const config = getServerConfig();

export const metadata: Metadata = {
  title: config.app.title as string,
  description: "Next.jsとRadix UIを使ったポートフォリオサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      {children}
    </>
  );
}