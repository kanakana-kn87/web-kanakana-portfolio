// NavigationMenu.tsx (TypeScriptの世界へレッツゴー！)
"use client";

import React, { useState } from "react";
// Radix Themesの部品
import { Button, Separator, Box } from "@radix-ui/themes";
// アイコン
import { faBars, faHome, faAddressCard, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Next.jsのLinkとFramer Motion
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";

// 画面外からヒュッて出てくる動きの設計図（創律光案）だよ！
// cameCaseを使ってるよ！
const drawerVariants = {
  // initial: 画面外の左側にいる状態 (幅の-100%の位置)
  initial: { x: "-100%" },
  // animate: 画面内にスライドして出てきた状態
  animate: { x: 0 },
  // exit: 閉じる時にまた画面外に戻る状態
  exit: { x: "-100%" },
};

// ナビゲーションメニューコンポーネント
export default function NavigationMenu(): React.JSX.Element {
  // ドロワーが開いているかどうかの状態を管理 (cameCaseだよ！)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const locale = useLocale();

  // ドロワーを開閉する関数 (cameCaseだよ！)
  const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);
  // 短くまとめよう！
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);


  return (
    // <></>はコードを短く書くためのReactの裏技だよ！
    <>
      {/* 1. ドロワーを開けるボタン */}
      <Button variant="solid" onClick={openDrawer}> 
        <FontAwesomeIcon icon={faBars} />
      </Button>

      {/* 2. AnimatePresenceでドロワーの出し入れを監視するよ！ */}
      <Box data-rellax-zindex="50">
      <AnimatePresence>
        {isDrawerOpen && (
          // ドロワー本体 (motion.divでアニメーションを適用！)
          <motion.div
            key="side-drawer" // AnimatePresenceを使うときはkeyが必要だよ！
            variants={drawerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            // Radix Themesのスタイルを邪魔しないように、CSSで固定配置するよ！
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "280px", 
              height: "100vh",
              backgroundColor: "var(--color-background)", // Themesの背景色を使うよ
              zIndex: 100,
              padding: "20px",
              boxShadow: "var(--shadow-4)",
              // コードを短く書こう！
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {/* 閉じるボタン */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
              <Button onClick={closeDrawer} variant="ghost" color="gray">
                <FontAwesomeIcon icon={faXmark} size="xl" />
              </Button>
            </div>

            {/* メニューアイテム */}
            <Link href={`${locale}/`} passHref legacyBehavior>
              {/* asChildでButtonとLinkを連携！onClickでドロワーを閉じるよ！ */}
              <Button onClick={closeDrawer} asChild size="3" variant="surface" style={{ justifyContent: "flex-start" }}>
                {/* motion.aでホバーアニメーションを付けるよ！ */}
                <motion.a whileHover={{ x: 5 }}>
                  <FontAwesomeIcon icon={faHome} style={{ width: "20px" }}/>
                  {"Home"}
                </motion.a>
              </Button>
            </Link>
            
            <Separator size="4" my="1" />

            <Link href={`${locale}/about/`} passHref legacyBehavior>
              <Button onClick={closeDrawer} asChild size="3" variant="surface" style={{ justifyContent: "flex-start" }}>
                 <motion.a whileHover={{ x: 5 }}>
                  <FontAwesomeIcon icon={faAddressCard} />
                  {"About"}
                </motion.a>
              </Button>
            </Link>

            {/* 必要ならもっとメニューを追加！ */}
          </motion.div>
        )}
      </AnimatePresence>
      </Box>
      
      {/* 3. オーバーレイ（背景を暗くする部分） */}
      <AnimatePresence>
        {isDrawerOpen && (
            <motion.div
                key="drawer-overlay" // AnimatePresenceを使うときはkeyが必要だよ！
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeDrawer} // オーバーレイをクリックしたら閉じるよ
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "black",
                    zIndex: 99, // ドロワー（100）より下に置くよ
                }}
            />
        )}
      </AnimatePresence>
    </>
  );
}