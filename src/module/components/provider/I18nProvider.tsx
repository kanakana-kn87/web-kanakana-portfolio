// src/module/components/provider/I18nProvider.tsx

'use client';

import { NextIntlClientProvider } from 'next-intl';
import { AbstractIntlMessages } from 'next-intl';
// サーバーから渡されたメッセージを受け取る
export default function I18nProvider({
  messages,
  locale,
  children,
}: {
  messages: AbstractIntlMessages; // 型は必要に応じて修正
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}