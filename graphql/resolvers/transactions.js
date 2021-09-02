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
    // async getTransactionsByGroupId(_, { groupId }) {
    //   try {
    //     const transactions = await Transaction.find({ group: groupId });
    //     console.log('group transactions with id ' + groupId + ': ', transactions);
    //     if (transactions) {
    //       return transactions;
    //     } else {
    //       throw new Error('Transactions not found');
    //     }
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
    // async getTransactionsByUserId(_, { userId }) {
    //   try {
    //     const transactions = await Transaction.find({ dim_cm: { payer: userID, ower: userID } });
    //     console.log('transactions with the id' + userId + ': ', transactions);
    //     if (transactions) {
    //       return transactions;
    //     } else {
    //       throw new Error('Transactions not found');
    //     }
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
  },
  Mutation: {
    async createTransaction(_, { transactionInput }, context) {
      const user = checkAuth(context);

      const p = await User.findById(transactionInput.payer);

      const newTransaction = new Transaction({
        title: transactionInput.title,
        type: transactionInput.type,
        date: transactionInput.date,
        description: transactionInput.description,
        img: transactionInput.img,
        payer: p,
        owers: p,
      });

      console.log(p);
      console.log(newTransaction.payer);

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
