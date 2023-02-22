const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, { user }) => {
      if (user) {
        const userData = await User.findOne({ _id: user._id })
          .select('-__v -password')
          .populate('savedBooks');
        return userData;
      }
      throw new AuthenticationError('You are not logged in!');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('Invalid email or password');
        }

        const correctPassword = await user.isCorrectPassword(password);

        if (!correctPassword) {
          throw new AuthenticationError('Invalid email or password');
        }

        const token = signToken(user);

        return { token, user };
      } catch (err) {
        throw new AuthenticationError('An error occurred while logging in');
      }
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const { bookId, authors, description, title, image, link } = input;
      const book = { bookId, authors, description, title, image, link };

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { savedBooks: book } },
        { new: true }
      ).populate('savedBooks');

      return updatedUser;
    },

    removeBook: async (parent, { bookId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      ).populate('savedBooks');

      return updatedUser;
    },
  },
};

module.exports = resolvers;
