import { gql } from '@apollo/client';

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($payload: UpdateProfileInput!) {
    updateProfile(payload:$payload )
  }
`;

export default UPDATE_PROFILE;
