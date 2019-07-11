import { gql } from 'apollo-server-express';

export default gql`

  type Office {
    id: Int!
    name: String!
    emails: [OfficeEmails]
    country: String
    cover: String
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
    allOffices: OfficesResponseStatus!,
    officeUsers(officeId: Int!): OfficeUsersAndCountResponse!
  }

  type Mutation {
    createOffice(input: CreateOfficeInput!) : OfficeResponseStatus!
    updateOffice(input: UpdateOfficeInput!) : OfficeResponseStatus!
    deleteOffice(officeId: Int!): OfficeResponseStatus!
  }

  type OfficeEmails {
    user: String,
    email: String
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

  type OfficesResponseStatus {
    offices: [Office]!
  }
`;
