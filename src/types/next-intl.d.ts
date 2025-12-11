// next-intl.d.ts

// 💡 これがESLintも満足する書き方！
declare type IntlMessages = Record<string, any>; 

// 2. Next.jsのPropsの調整役（このPが {} になると警告が出る可能性があるので修正）
// Pのデフォルト値を Record<string, any> に変更する！
declare type LayoutProps<P extends Record<string, any> = Record<string, any>> = {
  children: React.ReactNode;
  params: P;
};