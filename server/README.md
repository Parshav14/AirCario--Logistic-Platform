# Logistics Platform Server

This is the backend server for the Logistics Platform.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root of the server directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/logistics-platform
   JWT_SECRET=your_jwt_secret
   REDIS_URL=redis://localhost:6379
   ```

3. Start the server:
   ```
   npm run dev
   ```

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the server in production mode.
- `npm run dev`: Runs the server in development mode with nodemon.
- `npm test`: Runs the test suite.

## API Documentation

For detailed API documentation, please refer to the `docs` folder or run the server and visit `/api-docs` endpoint.

## Learn More

For more information on the technologies used:

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Redis](https://redis.io/)
- [Socket.IO](https://socket.io/)