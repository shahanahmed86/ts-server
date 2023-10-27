const adminSchema = `#graphql
  type Admin {
    id: ID!
    email: String!
    role: Role
    createdAt: Date!
    updatedAt: Date!
  }
`;

export default adminSchema;
