## Innov-order
Thanks to The Project Crew for the idea and the exercice

## Description
Step by step guidance to install and run the API 

## Installation
We need NodeJs for the server & Vite the client

```bash
$ npm install
```

## Database Setup
I used MongoDB for the database, it runs on a container.

First log in inside, then switch to the non-existing database Users
```html
$ docker exec -it mongodb mongo
$ use Users
$ exit
```
Then run the container
```html
$ docker compose up --build
```

## Running the server
```html
$ npm run start
```

## Running the client
```html
$ npm run dev
```
## Test

```bash
# unit tests
$ npm run test
```

## Environment Variables
This project requires some environment variables in order to function -
```dotenv
# Endpoint of the public api
FOODFACTS_ENDPOINT="https://world.openfoodfacts.org"

# Key used to hash Jwt
JWT_SECRET="your_secret_key"
```
## Routes
This is the available routes
- POST    `auth/login` -> login to get access to /GET food-facts:barcode and /PATCH users:login
- POST    `users` -> add new user
- GET     `users` -> get all Users
- PATCH   `users/:login` -> update user by login
- GET     `food-facts:barcode` -> get a product by barcode

### Auth
```
auth/login
# POST
# @Param - {login: string}
# @Body - {login: string, password: string}
```

### Users
```
users/:login
# GET
# @Param - login: string
```

```
users/:login
# PATCH
# JWT-PROTECTED
# @Param - login: string
# @Body - (optional params) {login: string, currentPassword: string, newPassword: string}

```

```
users/
# POST
# @Body - {login: string, password: string}
```


### Food-Facts
```
food-facts/:barcode
# GET
# JWT-PROTECTED
# @Param - {barcode: string}
```

## Swagger
You can access swagger once the server is launched via the url: http:/localhost:3000/api

## Schema validation
I used zod for the schema validation for more security, maybe overkill for this project but it was the first time I used it and will keep using it from now on
Documentation: https://zod.dev

## License

Nest is [MIT licensed].
