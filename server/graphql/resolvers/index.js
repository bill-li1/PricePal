const transactionsResolvers = require('./transactions');
const usersResolvers = require('./users');
const owerInfoResolvers = require ('./owerInfos')
const groupResolvers = require ('./groups.js')

module.exports = {
  Query: {
    ...transactionsResolvers.Query,
    ...owerInfoResolvers.Query,
    ...groupResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...transactionsResolvers.Mutation,
    ...owerInfoResolvers.Mutation,
    ...groupResolvers.Mutation
  },
};
