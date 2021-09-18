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
    owersId: [ID]
    owers: [OwerInfo]
  }

  type User {
    id: ID!
    email: String!
    token: String!
    profileImg: String!
    firstName: String!
    lastName: String!
    groups: [ Group]!
  }

  type Group {
    id: ID!
    title: String!
    description: String
    bannerImg: String!
    code: String!
    locked: Boolean!
    active: Boolean!
    users: [User]!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    profileImg: String!
    password: String!
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input EditUserInput {
    userId: ID!
    firstName: String!
    lastName: String!
    password: String!
    profileImg: String!
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
    amount: String!
    notes: String
  }

  input GroupInput {
    title: String!
    description: String
    bannerImg: String!
    code: String!
    locked: Boolean!
    active: Boolean!
    users: [ID]!
  }

  type Query {
    getTransactions: [Transaction]
    getTransactionsByUserId(userId: ID!): [Transaction]
    getTransactionById(transactionId: ID!): Transaction

    getOwerInfos: [OwerInfo]
    getOwerInfoById(owerInfoId: ID!) : OwerInfo

    getGroupById(groupId: ID!): Group
  }
    
  type Mutation {
    register(registerInput: RegisterInput): User! #completed, tested
    login(loginInput: LoginInput): User! #completed, tested
    editUser(editUserInput: EditUserInput): User! #completed, tested
    addGroupUser(groupId: ID, userId: ID): User! #completed

    createTransaction(transactionInput: TransactionInput!): Transaction! #completed?
    deleteTransaction(transactionId: ID!): String! #completed?

    createOwerInfo(owerInfoInput: OwerInfoInput!): OwerInfo! #completed?
    deleteOwerInfo(owerInfoId: ID!): String! #completed?

    createGroup(groupInput: GroupInput!): Group! #completed, tested
    editGroup(groupId: ID!, groupInput: GroupInput!): Group! #completed, tested
    setGroupActive(groupId: ID!, active: Boolean!): Group! #completed
  }
`;
