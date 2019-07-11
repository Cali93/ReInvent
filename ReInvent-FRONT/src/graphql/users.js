import gql from 'graphql-tag';

export const GET_ALL_USERS = gql`
  query {
    allUsers {
      id
      firstName
      lastName
      gender
      role
      officeId
      avatar
      email
    }
  }
`;

export const GET_ALL_USERS_BY_OFFICE = gql`
  query($officeId: Int!) {
    allUsersByOfficeId(officeId: $officeId) {
      id
      firstName
      lastName
      gender
      role
      officeId
      avatar
      email
    }
  }
`;
export const DELETE_USER = gql`
  mutation($id: Int!) {
    deleteUser(id: $id) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ok
      user {
        id
        firstName
        lastName
        gender
        role
        officeId
        avatar
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
  mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
