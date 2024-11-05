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
RESAS_API_KEY=your-api-key
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

MSW 利用時は Cookie `error` に以下の値を格納することでブラウザからの API リクエストに対して RESAS-API の仕様に準拠したエラーレスポンスを返す。

| value | status code | body                                                                                                                          |
| ----- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 400   | 200         | "400"                                                                                                                         |
| 403   | 200         | "{"statusCode":"403","message":"Forbidden.","description":""}"                                                                |
| 404-1 | 200         | "{"statusCode":"404","message":"404. That's an error.","description":"The requested URL /404 was not found on this server."}" |
| 404-2 | 200         | "404"                                                                                                                         |
| 429   | 429         | "{"message":null}"                                                                                                            |
| 500   | 500         | "Server Error"                                                                                                                |

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

### Issue

原則として、Issue を作成して実装を行う。Issue には実装する内容の詳細を記載する。Issue と PR は紐づける。

修正と影響範囲が極めて小さい場合は Issue を作成せずに PR のみ作成する。

### コンポーネント

#### margin

コンポーネントの再利用性を高めるため `components` ディレクトリのコンポーネントには `margin` を設定しない。
import してコンポーネントを使用する側で `margin` を設定する。

#### React.memo

`React.memo` は原則使用せず、レンダリング時の計算量が多いコンポーネントにのみ使用する。

#### useCallback

`useCallback` は以下の場合に使用する。

- `React.memo` でメモ化したコンポーネントの Props に関数を渡す場合（`React.memo` を使用していない場合は Props が re-render 前と同一でも re-render されるため）
- ContextProvider に関数を渡す場合

例外としてデフォルトで参照が同一になる関数に対して `useCallback` は不要（例: `setState`）

#### useMemo

`useMemo` は計算量が多い処理、または ContextProvider に渡すオブジェクトの参照を同一にするために使用する（ContextProvider の親コンポーネントの re-render 時に ContextProvider の不要な re-render を防ぐため）

## ディレクトリ構成

```txt
./src
├── components // プロダクト全体で利用するコンポーネント
├── features // 機能単位の実装
│   ├── home
│   │   ├── components
│   │   ├── hooks
│   │   ├── tests
│   │   ├── types
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

- 特定の機能内でのみ使用するコンポーネントは `features` 配下に実装する
  - 今回の課題は単一機能だが、デザインの観点でプロダクトで共通の方が良いだろうと判断できるコンポーネントについては `./src/components` ディレクトリに実装する
- コンポーネント毎にディレクトリを作成
- `index.ts` からコンポーネントを export する

### 参考

- [フロントエンドのディレクトリ設計 (Next.js Pages Router)](https://blog.yn2011.com/posts/2024-08-23-nextjs-fe-directory) (自分が書いたブログ記事)

## 技術選定

以下の観点から技術選定した。

1. 要件を実現できる
2. 継続的に運用・保守できる
3. 開発速度を上げられる（コーディングテストのため）

### Next.js

Next.js は使用経験があり、観点 1~3 を満たせるため選択した。また、ホスティング先として Vercel を選択しているのでデプロイの設定を短時間で完了できる。

コーディングテストに取り組み初めた頃に v15 がリリースされ React v19 が使用できるようになったが、他のライブラリの対応状況も加味して Next.js は v14 を使用した。

Pages Router は使用経験が長く、要件として App Router の機能を活かせる部分が少なかったので選択した。

### Recharts

以下に記載した。

<https://github.com/pokuwagata/yumemi-fe-test/issues/7#issuecomment-2439794287>

### MSW

以下の理由から選択した。

- 開発中に RESAS-API に大量のリクエストを送信してしまうリスクの回避
- API レスポンスが遅延する、異常系のレスポンスを返す場合を再現できる
- テストコードで API リクエストをモック可能

### Vitest

以下の理由から選択した。

- MSW v2 の対応状況（Jest は設定が必要だが Vitest は不要）
- 今後 browser mode を使用する選択ができる
  - jsdom より実際のブラウザで動作させた方がシンプルにテストコードを実装できる可能性が高い

## セキュリティ

セキュリティ観点から RESAS-API はバックエンドからのみリクエストする。

フロントエンドからは RESAS-API のプロキシとして動作する API (`/api/resas/path`)を経由して RESAS-API のレスポンスを取得する。これによって、API KEY がフロントエンドに露出することを防いでいる。

RESAS-API のプロキシ API はブラウザからのクロスオリジンリクエストに対して 403 レスポンスを返す。これによって、プロキシ API を意図せず利用されることを防いでいる。ただし、リクエストヘッダーに Origin が含まれない場合はクロスオリジンの判定ができないため通常通りに応答する。
