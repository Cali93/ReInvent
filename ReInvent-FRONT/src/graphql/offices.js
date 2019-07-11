import gql from 'graphql-tag';

export const GET_ALL_OFFICES = gql`
  query {
    allOffices {
      offices {
        id
        name
        cover
        country
        emails {
          owner
          email
        }
      }
    }
  }
`;

export const DELETE_OFFICE = gql`
  mutation($officeId: Int!) {
    deleteOffice(officeId: $officeId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const UPDATE_OFFICE = gql`
  mutation($input: UpdateOfficeInput!) {
    updateOffice(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const CREATE_OFFICE = gql`
  mutation($input: CreateOfficeInput!) {
    createOffice(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
