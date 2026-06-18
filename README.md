# 🚀 ApplyOrbit
**version - 1.0**

**AI-powered job application tracker — built to bring order to the job hunt.**

ApplyOrbit helps you track every application from first click to final offer, with an AI resume tailoring engine that scores your resume against job descriptions and gives actionable improvement suggestions.

---

## ✨ Features

- **Kanban Board** — Drag-and-drop applications across stages: Applied → Shortlisted → Interview → Offer → Rejected.
- **Table View** — Toggle between Kanban and a compact table view for a quick overview.
- **Application CRUD** — Store company, role, date applied, and full job description per application.
- **AI Resume Tailor** — Upload your resume (PDF) and paste a JD; Gemini 2.5 Flash returns a match score, section-level bullet improvements, and a summary.
- **Stats Dashboard** — Visual breakdown of application stages via a Recharts pie chart; resume activity card.
- **Auth** — Email/password auth via Supabase with JWT-secured API routes and Row Level Security.
- **Settings** — Update profile, reset password, delete all applications, or delete your account.

---

## 📺 Live Demo (GIF)
<p align="center">
    <img width="400" height="225" alt="ApplyOrbit_demoVideo" src="https://github.com/user-attachments/assets/3cfd9f29-598e-4b10-a4e8-aeff1617a21b" />
</p>




---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database & Auth | Supabase (PostgreSQL + Auth) |
| AI | Google Gemini 2.5 Flash API |
| PDF Parsing | `pdf-parse` (v2) |
| File Upload | `multer` (memory storage) |
| Charts | Recharts |
| Drag & Drop | `@dnd-kit/core` |
| Email | Resend (via Supabase SMTP) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
applyorbit/
├── Backend/
│   ├── controllers/         # Route handler logic
│   ├── db/                  # Supabase client setup
│   ├── middleware/          # JWT auth middleware
│   ├── routes/              # API route definitions
│   ├── .env
│   └── server.js
│
└── Frontend/
    ├── public/
    └── src/
        ├── components/      # Kanban, TableView, AddApplication, etc.
        ├── context/         # AppContext (apps, resume, auth state)
        ├── lib/             # Supabase client, helpers
        ├── pages/           # Dashboard, Applications, ResumeTailor, Settings
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- A [Supabase](https://supabase.com) project
- A [Google AI Studio](https://aistudio.google.com) API key (Gemini)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/applyorbit.git
cd applyorbit
```

### 2. Set up the backend

```bash
cd Backend
npm install
```

Create a `.env` file in `/Backend`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
PORT=5000
```

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd Frontend
npm install
```

Create a `.env` file in `/Frontend`:

```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

```bash
npm run dev
```

---

## 🔮 What's Coming in v2

- **Mobile-responsive layout** — full dynamic UI optimized for phones and tablets
- **OAuth login** — sign in with Google via Supabase Auth providers

---


## 🙋 Author

**Saurav** — AI Full Stack Developer  
BTech IT @ GGSIPU  

---

## 📄 License

MIT
