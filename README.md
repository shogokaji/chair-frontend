
# Chair
疾患を持つ患者様向けの日記投稿SNSサービスです。  
日記の投稿、コメントや、ユーザーの検索、フォロー、DM機能により、  
似た境遇の患者様同士が交流を図り、支え合える繋がりを作ることを目指します。
  
<img width="60%" height="60%" src="https://user-images.githubusercontent.com/98445266/211117974-8bfad69b-3611-4b96-a41c-95227cb3904b.png">
  
#### URL: https://web.chair-app.com  
DM機能、コメント機能に制限はありますが、ゲストログインでお試しいただけます。

### 使用技術
* バックエンド: Rails ( API mode ) + Nginx ( upstream puma-socket )   
* フロントエンド: React ( create-react-app / MUI / react-hook-form / axios )
* インフラ: AWS(ECS / ECR / Route53 / S3 / CloudFront / CloudWatch / ELB / RDS) CI/CD環境構築(Github Actions)

### インフラ構成図  
<img width="60%" height="60%" src="https://user-images.githubusercontent.com/98445266/211979262-faa48ed2-ce83-49db-8382-8977f5f01995.png">
  
### 実装機能一覧
* 日記投稿、画像投稿機能  
  * コメント機能  
  * いいね機能    
* メッセージ機能
  * 既読判定機能  
* 検索機能  
  * 絞り込み/キーワード検索/ランキング検索  
* 通知機能  
* お問い合わせ機能  
* ゲストログイン機能
* 管理者画面  
* Route53 による独自ドメイン + SSL化
* レスポンシブ対応
* 本番環境のコンテナ化
* CI/CD環境の構築
