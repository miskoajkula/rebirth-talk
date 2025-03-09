import { gql } from "@apollo/client";

const GET_CONFIG = gql`
  query GetConfig {
    getConfig {
      tags {
        id
        name
        bgColor
        slug
      }
      communities {
        id
        icon
        category
        preselect
        subcategories {
          id
          name
        }
      }
    }
  }
`;

export default GET_CONFIG;
