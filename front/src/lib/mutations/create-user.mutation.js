import { gql } from '@apollo/client';

const REGISTER_VIA_EMAIL = gql`
  mutation ClickPostMutation($payload: EmailRegisterInput!) {
    registerViaEmail(payload: $payload)
  }
`;

export default REGISTER_VIA_EMAIL;
