import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import EventType from './event-type';

const ParticipantType = new GraphQLObjectType({
  name: 'participant',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: () => 'id'
    },
    name: {
      type: GraphQLString,
      resolve: () => 'name'
    },
    friends: {
      type: new GraphQLList(ParticipantType),
      resolve: () => ['']
    },
    events: {
      type: new GraphQLList(EventType),
      resolve: () => ['']
    }
  })
});

export default ParticipantType;
