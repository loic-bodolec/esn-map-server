# Consultant Management API Grouped by Client for an IT Services Company (ESN)

This API allows managing consultants, grouped by client, within a mapping application. It provides functionalities to create, read, update and delete consultants and/or clients, accessible to authenticated users (with roles: regular user or administrator).

## Installation

- Clone this repository.
- Configure your `.env` file by filling in the details from `.env.example` (including the credentials for the first default "admin" user).
- Run `npm install` to install dependencies.
- Run `npm run start:dev` to start the server.

## Tests

Run `npm test` to execute unit tests.

## Database Migration

After creating an empty database in PostgreSQL, run:

- `npm run migration:create-dev`
- `npm run migration:generate-dev`
- `npm run migration:run-dev`

### Database Schema Diagram (MPD)

![MPD](/readme-images/mpd-bdd-20250130.png)

## API Documentation (Swagger)

Run `npm run start:dev` to start the server.

=> API documentation link: <http://localhost:5000/api-docs/>

## Practical Information

To test the API after logging in (via Postman, Insomnia, ThunderClient, or other tools), retrieve the token and include it in the Header:

![API Login](/readme-images/login.png)

![Token in Header](/readme-images/getClient.png)

## Frontend Repository

The frontend repository is available at: [esn-map-client](https://github.com/loic-bodolec/esn-map-client)
