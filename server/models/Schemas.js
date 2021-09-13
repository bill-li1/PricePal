const { Schema } = require('mongoose');

const userSchema = new Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
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
    payer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    owersId: { type: [String], required: true },
    owers: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: 'OwerInfo',
    },
  },
  { timestamps: true },
);

exports.owerInfoSchema = owerInfoSchema;
exports.userSchema = userSchema;
exports.transactionSchema = transactionSchema;
