import { gql } from "@apollo/client";

const SOCIAL_LOGIN = gql`
  mutation SocialLogin($token: String!) {
    authenticateWithSocial(token: $token) {
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

export default SOCIAL_LOGIN;
