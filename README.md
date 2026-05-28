# TOEIC Sprint

TOEIC 500→730を目指すための短時間スプリント学習アプリです。  
GitHub Pagesでそのまま公開できます。

## 使い方

1. このフォルダ内のファイルをGitHubリポジトリにアップロード
2. GitHubの `Settings` → `Pages`
3. `Deploy from a branch` を選択
4. Branchを `main`、folderを `/root` に設定
5. 数分後に `https://ユーザー名.github.io/リポジトリ名/` で公開

## ファイル構成

- `index.html`：アプリ本体
- `style.css`：見た目
- `app.js`：問題データと動作
- `manifest.json`：スマホアプリ風に使うための設定
- `service-worker.js`：オフライン対応
- `icon.svg`：アイコン

## 問題を増やす方法

`app.js` の `questions` 配列に問題を追加してください。
