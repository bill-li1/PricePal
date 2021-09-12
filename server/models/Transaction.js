const { model } = require('mongoose');
const { transactionSchema } = require('./Schemas');

module.exports = model('Transaction', transactionSchema);
