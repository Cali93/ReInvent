import gql from 'graphql-tag';

export const GET_CURRENT_USER = gql`
  query {
    getUser {
      ok
      user {
        id
        firstName
        lastName
        avatar
        role
        officeId
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      user {
        id
        firstName
        lastName
        officeId
        role
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation($input: RegisterInput!) {
    register(input: $input) {
      ok
      user {
        id
        firstName
        lastName
      }
      errors {
        path
        message
      }
    }
  }
`;
