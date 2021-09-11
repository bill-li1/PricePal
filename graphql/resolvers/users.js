const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators.js');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
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

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(_, { registerInput: { firstName, lastName, email, password, confirmPassword, profileImg } }) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(firstName, lastName, email, password, confirmPassword);
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

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
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

      console.log('res', res);
      console.log('res._doc', { ...res._doc });
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
