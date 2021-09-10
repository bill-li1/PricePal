const { model } = require('mongoose');
const { owerInfoSchema } = require('./Schemas');

module.exports = model('OwerInfo', owerInfoSchema);
