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
