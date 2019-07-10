import gql from 'graphql-tag';

export const GET_ALL_ESTATES = gql`
  query {
    allEstates {
      id
      name
      cover
      officeId
    }
  }
`;

export const DELETE_ESTATE = gql`
  mutation($id: Int!) {
    deleteEstate(id: $id) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const UPDATE_ESTATE = gql`
  mutation($input: UpdateEstateInput!) {
    updateEstate(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
