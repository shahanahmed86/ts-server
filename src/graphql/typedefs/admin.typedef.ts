const adminSchema = `#graphql
  type Admin {
    id: ID!
    email: String!
    roleId: String!
    role: Role
    createdAt: Date!
    updatedAt: Date!
  }
`;

export default adminSchema;
