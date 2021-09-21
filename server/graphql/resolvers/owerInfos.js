const { AuthenticationError } = require('apollo-server');
const OwerInfo = require('../../models/OwerInfo');
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');
const { userHelper } = require('../binder');

module.exports = {
  Query: {
    async getOwerInfos() {
      try {
        const owerInfos = await OwerInfo.find();
        return owerInfos.map((owerInfo) => ({
          ...owerInfo._doc,
          id: owerInfo._doc._id,
          user: userHelper.bind(this, owerInfo._doc.user),
        }));
      } catch (err) {
        throw new Error(err);
      }
    },
    async getOwerInfoById(_, { owerInfoId }) {
      try {
        const owerInfo = await OwerInfo.findById(owerInfoId);
        if (owerInfo) {
          return {
            ...owerInfo._doc,
            id: owerInfo._doc._id,
            user: userHelper.bind(this, owerInfo._doc.user),
          };
        } else {
          throw new Error('OwerInfo not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createOwerInfo(_, { owerInfoInput }, context) {
      const user = checkAuth(context);
      console.log('owerInfoInput.user', owerInfoInput.user);
      const newOwerInfo = new OwerInfo({
        user: owerInfoInput.user,
        amount: owerInfoInput.amount,
        notes: owerInfoInput.notes ? owerInfoInput.notes : 'No notes',
      });
      try {
        const owerInfo = await newOwerInfo.save();
        return {
          ...owerInfo._doc,
          id: owerInfo._doc._id,
          user: userHelper.bind(this, owerInfoInput.user),
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    async editOwerInfo(_, { owerInfoId, owerInfoInput }, context) {
      const user = checkAuth(context);

      const owerInfo = await OwerInfo.findById(owerInfoId);
      owerInfo.amount = owerInfoInput.amount;
      owerInfo.notes = owerInfoInput.notes ? owerInfoInput.notes : owerInfo.notes;
      await owerInfo.save();

      return {
        ...owerInfo._doc,
        id: owerInfo._id,
        user: userHelper.bind(this, owerInfo._doc.user),
      };
    },
    async deleteOwerInfo(_, { owerInfoId }, context) {
      // const user = checkAuth(context);
      try {
        const owerInfo = await OwerInfo.findById(owerInfoId);
        await owerInfo.delete();
        return 'owerInfo deleted successfully';
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
