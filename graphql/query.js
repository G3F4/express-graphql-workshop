import { GraphQLObjectType, GraphQLString } from 'graphql';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    participant: {
      resolve: () => 'participant',
      type: GraphQLString
    },
    event: {
      resolve: () => 'event',
      type: GraphQLString
    }
  }
});

export default query;