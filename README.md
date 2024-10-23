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

## 技術選定

TODO
