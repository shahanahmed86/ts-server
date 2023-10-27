export const GENDERS = `#graphql
  query Genders {
    values: genders {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const ROLES = `#graphql
  query Roles {
    values: roles {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
