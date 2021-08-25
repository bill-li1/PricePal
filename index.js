const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const Transaction = require("./models/Transaction");
const { MONGODB } = require("./config.js");

const typeDefs = gql`
  type Transaction {
    id: ID!
    title: String!
    type: String!
    date: String!
    description: String
    img: String
  }
  type Query {
    getTransactions: [Transaction]
  }
`;

const resolvers = {
  Query: {
    async getTransactions() {
      try {
        return await Transaction.find();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected!");
    return server.listen({ port: 3000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
