# 1. ベースイメージの指定 (安定していて軽い Node.js 20を使うよ！)
FROM node:20-slim

# 2. 開発に必要なツールをインストールするよ！
# aptのリストを更新し、makeを入れ、pnpmをグローバルに入れるよ。
# イメージサイズを小さくするため、リストのキャッシュは最後に削除するね！
RUN apt-get update && \
    apt-get install -y make git && \
    npm install -g pnpm && \
    rm -rf /var/lib/apt/lists/*

# 3. 作業ディレクトリの設定 (コンテナ内のアプリのホーム！)
WORKDIR /usr/src/app


# 4. 必要なファイルをコンテナにコピー
# package.jsonとロックファイル（pnpm-lock.yamlかpackage-lock.json）をコピーするよ。
# package*.json は、pnpm-lock.yaml も package.json も含むから便利だね！
COPY package*.json ./

# 5. 依存関係のインストール
# ここで pnpm install を実行して、ライブラリをダウンロードするよ！
RUN pnpm install

# 6. アプリケーションのコード全体をコピー
COPY . .

# 7. アプリケーションが待ち受けるポートの宣言
EXPOSE 3000

# 8. コンテナ起動時に実行するコマンド (Next.jsの開発サーバー起動を想定！)
CMD [ "pnpm", "dev" ]