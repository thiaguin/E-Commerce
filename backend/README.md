# Backend

## Description

This is as basic project to improve my skills. It's an API to serve the frontend simulating an e-commerce website.
The main tools used in this project:

-   [Typescript](https://www.typescriptlang.org/): The language adopted
-   [NestJS](https://nestjs.com/): A framework to make the server more efficient, reliable and scalable
-   [Docker](https://www.docker.com/): To containerize the database
-   [Postgres](https://www.postgresql.org/): A object-relational database thats use SQL
-   [Typeorm](https://typeorm.io/#/): The ORM to facilitate the creation and the queries on database

## Prerequisites

-   Docker
-   docker-compose
-   Nodejs >= v12.18.0

## Installation

```bash
# To create the database
$ docker-compose up --no-start


# To install dependecies
$ npm install
```

## Start database

```bash
# To install dependecies
$ docker-compose start
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

## Test (WIP)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

[MIT](LICENSE).
