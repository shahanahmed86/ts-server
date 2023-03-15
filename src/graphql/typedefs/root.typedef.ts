const rootSchema = `#graphql
  scalar Date

  directive @auth(type: String) on FIELD_DEFINITION
  directive @guest(type: String) on FIELD_DEFINITION

  type Query {
    _: Boolean
  }
  
  type Mutation {
    _: Boolean
  }
  
  type Subscription {
    _: Boolean
    foo(bar: String!): String
  }
  
  type Message {
    success: Boolean!
    message: String!
    debugMessage: String
  }
`;

export default rootSchema;
