const { AuthenticationError } = require('apollo-server');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const OwerInfo = require('../../models/OwerInfo');
const checkAuth = require('../../util/check-auth');
const { userHelper, owerInfosHelper } = require('../middleware');

module.exports = {
  Query: {
    async getTransactions() {
      try {
        const transactions = await Transaction.find();
        return transactions.map((transaction) => ({
          ...transaction._doc,
          payer: userHelper.bind(this, transaction._doc.payer),
          owers: owerInfosHelper.bind(this, transaction._doc_owers),
        }));
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTransactionById(_, { transactionId }) {
      try {
        const transaction = await Transaction.findById(transactionId);
        if (transaction) {
          return {
            ...transaction._doc,
            payer: userHelper.bind(this, transaction._doc.payer),
            owers: owerInfosHelper.bind(this, transaction._doc_owers),
          };
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
    async getTransactionsByUserId(_, { userId }) {
      try {
        const transactions = await Transaction.find({ dim_cm: { payer: userId, owersId: userId } });
        console.log('transactions with the id' + userId + ': ', transactions);
        if (transactions) {
          return transactions.map((transaction) => ({
            ...transaction._doc,
            payer: userHelper.bind(this, transaction._doc.payer),
            owers: owerInfosHelper.bind(this, transaction._doc_owers),
          }));
        } else {
          throw new Error('Transactions not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createTransaction(_, { transactionInput }, context) {
      const user = checkAuth(context);

      //TODO change owers to array of users instead of singular user.
      //update in typeDefs as well.
      // const owerUsers = await OwerInfo.find({
      //   _id: {
      //     $in: transactionInput.owers,
      //   },
      // });

      console.log('transactionInput', transactionInput.owers);
      // console.log('owerUsers', owerUsers);

      const newTransaction = new Transaction({
        title: transactionInput.title,
        type: transactionInput.type,
        date: transactionInput.date,
        description: transactionInput.description,
        img: transactionInput.img,
        payer: transactionInput.payer,
        owersId: transactionInput.owers,
        owers: transactionInput.owers,
      });

      const transaction = await newTransaction.save();


      return {
        ...transaction._doc,
        id: transaction._doc._id,
        payer: userHelper.bind(this, transaction._doc.payer),
        owers: owerInfosHelper.bind(this, transaction._doc.owers),
      };
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
