const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const transactionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: false },
    payer: { type: userSchema, ref: 'payer' },
    /* owers: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, required: true },
          amount: { type: Number, required: true },
          notes: { type: String, required: true },
        },
      ],
      ref: 'owers',
    },
  */
    owers: { type: userSchema, ref: 'owers ' },
  },
  { timestamps: true }
);

module.exports = model('Transaction', transactionSchema);
