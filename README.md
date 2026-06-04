# Pro-Tasker Backend

## Overview

Pro-Tasker Backend is a RESTful API built with Node.js, Express, MongoDB, and Mongoose. It provides secure user authentication and project/task management functionality for the Pro-Tasker productivity application.

The API supports user registration, login, JWT-based authentication, project management, and task tracking while ensuring users can only access and modify their own data.

---

## Features

### Authentication

* User registration
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

* JWT authentication middleware
* User ownership validation
* Password hashing using bcrypt
* Protected routes
* MongoDB ObjectId validation

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* dotenv
* cors

---

## API Endpoints

### Authentication

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| POST   | /api/users/register | Register a new user            |
| POST   | /api/users/login    | Authenticate user              |
| GET    | /api/users/profile  | Get authenticated user profile |

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

| Variable    | Description                    |
| ----------- | ------------------------------ |
| MONGODB_URI | MongoDB connection string      |
| JWT_SECRET  | Secret used to sign JWT tokens |
| PORT        | Server port                    |

---

## Example Authentication Header

Protected routes require a Bearer token:

```http
Authorization: Bearer <jwt_token>
```

---

## Project Structure

```text
config/
models/
routes/
  api/
utils/
server.js
```

---

## Future Enhancements

* Task due dates
* Task priorities
* Project completion statistics
* Task filtering and sorting
* User profile management
* Team collaboration features

---

## Author

Keoki Stevenson

Capstone Project – Software Engineering Program
