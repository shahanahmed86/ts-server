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
`;

export default userSchema;
