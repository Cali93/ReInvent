# ReInvent Web App

### A Web App made with:

- ReactJS as a front-end SPA framework
- Material-UI as a front-end components library following the Material Design rules
- NodeJS and Express with GraphQL (Apollo-server-express)
- Sequelize as an ORM to interact with our relational database (eg: MySQL, or PostgreSQL)

### Prerequisites:
You'll need to:
- Have a Redis instance up and running on localhost:6379
- Have a relational DB, you can create one here for testing purposes: [Free PostreSQL instance](https://www.elephantsql.com/)
- [Generate Google OAUTH2 credentials](https://developers.google.com/identity/protocols/OAuth2) and place them inside your .env file

### Running the project on development 
1. `cd` inside ReInvent-API & ReInvent-FRONT and run `yarn install` inside both directories
2. Inside the API, create a .env file based on the .env.example
3. Inside the API, run `yarn db:seed` to populate the db with mocked data
4. run `yarn start:dev` inside ReInvent-API
5. check [your GraphQL API Playground explorer](http://localhost:5000/graphql), your api should be running
6. run `yarn start` inside ReInvent-FRONT
7. check [your React App](http://localhost:3000), your app should be running

