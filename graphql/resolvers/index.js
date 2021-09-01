const transactionsResolvers = require('./transactions');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...transactionsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
};