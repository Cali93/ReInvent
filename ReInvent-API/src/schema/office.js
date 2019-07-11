import { gql } from 'apollo-server-express';

export default gql`

  type Office {
    id: Int!
    name: String!
    emails: [OfficeEmails]
    country: String
    cover: String
  }

  input OfficeEmailsInput {
    owner: String!
    email: String!
  }

  input CreateOfficeInput {
    name: String!
    emails: [OfficeEmailsInput]
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
    owner: String,
    email: String
  }

  type OfficeUsersAndCountResponse {
    officeUsers: [User!]!
    count: Int!
  }

  type OfficeResponseStatus {
    ok: Boolean!
    errors: [Error]
  }

  type OfficesResponseStatus {
    offices: [Office]!
  }
`;
