const { AuthenticationError } = require('apollo-server');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const OwerInfo = require('../../models/OwerInfo');
const Group = require('../../models/Group');
const checkAuth = require('../../util/check-auth');
const { multiUsersHelper } = require('../middleware');

// getGroupById(groupID: ID!): Group
// createGroup(creatGroupInput: CreateGroupInput!) : Group!
// editGroup(editGroupInput: EditGroupInput): Group!
module.exports = {
  Query: {
    async getGroupById(_, { groupID }, context) {
      try {
        const group = await Group.find(group);
        return {
            ... group._doc,
            users: multiUsersHelper.bind(this, group._doc.users),
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createGroup(_, { groupInput }, context) {
      const user = await checkAuth(context);
      const newGroup = new Group({
        title: groupInput.title,
        description: groupInput.description,
        bannerImg: groupInput.bannerImg,
        code: groupInput.code,
        locked: groupInput.locked,
        active: groupInput.active,
        users: [user.id],
      });

      const group = await newGroup.save();
      
      return {
        ...group._doc,
        id: group._doc._id,
        users: multiUsersHelper.bind(this, group._doc.users),
      };
    },

    async editGroup(_, { groupId, groupInput }, context) {
      const user = checkAuth(context);

      const group = await Group.findById(groupId);

      group.title = groupInput.title
      group.description = groupInput.description
      group.bannerImg = groupInput.bannerImg
      group.code = groupInput.code
      group.locked = groupInput.locked
      group.active = groupInput.active
      group.users = groupInput.users

      await group.save();

      return {
        ...group._doc,
        id: group._doc._id,
        users: multiUserHelper.bind(this, group._doc.users),
      };
    },

    async deleteGroup(_, { groupId }, context) {
      const user = checkAuth(context);
      try {
        const group = await Group.findById(groupId);
        await group.delete();
        return 'Group deleted successfully';
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
