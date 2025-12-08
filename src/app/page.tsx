// app/page.tsx (Server Component)

import { redirect } from 'next/navigation';

// 💡 サイトのデフォルト言語を定義（必要に応じて 'en' などに変更してね）
const DEFAULT_LANGUAGE = 'ja'; 

/**
 * ルートURL '/' へのアクセスを、デフォルト言語のルートURL '/ja' へリダイレクトする
 * @returns {JSX.Element} リダイレクトを実行
 */
export default function RootRedirectPage() {
  
  // ユーザーの言語検出ロジックなどをここに追加しても良いが、
  // シンプルに設定されたデフォルト言語にリダイレクトするのが一般的
  
  // 🚨 重要: サーバー側でのリダイレクト
  redirect(`/${DEFAULT_LANGUAGE}`);

  // redirect() は内部でエラーを throw するため、この行は到達しない
  // TypeScriptの要件を満たすため、通常は空のコンポーネントを定義することもあるが、
  // redirectが必ず実行されるため、単なる関数としてexportしても問題ない。
}