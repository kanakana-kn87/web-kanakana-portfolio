"use client"

import R3FLogo from "../molecules/Logo";
import NavigationMenu from "../molecules/Navigation";
import { Heading, Box, Flex } from "@radix-ui/themes";
import { useConfig } from "@/module/lib/hooks/useConfig";
import styles from "@/resource/style/module/header.module.scss";
import LangSwitch from "../molecules/LangSwitch";

export default function Header() {
  const { config, isLoading, error } = useConfig();
  if (isLoading || !config) {
    return <></>;
  }
  if (error) {
    // エラーが発生した場合
    return (
      <header className={styles.header}>
        <div style={{ padding: '20px', color: 'red' }}>設定エラーが発生しました。</div>
      </header>
    );
  }
  return (
    <header data-aos="fade-down" className={styles.header}>
      <aside>
        <Flex justify="between">
          <Box className={styles.header__logo}>
            <Flex justify="center" align="center" gap="3">
              <R3FLogo />
              <Heading as="h1" size="6">
                {config.app.title as string}
              </Heading>

            </Flex>

          </Box>
          <Box>
            <LangSwitch />
            <NavigationMenu />
          </Box>
        </Flex>
      </aside>
    </header>
  );
}