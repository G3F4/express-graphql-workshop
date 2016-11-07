import { GraphQLObjectType } from 'graphql';
import EventType from './types/event-type';
import ParticipantType from './types/participant-type';

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    participant: {
      resolve: () => 'participant',
      type: ParticipantType
    },
    event: {
      resolve: () => 'event',
      type: EventType
    }
  }
});

export default query;
