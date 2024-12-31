import { gql } from '@apollo/client';

const CLICK_POST_MUTATION = gql`
  mutation ClickPostMutation($id: ID!) {
    clickPost(id: $id)
  }
`;

export default CLICK_POST_MUTATION;
