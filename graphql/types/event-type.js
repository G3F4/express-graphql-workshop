import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import ParticipantType from './participant-type';

const EventType = new GraphQLObjectType({
  name: 'event',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: () => 'id'
    },
    name: {
      type: GraphQLString,
      resolve: () => 'name'
    },
    participants: {
      type: new GraphQLList(ParticipantType),
      resolve: () => ['']
    }
  })
});

export default EventType;
