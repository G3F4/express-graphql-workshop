import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
import EventType from './event-type';
import { getEvent, getParticipant } from '../../fake-api';

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
      resolve: (root) => root.friendsIds.map(id => getParticipant(id))
    },
    events: {
      type: new GraphQLList(EventType),
      resolve: (root) => root.eventsIds.map(id => getEvent(id))
    }
  })
});

export default ParticipantType;
