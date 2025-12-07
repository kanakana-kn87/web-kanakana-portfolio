"use client";

import React from "react";
// 🔽 ThemesのDropdownMenuをインポートするよ！Primitivesはもういらない！
import { Button, DropdownMenu, Separator } from "@radix-ui/themes";
import Link from "next/link";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavigationMenu(): React.JSX.Element {
  return (
    // 1. 機能の土台
    <DropdownMenu.Root>

      {/* 2. トリガー（ボタン）: 爆発エフェクトボタンをトリガーにする！ */}
      {/* 🔽 asChild は使わず、ExplodeButton が Trigger の役割を果たすよ！ */}
      <DropdownMenu.Trigger>
        <Button>
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </DropdownMenu.Trigger>

      {/* 3. メニューの中身: ThemesのContentは自動で見た目が付くからCSSはいらない！ */}
      <DropdownMenu.Content sideOffset={5}>

        {/* メニューアイテム: asChildでNextLinkをItemに渡すよ！ */}
        <DropdownMenu.Item asChild>
          <Link href="/">Home</Link>
        </DropdownMenu.Item>
        <DropdownMenu.Separator>

          <Separator size="4" my="1" />

        </DropdownMenu.Separator>

        <DropdownMenu.Item asChild>
          <Link href="about/">About</Link>
        </DropdownMenu.Item>

      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}