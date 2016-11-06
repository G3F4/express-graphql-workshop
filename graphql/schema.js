import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    fields: {
      test: {
        type: GraphQLString,
        resolve: () => 'test'
      }
    }
  })
});

export default schema;
