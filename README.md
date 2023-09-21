# AgileGPT API

## Overview

- [**Demo Link**](https://bohdan-mykhailenko.github.io/ai_coach/)
- [**Frontend Repo**](https://github.com/bohdan-mykhailenko/ai_coach)

## Description

This repository contains the source code for the AgileGPt project, which serves as the backend side for the application.

## Features

**The API provides the following features:**

- **Get data:** Get history of user messages and AI responses.
- **Real-time data transferring **: Allow to send and get data in real-time.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Nest.js](https://nestjs.com/)
- [Socket.io](https://socket.io/)
- [Sequelize](https://sequelize.org/)
- [Sequelize CLI](https://sequelize.org/docs/v7/cli/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

To get started with the API, follow these steps:

1. Clone the repository:

```shell
https://github.com/<your-username>/ai_coach_backend.git
```

2. Install dependencies:

```shell
npm install
```

3. Set up PostgreSQL Database:
 - Open the `config/databse.config.ts` file and add your PostgreSQL database configuration.

```
export const db = {
  DB_HOST: 'host',
  DB_NAME: 'name',
  DB_USERNAME: 'username',
  DB_PASSWORD: 'password',
};
```

4. Run migration:

```shell
npm run migrate
```

5. Start the server:

```shell
npm run start:dev
```


## Endpoints

The base URL for the API is: **https://aicoachbackend-production.up.railway.app/**

<table>
    <tr>
        <th>
        	Method
        </th>
        <th>
        	Endpoint
        </th>
        <th>
        	Description
        </th>
        <th>
        	Body
        </th>
    </tr>
    <tr>
        <td>
        	GET
        </td>
        <td>
        		/messages
        </td>
        <td>
        	Get all messages.
        </td>
        <td>
        	NULL
        </td>
    </tr>
</table>
