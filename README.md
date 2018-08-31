# chat_app
Chat application similar to slack

# Installation
There are two folders are as follows
1. server - It contains all the server side code which is design by using ExpressJS framework and socket implementation for the chat
2. client - It contains all the ReactJS codebase for the chat application implementation by using basic boilerplate.

# Commands
After git clone this repository
```
$ cd server
$ npm install
$ cd client
$ npm install
```

If you want to seed data then you need to run following commands in sequence.
1. Seed users
```
$ node db_seeds/userSeed.js
```
2. Seed conversations
```
$ node db_seeds/conversationSeed.js
```
Once installaiton has been done with npm modules for both project. You need to run server and chat application by using following commands

1. For server application
```
$ cd server
$ PORT=3001 NODE_ENV=development nodemon ./bin/www
```
2. for client application
```
$ cd client
$ npm start
```

It will run server at Port = 3001 and run client application by using Port = 3000; you can check client application hit following URL: http://localhost:3000/

You can hit API by using following URL: http://localhost:3001/api/v1

# Demo users
1. dummy_user_1@test.com/123456
2. dummy_user_2@test.com/123456

If you face any issue or encounter bug please open issue with screenshot

