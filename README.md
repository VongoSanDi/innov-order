## Description
Step by step guidance to install and run the API 

## Installation
We need NodeJs for the server & Vite the client

```bash
$ npm install
```

## Database SetUp
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
- POST    `auth/login`        login to get access to /GET food-facts:barcode and /PATCH users:login
- POST    `users`        add new user
- GET     `users`	            get all Users
- PATCH   `users/:login`         update user by login
- GET     `food-facts:barcode`	            get a product by barcode
### Users
```
# GET
# @Param - login: string

users/:login
```
```
# PATCH
# JWT-PROTECTED
# @Param - login: string
# @Body - (optional params) {login: string, currentPassword: string, newPassword: string}

users/:login

# POST
# @Body - {login: string, password: string}
```

### Auth

```
# POST
# @Param - {login: string}
# @Body - {login: string, password: string}

auth/login
```

### Food-Facts
```
# GET
# JWT-PROTECTED
# @Param - {barcode: string}

food-facts/:barcode
```


## License

Nest is [MIT licensed].
