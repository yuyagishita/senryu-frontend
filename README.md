# senryu-frontend
## Dockerの使い方
アプリのビルド方法はプロジェクのルートディレクトリで以下実行
```
docker build -t yu-yagishita/nextjs .
```

以下コマンドで起動。
```
docker run -p 3000:3000 yu-yagishita/nextjs:latest
```
