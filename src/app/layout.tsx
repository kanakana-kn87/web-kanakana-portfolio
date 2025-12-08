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
    // 💡 修正ポイント２：<html>の直下に余計な空白を入れない（Hydration対策）
    <html lang={config.app.lang as string } suppressHydrationWarning>
      {/* 💡 修正ポイント３：<body> は <html> の直下（Hydration対策） */}
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}