# Localize Translation Search

This project allows users to search for phrases and their translations.

## Project Structure

The project is setup as a monorepository, which means the project consists of individually maintained `packages`:

- `packages/api`: A RESTful API to query phrases and their translations.
- `packages/common`: A library that is shared between the API and the web application.
- `packages/web`: A web application to allow users to view and search phrases.

*Note: In a production application, each package would have their own git repository and be tracked as a git submodule within the monorepository. For time sake, I will be leaving that out.*

*For a production application, a database should be used to store the phrase objects. For demonstration, the data will be stored in a JSON file.*

## Requirements

The project requires the following tools to run:

- [Node.js](https://nodejs.org) - Node.js is the runtime environment for the application.
- [Yarn](https://yarnpkg.com/getting-started) - Yarn is a package manager which natively supports monorepositories.
- [Corepack](https://yarnpkg.com/corepack) - This is included with Node.js but might not be enabled:
  - Open a terminal and run `corepack enable`

## Running the application

1. Install the dependencies:
  - In a terminal, run `yarn install`

2. Build the `common` package:
  - In a terminal, run `cd packages/common && yarn build`

3. Run the API:
  - In a terminal, run `cd packages/api`
  - For development:
    - Run `yarn dev`
  - For production:
    - Run `yarn build && yarn start`
  - The API should now be running at `http://locahost:3000`

## Running the tests

The API contains unit tests using [Jest](https://jestjs.io/)

- Run the tests with `cd packages/api && yarn test`

