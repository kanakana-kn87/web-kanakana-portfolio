# 1. ベースイメージの指定 (安定していて軽い Node.js 20を使うよ！)
FROM node:20-slim

# 2. 開発に必要なツールをインストールするよ！
# aptのリストを更新し、make、git、pnpmをインストールするよ。
RUN apt-get update && \
    apt-get install -y make git && \
    # pnpmをnpmを使ってグローバルにインストール！
    npm install -g pnpm && \
    # 最後に無駄なキャッシュを削除するよ！
    rm -rf /var/lib/apt/lists/*

# 3. 作業ディレクトリの設定 (コンテナ内のアプリのホーム！)
WORKDIR /usr/src/app

# 4. 必要なファイルをコンテナにコピー
# package.jsonとロックファイル（pnpm-lock.yamlかpackage-lock.json）をコピーするよ。
COPY package*.json ./

# 5. 依存関係のインストール
# pnpmをインストールした同じステージで実行するから、バッチリ動くよ！
RUN pnpm install

# 6. アプリケーションのコード全体をコピー
COPY . .