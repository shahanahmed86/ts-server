import { ROLES } from '../../utils/constants.util';

const { admin, user } = ROLES;

const authSchema = `#graphql
  extend type Query {
    # admin
    adminLoggedIn: User! @auth(type: "${admin}")

    # user
    userLoggedIn: User! @auth(type: "${user}")
  }
  
  extend type Mutation {
    # admin
    adminUpdateProfile(
      firstName: String
      lastName: String
      avatar: String
      phone: String
      genderId: String
    ): String! @auth(type: "${admin}")
    adminChangePassword(oldPassword: String!, password: String!): String! @auth(type: "${admin}")
    adminLogin(email: String!, password: String!): AuthUser! @guest(type: "${admin}")

    # user
    userUpdateProfile(
      firstName: String
      lastName: String
      avatar: String
      phone: String
      genderId: String
    ): String! @auth(type: "${user}")
    userChangePassword(oldPassword: String!, password: String!): String! @auth(type: "${user}")
    userLogin(email: String!, password: String!): AuthUser! @guest(type: "${user}")
    userSignup(
      email: String!
      password: String!
      firstName: String
      lastName: String
      avatar: String
      phone: String
      genderId: String!
    ): AuthUser! @guest(type: "${user}")
  }
`;

export default authSchema;
