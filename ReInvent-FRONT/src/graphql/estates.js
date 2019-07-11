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
export const GET_ALL_ESTATES_BY_OFFICE = gql`
  query($officeId: Int!) {
    allEstatesByOfficeId(officeId: $officeId) {
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

export const CREATE_ESTATE = gql`
  mutation($input: CreateEstateInput!) {
    createEstate(input: $input) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
