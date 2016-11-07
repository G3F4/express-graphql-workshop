import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import ParticipantType from './participant-type';

const EventType = new GraphQLObjectType({
  name: 'event',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (root) => root.id
    },
    name: {
      type: GraphQLString,
      resolve: (root) => root.name
    },
    participants: {
      type: new GraphQLList(ParticipantType),
      resolve: (root) => [root]
    }
  })
});

export default EventType;
