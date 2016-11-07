import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';
import { addEvent, addParticipant, addParticipantToEvent, addParticipantFriend } from '../fake-api';
import EventType from './types/event-type';
import ParticipantType from './types/participant-type';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutate data',
  fields: {
    addEvent: {
      type: EventType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, { id, name }) => addEvent({ id, name })
    },
    addParticipant: {
      type: ParticipantType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, { id, name }) => addParticipant({ id, name })
    },
    addParticipantToEvent: {
      type: ParticipantType,
      args: {
        participantId: { type: new GraphQLNonNull(GraphQLID) },
        eventId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (root, { participantId, eventId }) => addParticipantToEvent({ participantId, eventId })
    },
    addParticipantFriend: {
      type: ParticipantType,
      args: {
        participantId: { type: new GraphQLNonNull(GraphQLID) },
        friendId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (root, { participantId, friendId }) => addParticipantFriend({ participantId, friendId })
    }
  }
});

export default mutation;
