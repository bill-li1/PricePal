const { model } = require('mongoose');
const { userSchema } = require('./Schemas');

module.exports = model('User', userSchema);
