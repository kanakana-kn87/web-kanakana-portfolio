"use client"

import { useState, useEffect } from 'react';

// APIが返すデータの型を定義するよ
// config.tomlの中身に合わせて、この型は正確に定義してね！

// データをフェッチするためのカスタムフック
export function useConfig() {
  // データの状態管理
  const [config, setConfig] = useState<any | null>(null);
  // ローディング状態
  const [isLoading, setIsLoading] = useState(true);
  // エラー状態
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        // 1. APIルートにアクセスする
        // APIルートのパスが /api/config だと仮定して、相対パスでアクセスするよ
        const response = await fetch('/api/config'); 

        if (!response.ok) {
          // HTTPステータスが200番台以外の場合、エラーを投げる
          throw new Error(`Failed to fetch config: ${response.statusText}`);
        }

        // 2. JSON形式のレスポンスを解析する
        const data = await response.json() as any;
        
        // 3. 状態を更新する
        setConfig(data);
      } catch (e) {
        // エラーをキャッチして状態を更新
        setError(e as Error);
      } finally {
        // 読み込み完了
        setIsLoading(false);
      }
    }

    fetchConfig();
  }, []); // []で、コンポーネントがマウントされたとき（最初に表示されたとき）に一度だけ実行されるよ

  // 取得したデータと状態を返す
  return { config, isLoading, error };
}