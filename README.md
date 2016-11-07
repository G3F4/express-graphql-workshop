# WELCOME TO EXPRESS GRAPHQL WORKSHOP!

This repository contains full walkthrough creating GraphQL Server.

Technologies used:

<img height="200" width="200" src="http://graphql.org/img/logo.svg">
<img height="200" width="200" src="http://d3t0dn7puh4fxw.cloudfront.net/wp-content/uploads/2015/09/expressjs.jpg">
<img height="200" width="200" src="https://avatars2.githubusercontent.com/u/9637642?v=3&s=200">

Proceed with steps below.

# STEPS

## Start work from particular step

You can clone repo and checkout to commit with particular step

    $ git clone https://github.com/G3F4/express-graphql-workshop.git
    $ cd express-graphql-workshop
    $ git reset --hard $changeId
    
... or do everything step by step :)

## Initial project set up

1. Create project folder.

        $ touch express-graphql-workshop
        $ cd express-graphql-workshop

2. Initialize npm.

        $ npm init

3. Install `babel-register` and `babel-preset-es2015` with npm saving dependencies(to use es2015+ features).

        $ npm i babel-register --save
        $ npm i babel-preset-es2015 --save

4. Create the entry file `index.js` in root folder and within:

        $ touch index.js

5. and within use require to import `babel-register`(creates hook):

        require('babel-register')({
          "presets": ["es2015"]
        });

