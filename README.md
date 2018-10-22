# IP-Rate-Limit

## 需求

- 每個 IP 每分鐘僅能接受 60 個 requests

- 在首頁顯示目前的 request 量，超過限制的話則顯示 “Error”，例如在一分鐘內第 30 個 request 則顯示 30，第
61 個 request 則顯示 Error


## 使用 Node.js 啟動

### 必要環境

- Node.js ^8.0
- Redis ^4.0

### 下載專案及套件安裝

```shell
> mkdir ~/dev && cd ~/dev
> git clone git@github.com:a-ken/ip-rate-limit.git
> cd ip-rate-limit && npm i
```

### 複製 Example 環境變數

```shell
> cp .example.env .env
```

### 設定環境變數 .env

```
NODE_ENV=development

PORT=5000
PROXY=false

REDIS_HOST=<ip or hostname>
REDIS_PORT=6379
```

### 啟動

```shell
> npm run build
> npm start
```

## 使用 Docker 啟動

### 必要環境
- docker
- docker compose

### 複製 Example 環境變數

```shell
> cp .example.env .env
```

### 設定環境變數 .env

**使用以下 .env 內容，不需調整**

```
NODE_ENV=development

PORT=5000
PROXY=false

REDIS_HOST=redis
REDIS_PORT=6379
```

### 啟動

```shell
> docker-compose up
```