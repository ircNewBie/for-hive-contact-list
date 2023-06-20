
# Contact List App

This is the README file for the Contact List App project. The Contact List App is a web-based application that allows users to manage their contacts, connect with friends, and maintain a personalized contact list.

## Deployment

The Contact List App is deployed on Vercel. 

The frontend is deployed at [https://4hive-clist-fe.vercel.app/](https://4hive-clist-fe.vercel.app/) in the production environment, and the backend is deployed at [https://hi-clist-be.vercel.app/](https://hi-clist-be.vercel.app/) in the production environment.

## Automatic Deployment and Preview Builds
As part of the development workflow, the Contact List App has an automated deployment process and a pipeline for preview builds.

### Automatic Deployment: 
Every new merge to the master branch in the GitHub repository triggers an automatic deployment process. This ensures that the latest changes in the master branch are deployed to the production environment.

### Preview Builds: 
For each merge request, a pipeline is created to build and test the changes in a preview environment. This allows for testing the build's success or failure before merging it into the master branch.

The automatic deployment and preview build processes help ensure that only stable and tested changes are deployed to the production environment, reducing the risk of introducing bugs or issues.

## Technologies Used

The Contact List App is built using the following technologies:

### Frontend

- ReactJS: A JavaScript library for building user interfaces.
- Axios: A library for making HTTP requests to the backend API.
- React Query: A data fetching and caching library for managing state and data synchronization.
- Ant Design: A UI component library for React.

### Backend

- Node.js: A JavaScript runtime for server-side development.
- Express: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing user data, contact information, and friend relationships.

## Scripts

To start the app locally, use the following scripts:

### Backend Scripts

- `tests`: Runs the backend tests using Mocha and Chai.
- `start`: Starts the backend server.
- `dev`: Starts the backend server with nodemon for development.
- `seed`: Seeds the database with initial data (if applicable).

### Frontend Scripts

- `start`: Starts the frontend development server.
- `build`: Builds the frontend for production.

## Environment Variables

For the backend, the following environment variables are required:

```
TOKEN_SECRET= <your secret key>
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB=<db-name>
MONGODB_TEST_DBASE=<db-name>

# Uncomment below line if you want to use the database at MongoAtlas
# MONGODB_URI_STAGING= <your-mongodb-atlas-connection-string>
```

Please ensure that these environment variables are properly configured before running the backend.

## Testing

Testing is implemented for the backend using Mocha and Chai. 

To run the backend tests, use the `tests` script.

Please note that frontend testing has not been implemented in this version of the Contact List App.
