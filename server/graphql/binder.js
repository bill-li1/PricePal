const Transaction = require('../models/Transaction');
const User = require('../models/User');
const OwerInfo = require('../models/OwerInfo');
const Group = require('../models/Group');

const owerInfosHelper = async (owerInfoIds) => {
  console.log('owerInfoIds', owerInfoIds);
  try {
    const owerInfos = await OwerInfo.find({ _id: { $in: owerInfoIds } });
    return owerInfos.map((owerInfo) => ({
      ...owerInfo._doc,
      id: owerInfo._doc._id,
      user: userHelper.bind(this, owerInfo._doc.user),
    }));
  } catch (err) {
    throw new Error(err);
  }
};

const transactionHelper = async (transactionId) => {
  try {
    const transaction = await Transaction.findById(transactionId);
    return {
      ...transaction._doc,
      id: transaction._doc._id,
      payer: userHelper.bind(this, transaction._doc.payer),
      owerInfos: owerInfosHelper.bind(this, transaction._doc.owers),
    };
  } catch (err) {
    throw new Error(err);
  }
};

const userHelper = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user._doc._id,
      groups: groupsHelper.bind(this, user._doc.groups),
    };
  } catch (err) {
    throw new Error(err);
  }
};

const multiUsersHelper = async (userIds) => {
  try {
    return await userIds.map(async (user) => {
      const newUser = await userHelper(user)
      return newUser
    });
  } catch (err) {
    throw new Error(err);
  }
};

const groupHelper = async (groupId) => {
  console.log('groupId', groupId);

  try {
    const group = await Group.findById(groupId);
    // console.log('found group: ', group)
    return {
      ...group._doc,
      id: group._doc._id,
      users: multiUsersHelper.bind(this, group._doc.users),
    };
  } catch (err) {
    throw new Error(err);
  }
};

const groupsHelper = async (groupIds) => {
  console.log('groupIds', groupIds);

  try {
    return await groupIds.map(async (groupId) => {
      return await groupHelper(groupId); 
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.owerInfosHelper = owerInfosHelper;
exports.transactionHelper = transactionHelper;
exports.userHelper = userHelper;
exports.multiUsersHelper = multiUsersHelper;
exports.groupsHelper = groupsHelper;
