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

  type Query {
    getUser: UserResponse!
    allUsers: [User!]!
    allUsersByOfficeId(officeId: Int!): [User!]!
  }

  type Mutation {
    register(input: RegisterInput!): UserResponse!
    createUser(input: CreateUserInput!): UserResponse!
    updateUser(input: UpdateUserInput!): UserResponse!
    login(email: String!, password: String!): UserResponse!
    logout: LogoutResponse!
    deleteUser(id: Int!): UserResponseStatus!
  }

  enum RoleEnum {
    admin
    manager
    user
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
    role: RoleEnum
    avatar: String
    gender: String
    officeId: Int!
    email: String!
  }

  input UpdateUserInput {
    userId: Int!
    firstName: String
    role: RoleEnum
    lastName: String
    avatar: String
    gender: String
    officeId: Int
    email: String
  }
`;