[commit](https://github.com/G3F4/express-graphql-workshop/commit/a0d1ca893d0447c6f5214c1d9d7940633c9034d5)

## Create express server

1. Install `express` with npm and save flag and create `server.js` file ...

        $ npm i express --save
        $ touch server.js

2. ... and within:
    * import `express`
    
        ```js
        import express from 'express';
        ```

    * define port number
    
        ```js
        const PORT = 30001;
        ```

    * create `express` application and start to listening
        ```js
        express()
          .listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
        ```

3. In `index.js` require `server.js`:

        require('./server.js');

5. Add script starting server to `package.json`.

        "dev": "node index.js"

6. Start server.

        $ npm run dev

[commit](https://github.com/G3F4/express-graphql-workshop/commit/e717e162dc3c1df9a66a6d8130e05a8493e36865)

## Adding GraphQL

1. Using npm install `graphql` and `express-graphql`([Lee Byron](https://github.com/leebyron) Express app [setup for graphql server](https://github.com/graphql/graphql-js)).
    ```bash
	$ npm i graphql express-graphql --save
	```

2. Create `graphql` folder and `schema.js` file in it.
    ```bash
	$ mkdir graphql && cd graphql
	$ touch schema.js
	```

3. In `schema.js`:
    * import basic types needed to create test schema
    ```javascript
    import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
    ```

    * create new `schema` with single field `test` of string type, resolving static literal
    ```javascript
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'query',
        fields: {
          test: {
            type: GraphQLString,
            resolve: () => 'test'
          }
        }
      })
    });
    ```

    * export `schema`
    ```javascript
    export default schema;
    ```

4. In `server.js`:
    * import `express-graphql` and `schema`
    ```javascript
    import graphqlHTTP from 'express-graphql';
    import schema from './graphql/schema';
    ```

    * use `express-graphql` to process query document on `/graphql` route
    ```javascript
    express()
      .use('/graphql', graphqlHTTP({ schema, graphiql: true }))
      .listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
    ```
    
5. Open browser on localhost:30001 and query for test field!

[commit](https://github.com/G3F4/express-graphql-workshop/commit/3d1e64a71ecdbda9844c583a621a1c658f7d8cbe)

## Adding query to schema

1. Create `query.js` file in `graphql` folder.
    ```bash
	$ cd graphql
	$ touch query.js
	```

2. In `query.js`:
    * import necessary
    ```javascript
    import { GraphQLObjectType, GraphQLString } from 'graphql';
    ```

    * create `schema` with two fields: `participant` and `event` of string type resolving static string for now.
    ```javascript
    const query = new GraphQLObjectType({
      name: 'Query',
      fields: {
        participant: {
          resolve: () => 'participant',
          type: GraphQLString,
        },
        event: {
          resolve: () => 'event',
          type: GraphQLString,
        }
      }
    });
    ```

    * export `query`
    ```javascript
    export default query;
    ```

3. In `schema.js`:
    * reduce imports from `graphql` and import `query`
    ```javascript
    import { GraphQLSchema } from 'graphql';
    import query from './query';
    ```

    * change `schema` definition to use imported `query`
    ```javascript
    const schema = new GraphQLSchema({ query });
    ```

[commit](https://github.com/G3F4/express-graphql-workshop/commit/633c83fdc7330954474b5a11e5ba239940ced32b)

## Adding types to schema

1. Create `types` subfolder in `graphql` folder. Then create `event-type.js` and `participant-type.js` files in it.
    ```bash
	$ cd graphql
	$ mkdir types && cd touch
	$ touch event-type.js participant-type.js
	```

2. In `event-type.js"`
    * import necessary `GraphQL` types and `ParticipantType`(we will use it to resolve event participants)
    ```javascript
    import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
    import ParticipantType from './participant-type';
    ```

    * create new type with 3 fields:
        * `id` of ID type, resolving static literal for now
        * `name` of string type, resolving static literal for now
        * `participants` type of list of `ParticipantType`, resolving array with empty string for now
    ```javascript
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
    ```

    * export `EventType`
    ```javascript
    export default EventType;
    ```

3. Do the same for `ParticipantType` with fields(import `EventType` instead of `ParticipantType`):
    * `id` of ID type, resolving static literal for now
    * `name` of string type, resolving static literal for now
    * `friends` type of list of `ParticipantType`, resolving array with empty string for now
    * `events` type of list of `EventType`, resolving array with empty string for now
    ```javascript
    import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from 'graphql';
    import EventType from './EventType';

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

    export default `ParticipantType`;
    ```

4. In `query.js`:
    * import created types
    ```javascript
    import EventType from './types/EventType';
    import ParticipantType from './types/ParticipantType';
    ```

    * use them in `query` as fields types
    ```javascript
    const query = new GraphQLObjectType({
      name: 'Query',
      fields: {
        participant: {
          resolve: () => 'participant',
          type: ParticipantType,
        },
        event: {
          resolve: () => 'event',
          type: EventType,
        }
      }
    });
    ```

[commit](https://github.com/G3F4/express-graphql-workshop/commit/a5a459c7bdf8a78cc5cb4294e198cd9b0d2a0d27)

## Understanding fields resolve method (root and arguments)

1. In `query.js`:
    * import neseccary types from `graphql`
    ```javascript
    import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
    ```
    * add arguments to fields(the same for both `participant` and `event`)
    ```javascript
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString }
    }
    ```

    * add `root` and `args` arguments to resolve methods and return `args`
    ```javascript
    resolve: (root, args) => args,
    ```

2. Next in `EventType.js`:
    * add "root" and "args" arguments to resolve methods
    * the "root" argument has value returned from parent in schema
     in this case the "event" field which is returning it's args
     for scalar(primitive) fields return corresponding value from root
     for list return table with root value
    ```javascript
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
    ```

3. Do the same thing for `ParticipantType`.
    ```javascript
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
    ```

[commit](https://github.com/G3F4/express-graphql-workshop/commit/e5428e38c01f9418eef47cfc21b3c60fae320ee9)

## Adding fakeApi to serve dummy data

1. Create new file in root directory `fake-api.js`.
    ```bash
    touch fake-api.js
    ```

2. We need two lists: one for events and one for participants.
    * event item in events list should be structured like below:
    ```javascript
    {
      id: String // event id
      name: String // event name
      participantsIds: List(String) // list of participants ids
    }
    ```

    * participant item in participants list should be structured like below:
    ```javascript
    {
      id: String // event id
      name: String // event name
      eventsIds: List(String) // list of events ids
      friendsIds: List(String) // list of friends ids
    }
    ```

3. Inside `fake-api.js`:
    * declaring dummy data
    ```javascript
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
    ```

    * declare functions returning proper `event` and `participant` by `id`
    ```javascript
    const getEvent = (id) => DATA.events.find(participant => participant.id === id);
    const getParticipant = (id) => DATA.participants.find(event => event.id === id);
    ```

    * export functions
    ```javascript
    export {
      getEvent,
      getParticipant
    }
    ```

4. Use `fake-api` in `query.js`:
    * import `fake-api` functions
    ```javascript
    import { getEvent, getParticipant } from '../fake-api';
    ```

    * use them to resolve value for `event` and `participant` fields, passing `id` from `args` argument
    ```javascript
    participant: {
      ...
      resolve: (root, args) => getParticipant(args.id),
      ...
    },
    event: {
      ...
      resolve: (root, args) => getEvent(args.id),
      ...
    }
    ```

5. In `event-type.js`:
    * import getParticipant
    ```javascript
    import { getParticipant } from '../../fake-api';
    ```

    * in `participants` field resolve method use `getParticipant` while mapping through `participantIds` from root value
    ```javascript
    resolve: (root) => root.participantsIds.map((id) => getParticipant(id))
    ```

5. In `participant-type.js`:
    * import `getParticipant` and `getEvent`
    ```javascript
    import { getParticipant, getEvent } from '../../fake-api';
    ```

    * in `event` field resolve method use `getEvent` while mapping through `eventIds` from root value
    ```javascript
    resolve: (root) => root.eventsIds.map(id => getEvent(id))
    ```

    * in `friends` field resolve method use `getParticipant` while mapping through `friendsIds` from root value
    ```javascript
    resolve: (root) => root.friendsIds.map(id => getParticipant(id))
    ```

[commit](https://github.com/G3F4/express-graphql-workshop/commit/c38876b777e1322663498dffdfa4c244c8c7b992)
