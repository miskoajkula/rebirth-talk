import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login($payload: EmailRegisterInput!) {
    authenticateWithEmail(payload:$payload ) {
      token
    }
  }
`;

export default LOGIN;
