// JavaScriptの世界へレッツゴー！
"use client"; // クライアントコンポーネントであることを宣言！

import { Theme } from "@radix-ui/themes"; // 🌟 該当ライブラリのThemeコンポーネントをインポート！
import { useTheme } from "@/module/lib/hooks/useTheme"; // かなかなのカスタムフックをインポート！
import React from "react";

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

export function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  // 1. クライアントコンポーネントのトップで useTheme() を呼び出す！
  const theme = useTheme();

  // ⚠️ まだテーマ情報が取得できていない場合 (null の場合) の対応が必要だよ！
  // たとえば、一旦 "light" を表示しておく、またはローディング画面を出すのが良いね。
  // ここでは、もし null なら一旦 "light" をデフォルトとして使うね。
  const effectiveTheme = theme ?? "light"; // "??" (Null合体演算子) を使うと、nullやundefinedの時に右側の値を使うことができるよ！

  // 2. 取得したテーマ情報 (effectiveTheme) を <Theme> コンポーネントに渡す！
  return (
    <Theme
      accentColor="indigo"
      // 💡 ここ！フックから取った effectiveTheme を渡す！
      appearance={effectiveTheme}
      panelBackground="solid"
      radius="large"
      scaling="100%"
    >
      {/* 3. 子要素をラップする */}
      {children}
    </Theme>
  );
}