const { gql } = require('apollo-server');

module.exports = gql`
  type OwerInfo {
    id: ID!
    user: User!
    amount: Float!
    notes: String
  }

  type Transaction {
    id: ID!
    title: String!
    type: String!
    date: String!
    description: String
    img: String
    group: Group!
    payer: User
    owerIds: [ID]!
    owerInfos: [OwerInfo]!
  }

  type User {
    id: ID!
    email: String!
    # token: String!
    profileImg: String!
    firstName: String!
    lastName: String!
    groups: [Group]!
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
    group: ID!
    owerIds: [ID]! # users
    owerInfos: [ID]! # owerInfos
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
    locked: Boolean!
    active: Boolean!
    users: [ID]
  }

  type Query {
    getTransactionsByUserId(userId: ID!): [Transaction] # completed, tested
    getTransactionsByGroupId(groupId: ID!): [Transaction] # completed, tested
    getTransactionById(transactionId: ID!): Transaction # completed, tested

    getOwerInfos: [OwerInfo] 
    getOwerInfoById(owerInfoId: ID!) : OwerInfo

    getUserById(userId: ID!): User!

    getGroupById(groupId: ID!): Group
  }
    
  type Mutation {
    register(registerInput: RegisterInput): User! #completed, tested
    login(loginInput: LoginInput): User! #completed, tested
    editUser(editUserInput: EditUserInput): User! #completed, tested
    addGroupUser(groupId: ID, userId: ID): User! #completed, tested
    addGroupUserByCode(code: String, userId: ID): User! #completed, tested

    createTransaction(transactionInput: TransactionInput!): Transaction! #completed, tested
    editTransaction(transactionId: ID!, transactionInput: TransactionInput!): Transaction! #completed, tested
    deleteTransaction(transactionId: ID!): String! #completed?

    createOwerInfo(owerInfoInput: OwerInfoInput!): OwerInfo! #completed, tested
    editOwerInfo(owerInfoId: ID!, owerInfoInput: OwerInfoInput!): OwerInfo! #completed, tested
    deleteOwerInfo(owerInfoId: ID!): String! #completed, tested

    createGroup(groupInput: GroupInput!): Group! #completed, tested
    editGroup(groupId: ID!, groupInput: GroupInput!): Group! #completed, tested
    setGroupActive(groupId: ID!, active: Boolean!): Group! #completed, tested
  }
`
