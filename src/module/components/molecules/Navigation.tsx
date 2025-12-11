// src/module/components/organism/NavigationMenu.tsx
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
import { useLocale } from "next-intl"; // 💡 next-intl の useLocale を使う

// 画面外からヒュッて出てくる動きの設計図
const drawerVariants = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
};

// ナビゲーションメニューコンポーネント
export default function NavigationMenu(): React.JSX.Element {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const locale = useLocale(); // 💡 現在のロケール ('ja' や 'en') を取得

  const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);

  return (
    <>
      {/* 1. ドロワーを開けるボタン */}
      <Button variant="solid" onClick={openDrawer}>
        <FontAwesomeIcon icon={faBars} />
      </Button>

      {/* 2. アニメーション付きドロワー本体 */}
      <Box data-rellax-zindex="50">
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              key="side-drawer"
              variants={drawerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              // CSSスタイル (変更なし)
              style={{
                position: "fixed", top: 0, left: 0, width: "280px",
                height: "100vh", backgroundColor: "var(--color-background)",
                zIndex: 100, padding: "20px", boxShadow: "var(--shadow-4)",
                display: "flex", flexDirection: "column", gap: "10px",
              }}
            >
              {/* 閉じるボタン */}
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                <Button onClick={closeDrawer} variant="ghost" color="gray">
                  <FontAwesomeIcon icon={faXmark} size="xl" />
                </Button>
              </div>

              {/* メニューアイテム 1: Home */}
              {/* 💡 修正ポイント１: legacyBehavior/passHref を削除！*/}
              {/* 💡 修正ポイント２: hrefを /${locale}/ に修正！*/}
              <Link href={`/${locale}/`} onClick={closeDrawer} style={{ textDecoration: 'none' }}>
                {/* motion.divでホバーアニメーションを付けるよ！ */}
                <motion.div whileHover={{ x: 5 }}>
                  {/* LinkがButtonをレンダリングするために asChild は不要だよ！ */}
                  <Button size="3" variant="surface" style={{ justifyContent: "flex-start", width: "100%" }}>
                    <FontAwesomeIcon icon={faHome} style={{ width: "20px" }} />
                    {"Home"}
                  </Button>
                </motion.div>
              </Link>

              <Separator size="4" my="1" />

              {/* メニューアイテム 2: About */}
              <Link href={`/${locale}/about`} onClick={closeDrawer} style={{ textDecoration: 'none' }}>
                <motion.div whileHover={{ x: 5 }}>
                  <Button size="3" variant="surface" style={{ justifyContent: "flex-start", width: "100%" }}>
                    <FontAwesomeIcon icon={faAddressCard} />
                    {"About"}
                  </Button>
                </motion.div>
              </Link>

            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* 3. オーバーレイ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
            style={{
              position: "fixed", top: 0, left: 0, width: "100vw",
              height: "100vh", backgroundColor: "black", zIndex: 99,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}