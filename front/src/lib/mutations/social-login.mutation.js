import { gql } from '@apollo/client';

const SOCIAL_LOGIN = gql`
  mutation SocialLogin($token: String!) {
    authenticateWithSocial(token: $token) {
      token
    }
  }
`;

export default SOCIAL_LOGIN;
