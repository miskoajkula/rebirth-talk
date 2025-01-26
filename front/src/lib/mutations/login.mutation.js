import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login($payload: EmailRegisterInput!) {
    authenticateWithEmail(payload:$payload ) {
      token
      userInfo {
        createdAt
        email
        avatar {
          name
          colors  
        }  
      }  
    }
  }
`;

export default LOGIN;
