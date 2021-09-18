const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    groups: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'Group',
    },
  },
  { timestamps: true },
);

const owerInfoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    amount: { type: String, required: true },
    notes: { type: String, required: false, trim: true },
  },
  { timestamps: true },
);

const transactionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: false },
    groupId: { type: Schema.Types.ObjectId, required: true, ref: 'Group' }, // currently not a connection
    payer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    owerIds: { type: [Schema.Types.ObjectId], required: true },
    owerInfos: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'OwerInfo',
    },
  },
  { timestamps: true },
);

const groupSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    bannerImg: { type: String, required: false },
    code: { type: String, required: false },
    locked: { type: Boolean, required: false },
    active: { type: Boolean, required: false },
    users: {
      // connection
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

exports.owerInfoSchema = owerInfoSchema;
exports.userSchema = userSchema;
exports.transactionSchema = transactionSchema;
exports.groupSchema = groupSchema;
