# Dev Odyssey 🚀

Dev Odyssey is a full‑stack MERN project designed to help developers track, manage, and reflect on their personal development projects. It focuses on clarity, progress visibility, and clean architecture — no fluff, just execution.

---

## ✨ What Dev Odyssey Does

* Create development projects
* Update project status (active, paused, abandoned, shipped)
* View all projects in a clean dashboard
* Delete projects when they’re no longer relevant
* Designed to scale with authentication, analytics, and timelines

---

## 🧱 Tech Stack

### Frontend

* **React (Vite)** – Fast development and build times
* **Tailwind CSS** – Utility‑first styling
* **React Router DOM** – Client‑side routing
* **Axios** – API communication
* **Framer Motion** – Smooth UI animations

### Backend

* **Node.js** – Runtime
* **Express.js** – Server framework
* **MongoDB** – Database
* **Mongoose** – ODM for MongoDB
* **dotenv** – Environment variables
* **CORS** – Cross‑origin requests

---

## 📁 Project Structure

```
dev-odyssey/
├─ server/
│  ├─ models/
│  ├─ routes/
│  ├─ server.js
│  └─ package.json
│
├─ client/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ context/
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  └─ package.json
└─ README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| POST   | /api/projects     | Create a new project |
| GET    | /api/projects     | Fetch all projects   |
| PATCH  | /api/projects/:id | Update a project     |
| DELETE | /api/projects/:id | Delete a project     |

---

## 🎨 UI / UX Principles

* Minimal but expressive design
* Status‑based color indicators
* Responsive layout (mobile‑first)
* Clear feedback on actions (create, update, delete)
* Smooth transitions and animations

---

## ⚠️ Security Features Added

* User authentication (JWT-based)
* Input validation using express-validator
* ObjectId validation for route parameters
* Proper CORS configuration
* Rate limiting to prevent abuse
* Security headers using helmet
* Password hashing using bcrypt
* Error message sanitization
* User-specific project isolation

---

## 🧭 Roadmap

* Project timelines & milestones
* Analytics (project lifespan, completion rate)
* Tags & filters
* Dark mode
* Multi-user collaboration features

---

## 🧠 Philosophy

Dev Odyssey isn’t about tracking everything — it’s about tracking what *matters*. Build, pause, ship, abandon — all are valid stages of growth.

---

## 🔐 Setup Instructions

1. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_for_jwt_tokens
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   ```

2. Install dependencies in both client and server directories:
   ```bash
   # In server directory
   npm install

   # In client directory
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev # or node server.js
   ```

4. Start the client:
   ```bash
   cd client
   npm run dev
   ```

5. Register a user account via the frontend UI at `http://localhost:5173/register`

---

## 🏁 Status

Active development 🟢

Built as a learning‑driven, production‑ready MERN project with enhanced security.
