# 🕷️ Portfolio — Backend (Server)

The Express.js backend API for the portfolio website. Handles contact form submissions, project data, and email notifications.

**Live URL**: [myportfolio-backend-w45n.onrender.com](https://myportfolio-backend-w45n.onrender.com)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| Express.js | 4.21 | Web framework |
| MongoDB | Atlas | Cloud database |
| Mongoose | 8.14 | MongoDB ODM (Object Data Modeling) |
| Nodemailer | 6.10 | Email notifications for contact form |
| CORS | 2.8 | Cross-origin request handling |
| dotenv | 16.4 | Environment variable management |

---

## 📁 File Structure

```
server/
├── models/
│   ├── Contact.js              → Mongoose schema for contact form submissions
│   │                              Fields: name, email, subject, message
│   │                              Validation: required fields, email format, max lengths
│   │                              Timestamps: createdAt, updatedAt (auto-generated)
│   │
│   └── Project.js              → Mongoose schema for portfolio projects
│                                  Fields: title, description, image, techStack[], category,
│                                          liveUrl, githubUrl, featured
│                                  Timestamps: createdAt, updatedAt (auto-generated)
│
├── routes/
│   ├── contactRoutes.js        → Contact form API route
│   │                              POST /api/contact
│   │                              - Validates required fields (name, email, subject, message)
│   │                              - Saves submission to MongoDB
│   │                              - Sends email notification via Nodemailer (if configured)
│   │                              - Returns success/error JSON response
│   │                              - Spider-Man themed HTML email template
│   │
│   └── projectRoutes.js        → Project data API routes
│                                  GET /api/projects
│                                  - Fetches all projects from MongoDB
│                                  - Sorted by: featured first, then newest
│                                  GET /api/projects/:id
│                                  - Fetches a single project by MongoDB _id
│                                  - Returns 404 if not found
│
├── server.js                   → Express server entry point
│                                  - Loads environment variables (dotenv)
│                                  - Configures CORS with allowed origins:
│                                      localhost:5173, localhost:5174, localhost:3000
│                                      + CLIENT_URL env var (for Vercel frontend)
│                                  - JSON body parser (10mb limit)
│                                  - Mounts API routes (/api/contact, /api/projects)
│                                  - Health check endpoint: GET /api/health
│                                  - Global error handling middleware
│                                  - Connects to MongoDB Atlas on startup
│                                  - Graceful fallback if MONGO_URI not set
│
├── .env                        → Environment variables (NOT in Git)
│                                  MONGO_URI, PORT, CLIENT_URL, email config
│
└── package.json                → Dependencies & scripts
                                   "type": "module" (ES module imports)
```

---

## 🔗 API Endpoints

### `GET /api/health`

Health check — verifies the server is running.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-17T10:21:16.281Z"
}
```

---

### `POST /api/contact`

Submit a contact form message. Saves to MongoDB and optionally sends an email notification.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to work together on a project."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Name is required"
}
```

**Validation Rules:**
| Field | Required | Max Length |
|-------|----------|-----------|
| `name` | ✅ | 100 chars |
| `email` | ✅ | Valid email format |
| `subject` | ✅ | 200 chars |
| `message` | ✅ | 5000 chars |

---

### `GET /api/projects`

Fetch all projects. Returns an array sorted by featured status and creation date.

**Response (200):**
```json
[
  {
    "_id": "664abc123...",
    "title": "E-Commerce Platform",
    "description": "Full-stack shopping platform...",
    "image": "https://...",
    "techStack": ["React", "Node.js", "MongoDB"],
    "category": "Full-Stack",
    "liveUrl": "https://...",
    "githubUrl": "https://...",
    "featured": true,
    "createdAt": "2026-05-17T...",
    "updatedAt": "2026-05-17T..."
  }
]
```

---

### `GET /api/projects/:id`

Fetch a single project by its MongoDB ID.

**Response (200):** Single project object (same shape as above)

**Error Response (404):**
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

## 🚀 Commands

### Install Dependencies

```bash
cd server
npm install
```

### Development Server (with auto-restart)

```bash
npm run dev
```

Starts the Express server at **http://localhost:5000** with Node's built-in `--watch` mode. The server automatically restarts when you save file changes.

### Production Server

```bash
npm start
```

Runs `node server.js` without watch mode — used by Render in production.

---

## ⚙️ Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Required — MongoDB Atlas connection string
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority

# Server port (Render provides this automatically)
PORT=5000

# Required for production — Your Vercel frontend URL (for CORS)
CLIENT_URL=https://my-portfolio-dusky-xi-92.vercel.app

# Optional — Email notifications for contact form submissions
# To enable, create a Gmail App Password:
# 1. Go to myaccount.google.com → Security → 2-Step Verification
# 2. At the bottom, click "App passwords"
# 3. Generate a password for "Mail"
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your-email@gmail.com
# EMAIL_PASS=your-16-char-app-password
# EMAIL_TO=your-email@gmail.com
```

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ | MongoDB Atlas connection string |
| `PORT` | ✅ | Server port (default: 5000) |
| `CLIENT_URL` | Production only | Vercel frontend URL for CORS |
| `EMAIL_HOST` | Optional | SMTP host for email notifications |
| `EMAIL_PORT` | Optional | SMTP port (587 for Gmail) |
| `EMAIL_USER` | Optional | Email sender address |
| `EMAIL_PASS` | Optional | Email app password |
| `EMAIL_TO` | Optional | Email recipient address |

---

## 🗄️ Database Models

### Contact Schema (`models/Contact.js`)

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    maxlength: 5000
  },
  createdAt: Date,   // auto-generated
  updatedAt: Date    // auto-generated
}
```

### Project Schema (`models/Project.js`)

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: String,              // Project screenshot URL
  techStack: [String],        // Array of technology names
  category: {
    type: String,
    enum: ["Frontend", "Backend", "Full-Stack"],
    default: "Full-Stack"
  },
  liveUrl: String,            // Live demo URL
  githubUrl: String,          // GitHub repo URL
  featured: {
    type: Boolean,
    default: false             // Featured projects appear first
  },
  createdAt: Date,            // auto-generated
  updatedAt: Date             // auto-generated
}
```

---

## 🌍 Deploy to Render

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect GitHub repo: `karthik-engili/myPortfolio`
3. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free ($0/month)
4. Add environment variables: `MONGO_URI`, `PORT`, `CLIENT_URL`
5. Click **Deploy Web Service**

Auto-redeploys on every `git push origin main`.

> **Note:** On Render's free tier, the server sleeps after 15 minutes of inactivity. The first request after sleeping takes ~30 seconds to wake up.
