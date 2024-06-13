# Localize Translation Search

This project allows users to search for phrases and their translations.

## Project Structure

The project is setup as a monorepository, which means the project consists of individually maintained `packages`:

- `packages/api`: A RESTful API to query phrases and their translations.
- `packages/common`: A library that is shared between the API and the web application.
- `packages/web`: A web application to allow users to view and search phrases.

** Update after finishing the API + sorting + unit tests: The frontend was unable to be created since I set a hard stop after a few hours. If I had extra time, I would've created the frontend using React with TypeScript and Tailwind for styling. I would've created a custom hook to handle interactions with the API, integrating the types from `packages/common`. An alternative to a custom hook would be using a library such as `@tanstack/react-query` which has the benefit of a built-in caching mechanism and query invalidation, as well as debouncing to prevent every change in the search bar from sending a new query.

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

## API Endpoints

### Get Phrase by ID
Retrieves a phrase object by its ID, without the translations

  - GET `/phrase/:id`

**Query Parameters:**
  - `id` (int): The ID of the phrase object

### Get Phrase Translation by Language

Retrieves the translation of a phrase in a specific language.

  - GET `/phrase/:id/:language`

**Query Parameters:**
  - `id` (int): The ID of the phrase object
  - `language` (string): The key of the language for the translations (e.g. `es` or `fr`)

### Get Phrases by Search

Retrieves phrases that match a search query and are sorted according to a specified sort order.

  - GET `/phrase/search`

**Query Parameters:**
  - `query` (string, optional): The search query for phrases.
  - `sort` (string, optional): The sort order in the format `key:asc|desc`, where `key` can be one of `phrase`, `status`, `createdAt`, or `updatedAt`.
