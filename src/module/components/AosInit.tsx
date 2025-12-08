// components/AosInit.tsx
"use client";

import React, { useEffect } from "react";
// 🔽 AOSのCSSは、サイト全体で一度だけ読み込む必要があるよ！
import "aos/dist/aos.css";
// 🔽 JSライブラリの本体をインポート！
import * as AOS from "aos";

// AOSの初期化を管理するコンポーネントだよ！
export default function AosInit(): React.JSX.Element {
  // 🔽 クライアント側で一回だけ実行したい処理は useEffect を使うよ！
  useEffect(() => {
    // 🔽 AOSを初期化！これで data-aos="..." が効くようになるね！
    AOS.init({
      // どのくらいの時間でアニメーションが完了するか
      duration: 1000, 
      // 何回もアニメーションを再生するかどうか (falseで一回だけ)
      once: true, 
    });
  }, []);

  // 🔽 このコンポーネント自体は何も表示しなくてOK！
  return <></>;
}