import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    email: String!
    role: RoleEnum
    avatar: String
    googleId: String
    firstName: String
    lastName: String
    officeId: Int
    gender: String
  }

  enum RoleEnum {
    admin
    manager
    user
  }

  type Query {
    getUser: getUserResponse!
    allUsers: [User!]!
  }

  type getUserResponse {
    ok: Boolean!
    errors: [Error!]
    user: User
  }

  type UserResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type LogoutResponse {
    ok: Boolean!
  }

  type UserResponseStatus {
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

  input CreateUserInput {
    firstName: String!
    lastName: String!
    avatar: String!
    gender: String!
    officeId: Int!
    email: String!
  }

  input UpdateUserInput {
    id: Int!
    firstName: String
    lastName: String
    avatar: String
    gender: String
    officeId: Int
    email: String
  }

  type Mutation {
    register(input: RegisterInput!): UserResponse!
    createUser(input: CreateUserInput!): UserResponse!
    updateUser(input: UpdateUserInput!): UserResponseStatus!
    login(email: String!, password: String!): UserResponse!
    logout: LogoutResponse!
    deleteUser(id: Int!): UserResponseStatus!
  }
`;
