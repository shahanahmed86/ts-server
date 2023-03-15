const genderSchema = `#graphql
  type Gender {
    id: ID!
    name: String!
    users: [User!]!
    createdAt: Date!
    updatedAt: Date!
  }  
`;

export default genderSchema;
