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

## ⚠️ Current Limitations

* No user authentication (single‑user focus for now)
* No activity timeline yet
* No role‑based access control

These are intentional and planned for future iterations.

---

## 🧭 Roadmap

* User authentication (JWT)
* Project timelines & milestones
* Analytics (project lifespan, completion rate)
* Tags & filters
* Dark mode

---

## 🧠 Philosophy

Dev Odyssey isn’t about tracking everything — it’s about tracking what *matters*. Build, pause, ship, abandon — all are valid stages of growth.

---

## 🏁 Status

Active development 🟢

Built as a learning‑driven, production‑ready MERN project.
