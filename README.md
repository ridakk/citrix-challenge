# MUTE ‘EM ALL
Your task is to attend a conference call with 99 person

All tend to talk much not even one by one

Only way to handle the session is to MUTE THEM ALL!!!

When buttons turn red, it is time to hit them

But some of them are not easy to mute, you may need to mute them multiple times

And one more thing, don't forget that you are also in the same list

If you mute your self.... GAME OVER

## Tech Stack
- [x] Webpack
- [x] React
- [x] Material-ui
- [x] ES6 & Babel

## Installation
After cloning the repository, install dependencies:

```sh
cd <project folder>/citrix-challenge
npm install
```

## Development
### API

```sh
npm run api-dev
```

### UI
Now you can run your local server:

```sh
npm start
```

Server is located at [http://localhost:3000](http://localhost:3000)

API and UI webpack configuration are seperate so if you change anything in api then you have kill ui-dev task and re-run it.

## Production

```sh
npm run build
```

You can find production files under /src/ui/dist

## TODOS - API & UI

* unit tests are missing for both api and ui
* used a singleton service to share session object between pages in ui
  but Redux can solve that more properly
* need to figure out a way to run two webpack watch tasks on two different folder simultaneously
* JSDOC generation for api

## TODOS - Citrix Mock api

* Need to use secure protocols: HTTPS & WSS
* /api/session/join is synchronous. Synchronous XMLHttpRequest on the main thread is deprecated
* no correlation between session and attendee REST resources, /api/attendee resource should be sub-resource of /session
* Reponses contain 'X-Powered-By:Express', this is exposing tech stack of server [Check Expressjs Security](http://expressjs.com/en/advanced/best-practice-security.html)
* For invalid JSON in request body, response contains stack trace
