# yumemi-fe-test

## 初回セットアップ手順

### hosts 設定

```shell
sudo vi /etc/hosts
```

以下の行を追加

```hosts
127.0.0.1 local.yumemi-fe-test.com
```

### SSL証明書

mkcertをインストール

```shell
brew install mkcert
```

ルートCA証明書をインストール

```shell
mkcert --install
```

SSL証明書を作成

```shell
mkcert \
  -key-file=./cert/key.pem \
  -cert-file=./cert/cert.pem \
  "local.yumemi-fe-test.com"
```

### pnpm

pnpm をインストールする。

[インストール手順](https://pnpm.io/installation)

npm パッケージをインストールする。

```shell
pnpm i
```

### 環境変数定義

RESAS-API の API KEY を取得し、以下の内容で`.env` ファイルを作成する。

```
NEXT_PUBLIC_API_KEY=your-api-key
```

## 起動手順

```shell
pnpm dev
```

以下の URL にアクセスする。

<https://local.yumemi-fe-test.com:3000/>

MSW を利用して API リクエストをモックする場合は以下のコマンドで起動する。

```shell
pnpm dev:mock
```

## デプロイ

`main` ブランチへのマージをトリガーに GitHub Actions から Vercel へデプロイする。

## 開発ルール

### ブランチ名

以下のフォーマットで命名する。

`[tag]/[name]`

| tag      | 説明                       |
| -------- | -------------------------- |
| feat     | 機能開発                   |
| fix      | 細かな修正                 |
| refactor | リファクタリング           |
| test     | テストコードに関する変更   |
| docs     | ドキュメントに関する変更   |
| env      | 開発環境の設定に関する変更 |

name はケバブケースでブランチで行う作業を表現する。

#### 例

`feat/add-a-feature`

`docs/fix-readme`

### コミットメッセージ

以下のフォーマットで記載する。

`[tag]: [message]`

tag は上記記載の表からコミット内容に合わせて選択する。

message はコミット内容を表現する文言を日本語で記載する。

#### 例

`feat: A コンポーネントの作成`

`env: Lint の設定を変更`

## ディレクトリ構成

```txt
./src
├── features // 機能単位の実装
│   ├── home
│   │   ├── components
│   │   ├── hooks
│   │   ├── tests
│   │   └── contexts
│   └── others
│       └── components
├── pages
│   ├── 404.tsx
│   ├── _app.tsx
│   └── index.tsx
├── lib // プロダクト全体で利用する共通処理
├── mocks // MSW に関する実装
└── types // 型定義
```

### features ディレクトリについて

- Next.js の Pages 単位で features 配下にディレクトリを作成
- 各 features ディレクトリ内にはそのページでしか使用しない Component, Hooks, Context を配置

### components ディレクトリについて

```txt
./src/features/home/components
├── Home
│   ├── Home.module.scss
│   ├── Home.tsx
│   └── index.ts
```

- コンポーネント毎にディレクトリを作成
- `index.ts` からコンポーネントを export する

### 参考

- [フロントエンドのディレクトリ設計 (Next.js Pages Router)](https://blog.yn2011.com/posts/2024-08-23-nextjs-fe-directory) (自分が書いたブログ記事)

## コンポーネント

### margin

コンポーネントの再利用性を高めるため `components` ディレクトリのコンポーネントには `margin` を設定しない。
import してコンポーネントを使用する側で `margin` を設定する。

### React.memo

`React.memo` は原則使用せず、レンダリング時の計算量が多いコンポーネントにのみ使用する。

### useCallback

`useCallback` は以下の場合に使用する。

- `React.memo` でメモ化したコンポーネントの Props に関数を渡す場合（`React.memo` を使用していない場合は Props が re-render 前と同一でも re-render されるため）
- ContextProvider に関数を渡す場合

例外としてデフォルトで参照が同一になる関数に対して `useCallback` は不要（例: `setState`）

### useMemo

`useMemo` は計算量が多い処理、または ContextProvider に渡すオブジェクトの参照を同一にするために使用する（ContextProvider の親コンポーネントの re-render 時に ContextProvider の不要な re-render を防ぐため）

## 技術選定

TODO
