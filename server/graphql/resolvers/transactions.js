const { AuthenticationError } = require('apollo-server');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const OwerInfo = require('../../models/OwerInfo');
const checkAuth = require('../../util/check-auth');
const { userHelper, owerInfosHelper, groupHelper } = require('../binder');

module.exports = {
  Query: {
    async getTransactionById(_, { transactionId }) {
      try {
        const transaction = await Transaction.findById(transactionId);
        if (transaction) {
          return {
            ...transaction._doc,
            id: transaction._id,
            group: groupHelper.bind(this, transaction._doc.group),
            payer: userHelper.bind(this, transaction._doc.payer),
            owerInfos: owerInfosHelper.bind(this, transaction._doc.owerInfos),
          };
        } else {
          throw new Error('Transaction not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTransactionsByUserId(_, { userId }) {
      try {
        const transactions = await Transaction.find({ $or: [{ payer: userId }, { owerIds: userId }] });
        // const transactions = await Transaction.find({ payer: userId });
        if (transactions) {
          console.log('transactions', transactions)
          return transactions.map((transaction) => ({
            ...transaction._doc,
            id: transaction._id,
            group: groupHelper.bind(this, transaction._doc.group),
            payer: userHelper.bind(this, transaction._doc.payer),
            owerInfos: owerInfosHelper.bind(this, transaction._doc.owerInfos),
          }));
        } else {
          throw new Error('Transactions not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTransactionsByGroupId(_, { groupId }) {
      try {
        console.log('groupId', groupId);
        const transactions = await Transaction.find({ group: groupId });
        console.log('transactions', transactions);
        if (transactions) {
          console.log('doc',transactions[0]._doc)
          return transactions.map((transaction) => ({
            ...transaction._doc,
            id: transaction._id,
            group: groupHelper.bind(this, transaction._doc.group),
            payer: userHelper.bind(this, transaction._doc.payer),
            owerInfos: owerInfosHelper.bind(this, transaction._doc.owerInfos),
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
      console.log('transactionInput', transactionInput.owerIds);

      const newTransaction = new Transaction({
        title: transactionInput.title,
        type: transactionInput.type,
        date: transactionInput.date,
        description: transactionInput.description,
        img: transactionInput.img,
        group: transactionInput.group,
        payer: transactionInput.payer,
        owerIds: transactionInput.owerIds,
        owerInfos: transactionInput.owerInfos,
      });

      const transaction = await newTransaction.save();

      return {
        ...transaction._doc,
        id: transaction._doc._id,
        payer: userHelper.bind(this, transaction._doc.payer),
        owerInfos: owerInfosHelper.bind(this, transaction._doc.owerInfos),
        group: groupHelper.bind(this, transaction._doc.group),
      };
    },
    async editTransaction(_, { transactionId, transactionInput }, context) {
      const user = checkAuth(context);
      const transaction = await Transaction.findById(transactionId);

      transaction.title = transactionInput.title;
      transaction.date = transactionInput.date;
      transaction.description = transactionInput.description;
      transaction.img = transactionInput.img;
      transaction.payer = transactionInput.payer;

      await transaction.save();

      return {
        ...transaction._doc,
        id: transaction._doc._id,
        payer: userHelper.bind(this, transaction._doc.payer),
        owerInfos: owerInfosHelper.bind(this, transaction._doc.owerInfos),
        group: groupHelper.bind(this, transaction._doc.group),
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
