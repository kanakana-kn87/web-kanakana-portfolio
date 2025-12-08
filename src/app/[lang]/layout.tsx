// src/app/layout.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { CustomThemeProvider } from "@/module/components/provider/ThemeProvider";
import { GoogleTagManager } from "@next/third-parties/google"
import "@radix-ui/themes/styles.css";
import AosInit from "@/module/components/AosInit"; // 💡 クライアント側の状態管理担当
import Header from "@/module/components/organism/Header"; // 💡 クライアントコンポーネントになっていることを確認
import RellaxInit from "@/module/components/RellaxInit";
import { Box } from "@radix-ui/themes";
import getServerConfig from "@/module/lib/server/config";
import I18nProvider from '@/module/components/provider/I18nProvider';
import { getMessages, setRequestLocale } from 'next-intl/server';

const config = getServerConfig();

export const metadata: Metadata = {
  title: config.app.title as string,
  description: "Next.jsとRadix UIを使ったポートフォリオサイト",
};
type Props = {
  children: React.ReactNode;
  params: { lang: string };
};
export default async function RootLayout({ children, params }: Readonly<Props>) {
  const { lang } = await params;

  setRequestLocale(lang);
  const messages = await getMessages();

  // 🔽 カスタムCSS変数（フォント設定）
  const customStyles = {
    "--font-body": "var(--font-zen-kurenaido)",
    "--font-heading": "var(--font-zen-kurenaido)",
    "--default-font-family": "var(--font-zen-kurenaido)",
  } as React.CSSProperties;

  return (
    // 💡 修正ポイント２：<html>の直下に余計な空白を入れない（Hydration対策）
    <html lang={config.app.lang as string} suppressHydrationWarning>

      <GoogleTagManager gtmId={process.env.GTM as string} />

      <AosInit />
      <RellaxInit />

      {/* 💡 修正ポイント３：<body> は <html> の直下（Hydration対策） */}
      <body suppressHydrationWarning>
        <I18nProvider locale={lang} messages={messages}>
          {/* Radix UIのTheme。appearanceにはサーバーで読み込んだ初期値を渡す。 */}
          <CustomThemeProvider>
            {/* HeaderとchildrenはProviderの管理下にあるので、useThemeが使える */}
            <Box className="rellax" data-rellax-speed="-10" data-rellax-zindex="5"><Header /></Box>
            <main className="rellax" data-rellax-speed="0" data-rellax-zindex="0">
              {children}

            </main>
          </CustomThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}