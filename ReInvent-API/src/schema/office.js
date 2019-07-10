import { gql } from 'apollo-server-express';

export default gql`

  type Office {
    id: Int!
    name: String!
    email: String!
    country: String!
    cover: String!
    userIds: [Int!]!
    estateIds: [Int!]!
  }

  input CreateOfficeInput {
    name: String!
    email: String!
    country: String!
    cover: String!
  }

  input UpdateOfficeInput {
    name: String
    email: String
    country: String
    cover: String
  }

  type Query {
    allOffices: OfficeResponseStatus!,
    officeUsers(officeId: Int!): OfficeUsersAndCountResponse!
  }

  type Mutation {
    createOffice(input: CreateOfficeInput!) : OfficeResponseStatus!
    updateOffice(input: UpdateOfficeInput!) : OfficeResponseStatus!
    deleteOffice(officeId: Int!): OfficeResponseStatus!
  }

  type OfficeUsersAndCountResponse {
    officeUsers: [User!]!
    count: Int!
  }

  type OfficeResponseStatus {
    ok: Boolean!
    office: Office
    errors: [Error!]
  }
`;
