const { AuthenticationError } = require('apollo-server');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getTransactions() {
      try {
        return await Transaction.find();
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTransactionById(_, { transactionId }) {
      try {
        const transaction = await Transaction.findById(transactionId);
        if (transaction) {
          return transaction;
        } else {
          throw new Error('Transaction not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createTransaction(_, { transactionInput }, context) {
      const user = checkAuth(context);
      const payerUser = await User.findById(transactionInput.payer);

      //TODO change owers to array of users instead of singular user.
      //update in typeDefs as well.
      const owerUsers = await OwerInfo.find({
        _id: {
          $in: transactionInput.owers,
        },
      });

      console.log('transactionInput', transactionInput.owers);
      console.log('owerUsers', owerUsers[0]);
      console.log('payerUser', payerUser);

      const newTransaction = new Transaction({
        title: transactionInput.title,
        type: transactionInput.type,
        date: transactionInput.date,
        description: transactionInput.description,
        img: transactionInput.img,
        payer: payerUser,
        owers: owerUsers,
      });

      const transaction = await newTransaction.save();
      return transaction;
    },

    async deleteTransaction(_, { transactionId }, context) {
      const user = checkAuth(context);

      try {
        const transaction = await Transaction.findById(transactionId);
        if (user.id === transaction.payer.id) {
          await transaction.delete();
          return 'Transaction deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
