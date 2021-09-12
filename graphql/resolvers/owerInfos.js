const { AuthenticationError } = require('apollo-server');
const OwerInfo = require('../../models/OwerInfo');
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getOwerInfos() {
      try {
        return await OwerInfo.find();
      } catch (err) {
        throw new Error(err);
      }
    },
    async getOwerInfoById(_, { owerInfoId }) {
      try {
        const owerInfo = await OwerInfo.findById(owerInfoId);
        if (owerInfo) {
          return owerInfo;
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
      // Save ID or User?
      const owerUser = await User.findById(owerInfoInput.user);
      console.log('owerUser:', owerUser);

      console.log('owerInfoInput',owerInfoInput);
      const newOwerInfo = new OwerInfo ({
        user: owerInfoInput.user,
        amount: owerInfoInput.amount,
        notes: owerInfoInput.notes ? owerInfoInput.notes : 'No notes',
      });

      console.log('newOwerInfo',newOwerInfo)

      const owerInfo = await newOwerInfo.save()
      console.log('owerInfo',owerInfo) 
      return owerInfo;
    },

    async deleteOwerInfo(_, { owerInfoId }, context) {
      const user = checkAuth(context);

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
