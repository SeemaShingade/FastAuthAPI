# FastAuthAPI

A simple authentication API using Fastify (Node.js) with support for:
- User registration & login
- OAuth login via **Google** and **GitHub**
- PostgreSQL as the database
- JWT-based authentication

---

## 📦 Tech Stack

- **Backend:** Fastify (Node.js)
- **Database:** PostgreSQL
- **Auth:** JWT + OAuth (Google, GitHub)

---

## 🛠️ Prerequisites

- Node.js (v16+)
- PostgreSQL (v14+)
- Google/GitHub OAuth credentials

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone <repo-url>
cd project-root
```
### 2. Install Dependencies
```bash
npm install
```

## 🗄️ Setup PostgreSQL Database
 Make sure PostgreSQL is installed and running.

### 1. Create a new database:
```bash
CREATE DATABASE fastify_auth;
```
### 2. Run the following SQL to create the users table:
```bash
CREATE TYPE provider AS ENUM ('local', 'google', 'github');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  type provider NOT NULL,
  provider TEXT, -- 'local', 'google', 'github'
  created_at TIMESTAMP DEFAULT NOW()
);
```
## 🔐 Environment Variables
Create a .env file in the root folder with the following content:
```bash
# Server
PORT=3000

# PostgreSQL
DATABASE_URL=postgres://username:password@localhost:5432/fastify_auth

# JWT
JWT_SECRET=your_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URL=http://localhost:4000/googleLogin/callback  //optional

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URL=http://localhost:4000/githubLogin/callback  //optional
```
## 🧪 Running the Server
### 1. Development Mode
```bash
npm run dev
```
### 2. Production Mode
```bash
npm start
```

## 📬 API Endpoints
| Method | Endpoint                        | Description               |
|--------|----------------------------------|---------------------------|
| POST   | `/v1/users/register`            | Register new user         |
| POST   | `/v1/users/login`               | Login with email/password |
| GET    | `/v1/googleLogin`              | Start Google OAuth flow   |
| GET    | `/v1/googleLogin/callback`     | Google OAuth callback     |
| GET    | `/v1/githubLogin`              | Start GitHub OAuth flow   |
| GET    | `/v1/githubLogin/callback`     | GitHub OAuth callback     |