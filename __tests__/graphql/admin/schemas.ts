export const LOGIN = `#graphql
  mutation Login($email: String!, $password: String!) {
    values: adminLogin(email: $email, password: $password) {
      token
      user {
        avatar
        createdAt
        email
        firstName
        genderId
        id
        lastName
        phone
        roleId
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
  }
`;

export const LOGGED_IN = `#graphql
  query LoggedIn {
    values: adminLoggedIn {
      avatar
      createdAt
      email
      firstName
      genderId
      id
      lastName
      phone
      roleId
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
    values: adminChangePassword(oldPassword: $oldPassword, password: $password)
  }
`;

export const UPDATE_PROFILE = `#graphql
  mutation AdminUpdateProfile(
      $firstName: String,
      $lastName: String,
      $avatar: String,
      $phone: String,
      $genderId: String
    ) {
    values: adminUpdateProfile(
      firstName: $firstName,
      lastName: $lastName,
      avatar: $avatar,
      phone: $phone,
      genderId: $genderId
    )
  }
`;
