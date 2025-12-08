// src/app/layout.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Zen_Kurenaido } from "next/font/google";
import { CustomThemeProvider } from "@/components/ThemeProvider";
import { GoogleTagManager } from "@next/third-parties/google"
import "@radix-ui/themes/styles.css";
import AosInit from "@/components/AosInit"; // 💡 クライアント側の状態管理担当
import Header from "@/components/structure/Header"; // 💡 クライアントコンポーネントになっていることを確認
import RellaxInit from "@/components/RellaxInit";
import { Box } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "かなかなのポートフォリオ",
  description: "Next.jsとRadix UIを使ったポートフォリオサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // 🔽 カスタムCSS変数（フォント設定）
  const customStyles = {
    "--font-body": "var(--font-zen-kurenaido)",
    "--font-heading": "var(--font-zen-kurenaido)",
    "--default-font-family": "var(--font-zen-kurenaido)",
  } as React.CSSProperties;

  return (
    // 💡 修正ポイント２：<html>の直下に余計な空白を入れない（Hydration対策）
    <html lang="ja" style={customStyles}>

      <GoogleTagManager gtmId={process.env.GTM as string} />

      <AosInit />
      <RellaxInit />

      {/* 💡 修正ポイント３：<body> は <html> の直下（Hydration対策） */}
      <body>
        {/* Radix UIのTheme。appearanceにはサーバーで読み込んだ初期値を渡す。 */}
        <CustomThemeProvider>
          {/* HeaderとchildrenはProviderの管理下にあるので、useThemeが使える */}
          <Box className="rellax" data-rellax-speed="10"><Header /></Box>
          <main className="rellax">
            {children}

          </main>
        </CustomThemeProvider>
      </body>
    </html>
  );
}