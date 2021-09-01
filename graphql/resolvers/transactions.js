const Transaction = require('../../models/Transaction');

module.exports = {
  Query: {
    async getTransactions() {
      try {
        return await Transaction.find();
      } catch (err) {
        throw new Error(err);
      }
    },
  }
};