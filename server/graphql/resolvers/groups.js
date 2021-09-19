const Group = require('../../models/Group');
const checkAuth = require('../../util/check-auth');
const { multiUsersHelper } = require('../binder');

module.exports = {
  Query: {
    async getGroupById(_, { groupId }, context) {
      try {
        const group = await Group.findById(groupId)
        return {
          ...group._doc,
          id: group._doc._id,
          users: multiUsersHelper.bind(this, group._doc.users),
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createGroup(_, { groupInput }, context) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const generateNum = () => {return Math.floor(Math.random() * 62)}
      const generateCode = () => {
        let code = ''
        for(var i = 0; i < 6; i ++){
          code += characters[generateNum()]
        }
        return code
      }
      let code;
      let existingGroup;
      while(existingGroup || !code) {
        code = generateCode()
        existingGroup = await Group.findOne({ code: code });
      }
      // const user = checkAuth(context);
      const newGroup = new Group({
        title: groupInput.title,
        description: groupInput.description ? groupInput.description : "",
        bannerImg: groupInput.bannerImg,
        code: code,
        locked: groupInput.locked,
        active: groupInput.active,
        users: groupInput.users,
      });

      const group = await newGroup.save();
      
      return {
        ...group._doc,
        id: group._doc._id,
        users: multiUsersHelper.bind(this, group._doc.users),
      };
    },

    async editGroup(_, { groupId, groupInput }) {
      const group = await Group.findById(groupId);

      group.title = groupInput.title
      group.description = groupInput.description ? groupInput.description : group.description
      group.bannerImg = groupInput.bannerImg
      // group.code = groupInput.code
      group.locked = groupInput.locked
      group.active = groupInput.active
      group.users = groupInput.users ? groupInput.users : group.users

      await group.save();

      return {
        ...group._doc,
        id: group._doc._id,
        users: multiUsersHelper.bind(this, group._doc.users),
      };
    },
    async setGroupActive(_, { groupId, active }) {
      try {
        const group = await Group.findById(groupId);
        group.active = active;
        await group.save();
        return {
          ...group._doc,
          id: group._doc._id,
          users: multiUsersHelper.bind(this, group._doc.users),
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
