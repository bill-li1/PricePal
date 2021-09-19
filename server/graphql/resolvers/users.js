const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators.js');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
const Group = require('../../models/Group');
const { multiGroupsHelper } = require('../binder');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    SECRET_KEY,
    { expiresIn: '9h' },
  );
}

module.exports = {
  Query: {
    async getUserById(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return {
            ...user._doc,
            groups: multiGroupsHelper.bind(this, user._doc.groups),
          };
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { loginInput: { email, password } }) {
      console.log('login');
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      // const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        groups: multiGroupsHelper.bind(this, user._doc.groups),
        // token,
      };
    },
    async register(_, { registerInput: { firstName, lastName, email, password, profileImg } }) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(firstName, lastName, email, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      //Check user doesnt already exist
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('Email is taken', {
          errors: {
            email: 'This email is taken',
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        firstName,
        lastName,
        password,
        profileImg,
      });

      newUser.groups = [];

      const res = await newUser.save();
      // const token = generateToken(res);

      console.log(res);

      return {
        ...res._doc,
        id: res._id,
        groups: [],
        // token,
      };
    },
    async addGroupUser(_, { groupId, userId }) {
      const user = await User.findById(userId);
      if (!user.groups.includes(groupId)) {
        user.groups.push(groupId);
        await user.save();
      } else {
        throw new Error('User already exists in group');
      }

      const group = await Group.findById(groupId);
      if (!group.users.includes(userId)) {
        group.users.push(userId);
        await group.save();
      }


      // const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        groups: multiGroupsHelper.bind(this, user._doc.groups),
        // token,
      };
    },

    async addGroupUserByCode(_, { code, userId }) {
      const groupRes = await Group.find({code});
      const group = groupRes[0];
      if (!group) {
        throw new Error('Code does not exist')
      }
      const user = await User.findById(userId);

      if (!user.groups.includes(group._id)) {
        user.groups.push(group._id);
        await user.save();
      } 
      else {
        throw new Error('User already exists in group')
      }
      if (!group.users.includes(userId)) {
        group.users.push(userId);
        await group.save();
      }
      // const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        groups: multiGroupsHelper.bind(this, user._doc.groups),
        // token,
      };
    },
    async editUser(_, { editUserInput: { userId, firstName, lastName, password, profileImg } }) {
      password = await bcrypt.hash(password, 12);
      console.log('editUser');

      const res = await User.findById(userId);
      res.firstName = firstName;
      res.lastName = lastName;
      res.password = password;
      res.profileImg = profileImg;
      await res.save();

      // const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        groups: multiGroupsHelper.bind(this, res._doc.groups),
        token,
      };
    },
  },
};
