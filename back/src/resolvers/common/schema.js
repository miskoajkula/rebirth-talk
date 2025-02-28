const commonSchema = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
  
  input PaginationInput {
    limit: Int!
    offset: Int!
  }
`;

export default commonSchema;
