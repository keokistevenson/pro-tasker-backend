# Pro-Tasker Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge&logo=gmail&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-003B57?style=for-the-badge)

## Overview

Pro-Tasker Backend is a RESTful API built with Node.js, Express, MongoDB, and Mongoose. It provides secure user authentication and project/task management functionality for the Pro-Tasker productivity application.

The API supports user registration, login, JWT-based authentication, project management, and task tracking while ensuring users can only access and modify their own data.

---

## Architecture

```text
React Frontend
      |
      | JWT Auth / REST API
      v
Express Backend
      |
      +--> Email Verification
      |
      v
MongoDB Database
```

The backend API handles authentication, authorization, project data, task data, and email verification logic. The frontend consumes the API through protected routes and user-specific requests.


---
## Related Repositories

### Frontend Application

[Pro-Tasker Frontend](https://github.com/keokistevenson/pro-tasker-frontend)

The frontend repository contains the React and TypeScript client application that communicates with this backend API.


---

## Features

### Authentication

* User registration
* Email verification
* User login
* Password hashing with bcrypt
* JSON Web Token (JWT) authentication
* Protected API routes

### Project Management

* Create projects
* View all user projects
* View a single project
* Update project information
* Delete projects

### Task Management

* Create tasks
* View project tasks
* View individual tasks
* Update task information and status
* Delete tasks

### Security

* Password hashing with bcrypt
* JWT-based authentication
* Protected backend routes
* Backend authorization middleware
* User-specific project ownership validation
* User-specific task authorization
* Email ownership verification
* Environment variables for sensitive credentials


---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* dotenv
* Nodemailer
* cors

---

## API Endpoints

### Authentication

| Method | Endpoint                 | Description                    |
| ------ | ------------------------ | ------------------------------ |
| POST   | /api/users/register      | Register a new user            |
| POST   | /api/users/login         | Authenticate user              |
| GET    | /api/users/profile       | Get authenticated user profile |
| GET    | /api/users/verify-email  | Verify user email              |

### Projects

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | /api/projects     | Get all projects   |
| POST   | /api/projects     | Create project     |
| GET    | /api/projects/:id | Get single project |
| PUT    | /api/projects/:id | Update project     |
| DELETE | /api/projects/:id | Delete project     |

### Tasks

| Method | Endpoint                       | Description       |
| ------ | ------------------------------ | ----------------- |
| POST   | /api/projects/:projectId/tasks | Create task       |
| GET    | /api/projects/:projectId/tasks | Get project tasks |
| GET    | /api/tasks/:taskId             | Get single task   |
| PUT    | /api/tasks/:taskId             | Update task       |
| DELETE | /api/tasks/:taskId             | Delete task       |

---

## API Testing

### User Registration

Registers a new user account and sends a verification code to the user's email address.

![User Registration](images/user-registration.png)

---

### User Authentication

Authenticates a registered user and returns a JSON Web Token (JWT) for accessing protected routes.

![User Authentication](images/user-authentication.png)

---

### Project Creation

Creates a new project associated with the authenticated user account.

![Project Creation](images/project-creation.png)

---

### Task Creation

Creates a task within a specific project and associates it with that project.

![Task Creation](images/task-creation.png)

---

### Route Protection

Protected routes require a valid JWT token. Requests without authentication are denied.

![Unauthorized Request](images/unauthorized-request.png)

---

### User-Specific Authorization

Users can only access projects they own. Attempting to access another user's project returns a "Project not found" response, preventing unauthorized access to project data.

![User-Specific Authorization](images/user-specific-authorization.png)

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd pro-tasker-backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000

EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
EMAIL_FROM=your_email_address
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

## Environment Variables

| Variable    | Description                          |
| ----------- | ------------------------------------ |
| MONGODB_URI | MongoDB connection string            |
| JWT_SECRET  | Secret used to sign JWT tokens       |
| PORT        | Server port                          |
| EMAIL_USER  | Email account used by Nodemailer     |
| EMAIL_PASS  | Email app password                   |
| EMAIL_FROM  | Sender email address                 |

---

## Example Authentication Header

Protected routes require a Bearer token:

```http
Authorization: Bearer <jwt_token>
```

---

## Project Structure

```text
.env
.env.example
README.md
config
config/connection.js
models
models/Project.js
models/Task.js
models/User.js
models/index.js
package.json
routes
routes/api
routes/api/index.js
routes/api/projectRoutes.js
routes/api/taskRoutes.js
routes/api/userRoutes.js
routes/index.js
server.js
utils
utils/auth.js
utils/emailService.js

```

### Folder Descriptions

| Folder    | Purpose                             |
| --------- | ----------------------------------- |
| config    | Database connection configuration   |
| models    | Mongoose schemas and models         |
| routes    | API endpoints and route handlers    |
| utils     | Authentication and helper utilities |
| server.js | Application entry point             |


---

## Future Enhancements

* Task due dates
* Task priorities
* Project completion statistics
* Task filtering and sorting
* User profile management
* Team collaboration features
* Mobile application support

---

## Author

Keoki Stevenson

Capstone Project – Software Engineering Program
