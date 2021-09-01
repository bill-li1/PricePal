const { gql } = require('apollo-server');

module.exports = gql`
  type Transaction {
    id: ID!
    title: String!
    type: String!
    date: String!
    description: String
    img: String
    payer: User
    owers: [{
      User: User
      Amount: String
      Notes: String
    }]
  }

  type User {
    id: ID!
    email: String!
    token: String!
    firstName: String!
    lastName: String!
    createdAt: String!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getTransactions: [Transaction]
    # getTransactionsByUserId(userID: ID!): [Transaction]
    getTransactionById(transactionId: ID!): Transaction
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(firstName: String!, lastName: String!, password: String!): User!
    # createTransaction(): Transaction!
    deleteTransaction(transactionId: ID!): String!
  }
`;
