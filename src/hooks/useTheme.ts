// JavaScriptの世界へレッツゴー！
"use client"
// 必要なReactの機能をインポートするよ！
import { useState, useEffect } from "react";

// テーマを表現するための型ヒントもちゃんとつけるよ！
// TypeScript得意のかなかなに合わせたスタイルだね！
type ColorScheme = "light" | "dark" | null;

/**
 * @description システムのカラーテーマ（"light" または "dark"）を取得・監視するカスタムフック
 * @returns {ColorScheme} 現在のシステムテーマ。取得中は null を返すよ。
 */
export function useTheme(): ColorScheme {
  // テーマの状態を保持するぞ！初期値はまだ取得できていないから null にしておくね。
  const [colorScheme, setColorScheme] = useState<ColorScheme>(null);

  useEffect(() => {
    // window.matchMediaはブラウザでしか使えないから、ここではチェックしないといけないよ。
    if (typeof window === "undefined" || !window.matchMedia) {
      // サーバーサイドやmatchMediaがない環境では何もしないよ。
      return;
    }

    // 🌟 メディアクエリの条件を定義！ダークモードが設定されているかチェックするぞ。
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // 🎨 現在のテーマをチェックして、状態を更新する関数！
    const updateColorScheme = (event: MediaQueryListEvent | MediaQueryList) => {
      // event.matches が true なら「dark」、そうでなければ「light」だね！
      setColorScheme(event.matches ? "dark" : "light");
    };

    // 1. 初回実行！
    updateColorScheme(mediaQuery);

    // 2. テーマが変更されたときのイベントリスナーを設定するよ！
    // addEventListenerは最近のブラウザで推奨されている方法だね。
    mediaQuery.addEventListener("change", updateColorScheme);

    // 🧹 クリーンアップ関数！コンポーネントが消えるときにイベントリスナーをちゃんと解除するんだ。
    return () => {
      mediaQuery.removeEventListener("change", updateColorScheme);
    };
  }, []); // []だから、マウントされたときに一度だけ実行されるよ！

  // テーマの状態を返す！
  return colorScheme;
}