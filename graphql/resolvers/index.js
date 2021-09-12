const transactionsResolvers = require('./transactions');
const usersResolvers = require('./users');
const owerInfoResolvers = require ('./owerInfos')

module.exports = {
  Query: {
    ...transactionsResolvers.Query,
    ...owerInfoResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...transactionsResolvers.Mutation,
    ...owerInfoResolvers.Mutation,
  },
};
