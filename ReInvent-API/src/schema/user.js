import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    email: String!
    role: String!
    avatar: String
    googleId: String
    firstName: String
    lastName: String
    officeId: Int
    gender: String!
  }

  type Query {
    getUser: getUserResponse!
    allUsers(id: Int!, passphrase: String!): [User!]!
  }

  type getUserResponse {
    ok: Boolean!
    errors: [Error!]
    user: User
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type LogoutResponse {
    ok: Boolean!
  }

  type ValidateUserResponse {
    ok: Boolean!
    errors: [Error!]
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    avatar: String!
    gender: String!
    email: String!
    password: String!
  }

  type Mutation {
    register(input: RegisterInput!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
    logout: LogoutResponse!
    validateUser(id: Int!, passphrase: String!): ValidateUserResponse!
    unValidateUser(id: Int!, passphrase: String!): ValidateUserResponse!
  }
`;
