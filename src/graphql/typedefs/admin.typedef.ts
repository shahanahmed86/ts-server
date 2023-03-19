const adminSchema = `#graphql
  type Admin {
    id: ID!
    email: String!
    roleId: String!
    role: Role
    createdAt: Date!
    updatedAt: Date!
  }
 
  type AuthAdmin {
    token: String!
    user: Admin!
  }
`;

export default adminSchema;
