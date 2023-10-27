const roleSchema = `#graphql
  type Role {
    id: ID!
    name: String!
    users: [User!]!
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Query {
    roles: [Role!]!
  }
`;

export default roleSchema;
