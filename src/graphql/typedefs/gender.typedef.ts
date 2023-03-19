const genderSchema = `#graphql
  type Gender {
    id: ID!
    name: String!
    users: [User!]!
    createdAt: Date!
    updatedAt: Date!
  }

  extend type Query {
    genders: [Gender!]!
  }
`;

export default genderSchema;
