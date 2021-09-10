const { model, Schema } = require('mongoose');
const { userSchema } = require('./User');

const owerSchema = new Schema({
  user: { type: userSchema, required: true },
  amount: { type: Number, required: true },
  notes: { type: String, required: true },
});

const transactionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: false },
    payer: { type: userSchema, ref: 'payer' },
    owers: {
      type: [owerSchema],
      ref: 'owers',
    },
  },
  { timestamps: true }
);

module.exports = model('Transaction', transactionSchema);
