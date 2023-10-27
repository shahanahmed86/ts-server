import { ROLES } from '../../utils/constants.util';

const { admin, user } = ROLES;

const authSchema = `#graphql
  extend type Query {
    # admin
    adminLoggedIn: Admin! @auth(type: "${admin}")

    # user
    userLoggedIn: User! @auth(type: "${user}")
  }
  
  extend type Mutation {
    # admin
    adminChangePassword(oldPassword: String!, password: String!): String! @auth(type: "${admin}")
    adminLogin(email: String!, password: String!): Admin! @guest(type: "${admin}")
    adminLogout: String! @auth(type: "${admin}")

    # user
    userUpdateProfile(
      firstName: String
      lastName: String
      avatar: String
      phone: String
      gender: String
    ): String! @auth(type: "${user}")
    userChangePassword(oldPassword: String!, password: String!): String! @auth(type: "${user}")
    userLogin(email: String!, password: String!): User! @guest(type: "${user}")
    userSignup(
      email: String!
      password: String!
      firstName: String
      lastName: String
      avatar: String
      phone: String
      gender: String!
    ): String! @guest(type: "${user}")
    userLogout: String! @auth(type: "${user}")
  }
`;

export default authSchema;
