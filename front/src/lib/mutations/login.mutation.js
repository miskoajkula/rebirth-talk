import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login($payload: EmailRegisterInput!) {
    authenticateWithEmail(payload:$payload ) {
      token
      userInfo {
        createdAt
        email
        username
        socialAuth  
        avatar {
          name
          colors  
        }  
      }  
    }
  }
`;

export default LOGIN;
