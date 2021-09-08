const { gql } = require('apollo-server');

module.exports = gql`

  type OwerInfo {
    id: ID!
    user: User!
    amount: String!
    notes: String
  }

  type Transaction {
    id: ID!
    title: String!
    type: String!
    date: String!
    description: String
    img: String
    payer: User
    owers: [OwerInfo]
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
    owers: [ID]!
  }

  input OwerInfoInput {
    user: ID!
    amount:  String!
    notes: String
  }

  type Query {
    getTransactions: [Transaction]
    # getTransactionsByUserId(userID: ID!): [Transaction]
    getTransactionById(transactionId: ID!): Transaction
    getOwerInfos: [OwerInfo]
    getOwerInfoById(owerInfoId: ID!) : OwerInfo
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createTransaction(transactionInput: TransactionInput!): Transaction!
    deleteTransaction(transactionId: ID!): String!
    createOwerInfo(owerInfoInput: OwerInfoInput!): OwerInfo!
    deleteOwerInfo(owerInfoId: ID!): String!
  }
`;
