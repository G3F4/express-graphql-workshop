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

export {
  getEvent,
  getParticipant
}
