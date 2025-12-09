// src/module/components/molecules/LangSwitch.tsx (最終確定コード)
"use client"

import { useLocale } from "next-intl"
// ✨ 修正！usePathname もインポートに追加するよ！
import { Link, usePathname } from "@/i18n/navigation"
import { Button } from "@radix-ui/themes"


export default function LangSwitch(): React.JSX.Element {
  const currentLocale = useLocale()

  // 💡 navigation.tsで生成された usePathname を使って、現在のパスを取得するよ！
  const pathname = usePathname() // 例: /about

  const targetLocale = currentLocale === "ja" ? "en" : "ja"

  return (
    <div style={{ display: "flex", gap: "8px" }}>

      {/* 1. 現在の言語ボタン（ハイライト） */}
      <Button
        variant="solid"
        size="2"
        color="iris"
      >
        {currentLocale.toUpperCase()}
      </Button>

      {/* 2. 切り替え先の言語ボタン */}
      <Button
        variant="surface"
        size="2"
        asChild
      >
        <Link
          // 💡 usePathnameで取得した現在のパスを渡すよ！
          href={pathname}
          locale={targetLocale}
        >
          {targetLocale.toUpperCase()}
        </Link>
      </Button>
    </div>
  )
}