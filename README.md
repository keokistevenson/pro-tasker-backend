# TaskMaster Backend API

A secure RESTful backend API for managing projects and tasks with JWT authentication and ownership-based authorization.

---

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Project CRUD operations
- Task CRUD operations
- Ownership-based authorization
- MongoDB database with Mongoose relationships

---

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Tokens (JWT)
- dotenv

---

## Installation

Clone the repository:

```bash
git clone YOUR_REPO_URL
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

Start the server:

```bash
npm run dev
```

---

## API Routes

### Users

| Method | Route | Description |
|---|---|---|
| POST | /api/users/register | Register user |
| POST | /api/users/login | Login user |
| GET | /api/users/profile | Get logged-in user profile |

### Projects

| Method | Route | Description |
|---|---|---|
| POST | /api/projects | Create project |
| GET | /api/projects | Get all user projects |
| GET | /api/projects/:id | Get one project |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |

### Tasks

| Method | Route | Description |
|---|---|---|
| POST | /api/projects/:projectId/tasks | Create task |
| GET | /api/projects/:projectId/tasks | Get project tasks |
| PUT | /api/tasks/:taskId | Update task |
| DELETE | /api/tasks/:taskId | Delete task |

---

## Authentication

Protected routes require a JWT in the Authorization header:

```txt
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Authorization

Users can only access projects they own.

Task updates and deletions require ownership verification of the parent project.

---

## Testing

All endpoints were tested using Postman.

Security testing included:

- Accessing protected routes without a token
- Attempting cross-user access
- Ownership authorization validation

---

## Future Improvements

- Task due dates
- User roles
- Pagination
- Search/filtering
- Refresh tokens

## Conclusions
We weren't told to create a README in the assignment. For a project such as this I thought it was better to have a nicer README than my random comments. I thought I'd see what AI would do. I learned something here and may use it in future projects for a more extensive README. Much of this stuff i would have never thought to put in a README.