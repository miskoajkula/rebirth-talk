import { gql } from '@apollo/client';


const GET_POSTS_BY_USER = gql`
  query GetUserPosts($username: String!, $pagination: PaginationInput!) {
    getPostsByUser(username: $username, pagination:$pagination )
  }
`;

export default GET_POSTS_BY_USER;
