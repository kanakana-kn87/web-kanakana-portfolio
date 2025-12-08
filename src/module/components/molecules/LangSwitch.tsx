// components/molecules/LangSwitch.tsx
"use client";

import { useTranslation } from 'react-i18next';
import { Button, Flex } from '@radix-ui/themes';
import { useParams, useRouter, usePathname } from 'next/navigation';

export default function LangSwitch() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const currentLang = params.lang as string || 'ja';

  const changeLanguage = (newLang: string) => {
    
    // 1. 現在のURLパスから言語コード（例: /ja）を取り除く
    const pathWithoutLang = pathname.replace(`/${currentLang}`, '');

    // 2. 💡 修正ポイント: パスが空('')の場合はルートパス('/')に置き換える
    const baseUri = pathWithoutLang === '' ? '/' : pathWithoutLang;

    // 3. 新しい言語コードとベースURIを結合して新しいURLを生成
    // 例: /en + /about => /en/about
    // 例: /ja + / => /ja
    const newPath = `/${newLang}${baseUri}`;

    // 4. Next.jsのルーターで新しいURLに遷移
    router.push(newPath);
  };

  return (
    <Flex gap="2">
      <Button 
        onClick={() => changeLanguage('en')}
        variant={currentLang === 'en' ? 'solid' : 'soft'}
      >
        EN
      </Button>
      <Button 
        onClick={() => changeLanguage('ja')}
        variant={currentLang === 'ja' ? 'solid' : 'soft'}
      >
        日本語
      </Button>
    </Flex>
  );
}