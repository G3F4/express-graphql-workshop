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
