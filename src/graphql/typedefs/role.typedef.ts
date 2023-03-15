const roleSchema = `#graphql
  type Role {
    id: ID!
    name: String!
    users: [User!]!
    createdAt: Date!
    updatedAt: Date!
  }  
`;

export default roleSchema;
