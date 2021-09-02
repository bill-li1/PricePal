const { gql } = require('apollo-server');

module.exports = gql`
  type OwerInfo {
    id: ID!
    User: ID!
    Amount: String
    Notes: String
  }

  type Transaction {
    id: ID!
    title: String!
    type: String!
    date: String!
    description: String
    img: String
    payer: User
    owers: User
  }

  type User {
    id: ID!
    email: String!
    token: String!
    firstName: String!
    lastName: String!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input TransactionInput {
    title: String!
    type: String!
    date: String!
    description: String
    img: String
    payer: ID!
    owers: ID!
  }

  type Query {
    getTransactions: [Transaction]
    # getTransactionsByUserId(userID: ID!): [Transaction]
    getTransactionById(transactionId: ID!): Transaction
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createTransaction(transactionInput: TransactionInput!): Transaction!
    deleteTransaction(transactionId: ID!): String!
  }
`;
