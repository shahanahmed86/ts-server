export const LOGIN = `#graphql
  mutation Login($email: String!, $password: String!) {
    values: adminLogin(email: $email, password: $password) {
      id
      email
      role {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const LOGGED_IN = `#graphql
  query LoggedIn {
    values: adminLoggedIn {
      id
      email
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

export const LOGOUT = `#graphql
  mutation LogOut {
    values: adminLogout
  }
`;
