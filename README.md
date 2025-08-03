# Events App

## 環境構築

### 1. 依存関係のインストール

```bash
npm ci
```

### 2. 環境変数の設定

`.env` ファイルを作成し、以下の環境変数を設定してください：

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
NEXTAUTH_SECRET="your-nextauth-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. データベースのセットアップ

```bash
# マイグレーションの実行
npx prisma migrate dev

# Prisma Clientの生成
npx prisma generate
```

## Prismaマイグレーション手順

### 開発環境でのマイグレーション

#### 1. スキーマ更新後のマイグレーション作成

```bash
npx prisma migrate dev --name マイグレーション名
```

例：

```bash
npx prisma migrate dev --name add_user_table
npx prisma migrate dev --name update_event_fields
```

#### 2. Prisma Clientの再生成

```bash
npx prisma generate
```

#### 3. マイグレーション状況の確認

```bash
npx prisma migrate status
```

### 本番環境でのマイグレーション

#### マイグレーションの適用

```bash
npx prisma migrate deploy
```

### その他の便利なコマンド

#### データベースリセット（開発環境のみ）

```bash
npx prisma migrate reset
```

#### スキーマとデータベースの強制同期

```bash
npx prisma db push
```

#### Prisma Studio（データベースGUI）の起動

```bash
npx prisma studio
```

## 開発サーバーの起動

```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## リンター・フォーマッター

```bash
# リンターの実行
npm run lint

# フォーマッターの実行
npm run fix
```

## 技術スタック

- **Framework**: Next.js 15
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **TypeScript**: 5.x
