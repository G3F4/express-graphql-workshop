const DATA = {
  participants: [{
    id: '1',
    name: 'Bolek',
    friendsIds: ['2', '3'],
    eventsIds: ['1']
  }, {
    id: '2',
    name: 'Franek',
    friendsIds: ['1'],
    eventsIds: ['1']
  }, {
    id: '3',
    name: 'Zenek',
    friendsIds: [],
    eventsIds: ['1', '2']
  }],
  events: [{
    id: '1',
    name: 'WarsawJS',
    participantsIds: ['1', '2', '3']
  }, {
    id: '2',
    name: 'ReactWarsaw',
    participantsIds: ['2']
  }, {
    id: '3',
    name: 'AngularWarsaw',
    participantsIds: []
  }]
};

const getEvent = (id) => DATA.events.find(participant => participant.id === id);
const getParticipant = (id) => DATA.participants.find(event => event.id === id);
const addEvent = ({ id, name }) => {
  DATA.events.push({ id, name, participantsIds: [] });

  return getEvent(id);
};
const addParticipant = ({ id, name }) => {
  DATA.participants.push({ id, name, eventsIds: [], friendsIds: [] });

  return getParticipant(id);
};
const addParticipantToEvent = ({ participantId, eventId }) => {
  const participant = getParticipant(participantId);
  participant.eventsIds.push(eventId);
  getEvent(eventId).participantsIds.push(participantId);

  return participant;
};
const addParticipantFriend = ({ participantId, friendId }) => {
  const participant = getParticipant(participantId);
  participant.friendsIds.push(friendId);
  getParticipant(friendId).friendsIds.push(participantId);

  return participant;
};

export {
  addEvent,
  addParticipant,
  addParticipantToEvent,
  addParticipantFriend,
  getEvent,
  getParticipant
}
