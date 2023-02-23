const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// Define resolvers
const resolvers = {
    Query: {
        // Get user data by ID
        me: async (parent, args, context) => {
            // Check if user is logged in
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password') // Exclude these fields from the query
                return userData;
            }
            // Throw error if user is not logged in
            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        // Add a new user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // Login user with email and password
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const token = signToken(user);
            return { token, user };
        },
        // Save a book to user's savedBooks array
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } }, // Add the book to savedBooks array
                    { new: true } // Return the updated user
                )
                return updatedUser;
            }
            // Throw error if user is not logged in
            throw new AuthenticationError('You need to be logged in!')
        },
        // Remove a book from user's savedBooks array by bookId
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } }, // Remove the book from savedBooks array
                    { new: true } // Return the updated user
                )
                return updatedUser;
            }
        },
    },
};

module.exports = resolvers;
