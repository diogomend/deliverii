<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
<br/><br/>

# Deliverii Server
Rest API build with NestJS and MongoDB

## Dependencies
Needs to have MongoDB connection URL to be added to .env file. 
In this project it was created two databases in [MongoDB Atlas Cloud](https://cloud.mongodb.com/):
1. deliverii-db - database for normal functions of the app
2. deliverii-automation - database for automation e2e flow, in which we will dump all the dataset after each test suite

After creating these databases we will need also to create users to access them and extract the connection string for each collection in the format:

```
mongodb+srv://{user}:{password}@clusterdefault.1ari7.gcp.mongodb.net/{database-name}?retryWrites=true&w=majority
```

## Environment file
The app uses an .env file to store the environment variables. In the repository there's an .env.example file with the fields we are waiting for
```
APP_PORT=3000
APP_URL=http://localhost
MONGO_URI=
MONGO_AUTOMATION=
JWT_KEY=
JWT_EXPIRES=1d
```

Both MONGO_URI and MONGO_AUTOMATION correspond to the database connection string we mentioned above.
As for the JWT can be any string

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation - Swagger

Project has documentation available from Swagger in the root of the URL, for instance
```
http://localhost:3000/
```

## Documentation - Postman Collection 

Collection from Postman can be accessed in the following URL
```
https://www.getpostman.com/collections/d0772bc10d9b2f2fee8a
```

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
