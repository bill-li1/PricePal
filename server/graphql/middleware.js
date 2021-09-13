const Transaction = require('../models/Transaction');
const User = require('../models/User');
const OwerInfo = require('../models/OwerInfo');

const owerInfosHelper = async (owerInfoIds) => {
  console.log('owerInfoIds', owerInfoIds);
  try {
    const owerInfos = await OwerInfo.find({ _id: { $in: owerInfoIds } });
    return owerInfos.map((owerInfo) => ({
      ...owerInfo._doc,
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
      payer: userHelper.bind(this, transaction._doc.payer),
      owers: owerInfosHelper.bind(this, transaction._doc.owers),
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
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.owerInfosHelper = owerInfosHelper;
exports.transactionHelper = transactionHelper;
exports.userHelper = userHelper;