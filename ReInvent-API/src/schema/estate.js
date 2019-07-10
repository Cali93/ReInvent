import { gql } from 'apollo-server-express';

export default gql`
  type Estate {
    id: Int!
    name: String
    cover: String
    officeId: Int
  }

  type Query {
    allEstates: [Estate!]!
  }

  type Mutation {
    createEstate(input: CreateEstateInput!): EstateResponseStatus!
    updateEstate(input: UpdateEstateInput!): EstateResponseStatus!
    archiveEstate(id: Int!): EstateResponseStatus!
    deleteEstate(id: Int!): EstateResponseStatus!
  }

  type EstateResponseStatus {
    ok: Boolean!
    errors: [Error!]
  }

  input CreateEstateInput {
    name: String!
    cover: String!
    officeId: Int!
  }

  input UpdateEstateInput {
    name: String
    cover: String
    estateId: Int!
  }
`;
