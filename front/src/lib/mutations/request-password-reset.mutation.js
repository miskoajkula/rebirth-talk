import { gql } from '@apollo/client';

const REQUEST_PASSWORD_RESET = gql`
  mutation SocialLogin($email: String!) {
    requestPasswordReset(email: $email) 
  }
`;

export default REQUEST_PASSWORD_RESET;
