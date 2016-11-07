import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import EventType from './event-type';

const ParticipantType = new GraphQLObjectType({
  name: 'participant',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (root) => root.id
    },
    name: {
      type: GraphQLString,
      resolve: (root) => root.name
    },
    friends: {
      type: new GraphQLList(ParticipantType),
      resolve: (root) => [root]
    },
    events: {
      type: new GraphQLList(EventType),
      resolve: (root) => [root]
    }
  })
});

export default ParticipantType;
