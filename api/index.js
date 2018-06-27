const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

// The GraphQL schema in string form
const typeDefs = `
  type Query { hello: Message }
  type Message { message: String }
`;

// The resolvers
const resolvers = {
    Query: { hello: () => ({message: 'Hello from the EOD Machine' }) },
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const PORT = 4000;

const app = express();
//
// // CORS
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// bodyParser is needed just for POST.
app.use('/api/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));
app.get('/api/graphiql', graphiqlExpress({ endpointURL: '/api/graphql' })); // if you want GraphiQL enabled

app.listen(PORT);