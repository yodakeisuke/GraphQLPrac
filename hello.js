var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// スキーマ定義
// GrapgQlはスキーマ言語(typeの定義)と
// クエリ言語(SQLのフロントエンド-バックエンド間バージョン的な)の２側面を持つ
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
// 要素: 型で定義

// リゾルバ関数。
// SQLで言えばDBMS側でよしなにやってくれる処理に該当？ここを書くのはDB向けのSQLと違うところか
// より言えば スキーマ＋クエリ＋リゾルバの３要素で成り立っているということか？
var root = { hello: () => 'Hello world!' };

// expsess起動
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));
