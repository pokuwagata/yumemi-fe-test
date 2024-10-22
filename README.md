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
