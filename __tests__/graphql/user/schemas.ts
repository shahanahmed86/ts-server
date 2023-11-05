export const LOGIN = `#graphql
  mutation Login($email: String!, $password: String!) {
    values: userLogin(email: $email, password: $password) {
      avatar
      createdAt
      email
      firstName
      id
      lastName
      phone
      updatedAt
      gender {
        id
        name
      }
      role {
        id
        name
      }
    }
  }
`;

export const LOGGED_IN = `#graphql
  query LoggedIn {
    values: userLoggedIn {
      avatar
      createdAt
      email
      firstName
      id
      lastName
      phone
      updatedAt
      gender {
        id
        name
      }
      role {
        id
        name
      }
    }
  }
`;

export const CHANGE_PASSWORD = `#graphql
  mutation ChangePassword($oldPassword: String!, $password: String!) {
    values: userChangePassword(oldPassword: $oldPassword, password: $password)
  }
`;

export const UPDATE_PROFILE = `#graphql
  mutation UpdateProfile(
      $firstName: String,
      $lastName: String,
      $avatar: String,
      $phone: String,
      $gender: String
    ) {
    values: userUpdateProfile(
      firstName: $firstName,
      lastName: $lastName,
      avatar: $avatar,
      phone: $phone,
      gender: $gender
    )
  }
`;

export const SIGNUP = `#graphql
  mutation Signup(
    $email: String!
    $password: String!
    $gender: String!
    $firstName: String
    $lastName: String
    $avatar: String
    $phone: String
  ) {
    values: userSignup(
      email: $email
      password: $password
      gender: $gender
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
      phone: $phone
    )
  }
`;

export const LOGOUT = `#graphql
  mutation LogOut {
    values: userLogout
  }
`;
