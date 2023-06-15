# Chat frontend

Frontend chat application using websockets

###### Backend [https://github.com/kubahrom/chat_backend](https://github.com/kubahrom/chat_backend)

## Stack

React, Next.js, Tailwind, Typescript

## Setup

Firstly, you will have to setup the .env file. Copy the .env.example file and update the variables. If running on localhost with backend then you don't have to update anything.

```
NEXT_PUBLIC_API_URL= URL adress to API server
NEXT_PUBLIC_WEBSOCKET_URL= URL address to websocket server
```

To start up the project run

```BASH
npm install
```

to install all project dependencies and

```BASH
npm run dev
```

to run locally.
