# blog-project-api
A Dental departures assessment project

## Prerequisites

Before running the project API, make sure you have the following prerequisites installed on your system:

- Node.js (version 18.16.0 or higher)
- Docker (for MongoDB and Redis services)

## Project directory structure
```
blog-project-api/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── blog.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── models/
│   │   ├── blog.model.ts
│   │   └── user.model.ts
│   ├── routes/
│   │   ├── blog.routes.ts
│   │   ├── user.routes.ts
│   │   └── routes.ts
│   ├── services/
│   │   ├── blog.service.ts
│   │   └── user.service.js
│   ├── tests/
│   │   ├── auth.test.ts
│   │   ├── blog.test.ts
│   │   └── user.test.ts
│   ├── types/
│   │   └── type.ts
│   ├── utils/
│   │   └── response.ts
│   └── app.ts
├── .env.example
├── .eslintrc.json
├── jest.config.js
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── .README.md
└── tsconfig.json
```

## Getting Started

To get started with the project API, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/otaru-rich/blog-project-api.git
   ```

2. Install the dependencies:

   ```bash
   cd blog-project-api
   npm install
   ```

3. Set up the environment variables:

    - Create a `.env` file in the root directory of the project. (`.env.example` file is provided)
    - Define the required environment variables in the `.env` file. For example:

      ```dotenv
      PORT=9000
      DB_URI=localhost:3306/medical_departures_db
      JWT_SECRET=mysecretkey
      ```

      Replace the values with your desired configuration.

4. Run the Docker container:

   ```bash
   docker-compose up -d
   ```

   The MySQL database will be started in a Docker container.

5. Start the API server:

   ```bash
   npm start
   ```

   The server will start running on the specified port (default is 9000) and connect to the MySQL database.

6. The API is now ready to accept requests. You can use Postman or cURL to make HTTP requests to the API endpoints.

## API Documentation

## Contact

For any inquiries or support, please contact [Richard Otaru](mailto:richotaru@gmail.com).
