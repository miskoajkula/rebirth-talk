import { gql } from '@apollo/client';


const CHECK_ACCOUNT = gql`
  query CheckAccount($email: String!) {
    checkAccount(email: $email) {
      socialAuth
      userExists
    }
  }
`;

export default CHECK_ACCOUNT;
