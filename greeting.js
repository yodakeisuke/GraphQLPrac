var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// スキーマ定義
// クエリに引数: 型 を指定可能
var schema = buildSchema(`
  type Query {
    hello(isMorning: Boolean!): String
  }
`);
// 要素: 型で定義

// リゾルバ関数。
var root = { hello: ({isMorning}) =>
  isMorning ? 'Good Morning' : 'Hello'
};

// expsess起動
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));
