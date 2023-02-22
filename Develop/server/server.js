const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('apollo-server-express');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//starting an Apollo Server instance and adding the server middleware to the Express app,
// which enables the API to handle GraphQL requests
const StartApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  server.applyMiddleware({ app });
};
// serve the client-side application files, such as HTML, CSS, and JavaScript files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(
      `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
});

StartApolloServer(typeDefs, resolvers)
