// src/i18n/navigation.ts (最終確定版)

// ✨ createNavigationとPathnamesを同じnext-intl/navigationからインポート
import { 
  createNavigation, 
  Pathnames, 
  // 💡 ここで Pathnames をインポートする場所が重要だったりする！
} from "next-intl/navigation" 

// 💡 サイトで使える言語のリストを定義するよ！
export const locales = ["ja", "en"] as const 

// 💡 デフォルトで使う言語を定義するよ！
export const defaultLocale = "ja" as const

// 💡 言語コードが付かないルートのパス名を定義するよ！
export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/about": "/about", 
}

// ✨ createNavigationを使って、Linkとルーティングフックを生成するよ！
export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales, pathnames })