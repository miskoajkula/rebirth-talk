const commonSchema = `
  type Query {
    _empty: String
    getConfig: ConfigType
  }

  type Mutation {
    _empty: String
  }
  
  input PaginationInput {
    limit: Int!
    offset: Int!
  }
  
  type ConfigType {
    tags: [TagType]
  }
  
  type TagType {
    id: ID!
    name: String
    slug: String
    bgColor: String
  }
`;

export default commonSchema;
