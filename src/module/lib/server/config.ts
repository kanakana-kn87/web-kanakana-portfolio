// import { NextResponse } from "next/server"; // APIルート用
import * as toml from "toml";
import * as fs from "fs";
import * as path from "path";

// この関数はServer ComponentやAPI Routeでのみ呼び出せる
export default function getServerConfig() {
  const configPath = path.join(process.cwd(), "src", "resource", "data", "config", "config.toml");
  
  // ファイルを同期的に読み込み、パースして返す
  const configData = toml.parse(fs.readFileSync(configPath, "utf-8"));

  return configData; // JSONオブジェクトが返る
}