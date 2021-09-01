const { gql } = require('apollo-server');

module.exports = gql`
  type OwerInfo {
    User: User
    Amount: String,
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
    owers: [ OwerInfo ]
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

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    getTransactions: [Transaction]
    # getTransactionsByUserId(userID: ID!): [Transaction]
    getTransactionById(transactionId: ID!): Transaction
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    # TODO createTransaction Params
    createTransaction(body: String!): Transaction!
    deleteTransaction(transactionId: ID!): String!
  }
`;
