const userSchema = `#graphql
  type User {
    id: ID!
    firstName: String
    lastName: String
    avatar: String
    email: String!
    phone: String
    role: Role
    gender: Gender
    createdAt: Date!
    updatedAt: Date!
  }
`;

export default userSchema;
