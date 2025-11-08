# Sortarium

Next.js と Tailwind CSS を使用したモダンなウェブアプリケーションです。

## 機能

- Next.js 15.5.6 による最新のウェブアプリケーション開発
- Tailwind CSS によるスタイリング
- ESLint と Prettier による一貫したコードフォーマット
- TypeScript による型安全な開発

## 必要条件

- Node.js（v22）
- pnpm パッケージマネージャー

## インストール

```bash
# リポジトリのクローン
git clone https://github.com/yoshifoxor/sortarium.git
cd sortarium

# 依存関係のインストール
pnpm install
```

## 開発

```bash
# 開発サーバーの起動
pnpm dev
```

開発サーバーは http://localhost:3000 で起動します。

## スクリプト

- `pnpm dev` - 開発サーバーの起動
- `pnpm build` - プロダクションビルドの作成
- `pnpm start` - プロダクションサーバーの起動
- `pnpm lint` - ESLint による静的コード解析の実行
- `pnpm format` - Prettier によるコードフォーマットのチェック
- `pnpm format:fix` - Prettier によるコードフォーマットの自動修正

## ライセンス

このプロジェクトは LICENSE ファイルに記載されているライセンスの下で公開されています。
