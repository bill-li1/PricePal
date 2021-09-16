const { model } = require('mongoose');
const { groupSchema } = require('./Schemas');

module.exports = model('groupSchema', groupSchema);
