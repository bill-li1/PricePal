const transactionsResolvers = require('./transactions');
const usersResolvers = require('./users');
const owerInfoResolvers = require ('./owerInfos')
const groupResolvers = require ('./groups')

module.exports = {
  Query: {
    ...transactionsResolvers.Query,
    ...owerInfoResolvers.Query,
    ...groupResolvers.Query,
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...transactionsResolvers.Mutation,
    ...owerInfoResolvers.Mutation,
    ...groupResolvers.Mutation
  },
};
