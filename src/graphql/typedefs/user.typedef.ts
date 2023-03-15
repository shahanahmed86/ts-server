const userSchema = `#graphql
  type User {
    id: ID!
    firstName: String
    lastName: String
    avatar: String
    email: String!
    phone: String
    roleId: String!
    role: Role
    genderId: String!
    gender: Gender
    createdAt: Date!
    updatedAt: Date!
  }
 
  type AuthUser {
    token: String!
    user: User!
  }
`;

export default userSchema;
