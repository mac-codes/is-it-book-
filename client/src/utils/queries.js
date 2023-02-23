import { gql } from "@apollo/client";

// define GraphQL query to fetch logged in user's data, including their saved books
export const GET_ME = gql`
  query getMe {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }`;
