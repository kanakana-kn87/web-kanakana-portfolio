"use client";

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@radix-ui/themes";

export default function LangSwitch() {
  const t = useTranslations('Index');
  const currentLocale = useLocale(); // 💡 next-intlの現在の言語取得フック
  const pathname = usePathname(); // 💡 現在のパス（言語コードは除く）

  // 現在のパスから言語コード部分を削除する処理
  const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';

  const targetLocale = currentLocale === 'ja' ? 'en' : 'ja';

  return (
    <Button>
      <Link href={`/${targetLocale}${pathWithoutLocale}`}>
        {targetLocale.toUpperCase()}
      </Link>
    </Button>
  );
}