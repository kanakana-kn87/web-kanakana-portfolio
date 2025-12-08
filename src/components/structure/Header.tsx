"use client"

import R3FLogo from "../logo";
import NavigationMenu from "../Navigation";
import { Heading, Box, Flex } from "@radix-ui/themes";
import dynamic from 'next/dynamic';
import styles from "./header.module.scss";
export default function Header() {
  return (
    <header data-aos="fade-down" className={styles.header}>
      <aside>
        <Flex justify="between">
          <Box className={styles.header__logo}>
            <Flex justify="center" align="center" gap="3">
              <R3FLogo />
              <Heading as="h1" size="6">
                {"かなかなのポートフォリオ"}
              </Heading>

            </Flex>
          </Box>
          <Box>
          <NavigationMenu />
          </Box>
        </Flex>
      </aside>
    </header>
  );
}