# 🕷️ Portfolio — Backend (Server)

The Express.js backend API for the portfolio website. Handles contact form submissions and project data.

## Tech Stack

- **Node.js** — Runtime
- **Express.js** — Web framework
- **MongoDB + Mongoose** — Database & ODM
- **Nodemailer** — Email notifications
- **CORS** — Cross-origin request handling
- **dotenv** — Environment variable management

## API Endpoints

| Method | Route | Description |

| `POST` | `/api/contact` | Submit contact form (saves to DB + sends email) |
| `GET` | `/api/projects` | Fetch all projects |
| `GET` | `/api/projects/:id` | Fetch single project by ID |
| `GET` | `/api/health` | Health check endpoint |

## Setup

1. Create a `.env` file in this directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000

# Optional: Email notifications
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-email@gmail.com
```

2. Install dependencies and run:

```bash
npm install
npm run dev      # Development with auto-restart
npm start        # Production
```

## Database Models

### Contact
```javascript
{ name, email, subject, message, createdAt, updatedAt }
```

### Project
```javascript
{ title, description, image, techStack[], category, liveUrl, githubUrl, featured }
```
