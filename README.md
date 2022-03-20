This repo presents the results of the Kiwi Coding Challenge.

## Localhost development

Requirements (recommended as system-wide packages):

- Python 3.10+ and `pipenv`
- Node.js 14.0+ and `yarn`
- GNU `make` and `gcc`
- `docker` and `docker-compose`

Having that installed, clone this repo and run:

    make install_deps

It will install all the required dependencies.

Then, open three terminal tabs and run:

- `docker-compose up postgres redis` — for databases
- `make dev_server` — for API server
- `make dev_webapp` — for front-end web application

Visit <http://localhost:8300> to open the app.

## Run in Docker

As an alternative, you can run the whole stack in Docker as well:

     docker-compose up

Two thousand years later… Visit <http://localhost:8300> to open the app.

## Known issues

Nothing is perfect, and time is always pushing. It won’t be a shame to call the project's current state an MVP, but clearly, there are things to consider. The following list shows them by an arguable priority:

- [ ] The model layer is missing. Data structures used for client and server communication are closely resemble the database schema. It introduces coupling that would be hard to manage as the project grows. An explicit communication schema, DTOs, and models have to be established.
- [ ] A system that pretends to be run in production and evolve should be covered with unit tests to make further changes safer and ensure edge-cases are correctly handled.
- [ ] There’s no adequate handling of missing servers or a server with a slow connection. A user will see an infinite progress bar or an inadequate empty UI in some scenarios.
- [ ] IO-bound UI transitions are missing. Some actions like authorizing a user to use a door are blazing-fast on localhost but won’t be so in production. Some UI feedback is required but yet to be implemented.
- [ ] Multiple permissions for the same door and user are possible. This can be worked around, but basically, it is a problem of the current DB schema constraints (absence of thereof).
- [ ] ESLint should be employed, but I skipped this step¹.
- [ ] The revoke access button should be vivid red; it should ask for confirmation. Yeah, my battery went low to do such a trivial thing, sorry.
- [ ] The whole picture of a user seeing all door locks randomly (as seen by a human) is suspicious. What’s the purpose? What are the problems a user is trying to solve? Does he actually need to look at a table? I suspect there’s a big subject for data filtering and a need to discuss a UX.

¹ I’ve used plain JavaScript as the common point of the web development. Real projects are better done with something more robust than plain JS; TypeScript, for example, is a better choice. I’d go with ReScript because it gives the results! But it isn’t a mainstream tool, so if ReScript is not welcomed, TypeScript is OK.
