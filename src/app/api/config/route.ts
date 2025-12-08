import { NextResponse } from "next/server";
import * as toml from "toml";
import * as fs from "fs";
import * as path from "path";


// GETリクエストを処理する関数
export function GET() {
  const configPath: string = path.join(process.cwd(), "src", "resource", "data", "config", "config.toml");

  // 3. データをJSON形式で返す
  // NextResponse.json() を使うと、自動でContent-Type: application/json ヘッダーをつけてくれるよ！
  return NextResponse.json(toml.parse(fs.readFileSync(configPath, "utf-8")));
}