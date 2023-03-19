export const LOGIN = `#graphql
  mutation Login($email: String!, $password: String!) {
    values: adminLogin(email: $email, password: $password) {
      token
      user {
        id
        email
        roleId
        role {
          id
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const LOGGED_IN = `#graphql
  query LoggedIn {
    values: adminLoggedIn {
      id
      email
      roleId
      role {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const CHANGE_PASSWORD = `#graphql
  mutation ChangePassword($oldPassword: String!, $password: String!) {
    values: adminChangePassword(oldPassword: $oldPassword, password: $password)
  }
`;
