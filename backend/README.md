# Portfolio Backend

Express.js + MongoDB backend for Toan's portfolio website with visitor tracking and contact form functionality.

## Features

- **Visitor Tracking**: Automatically track website visitors with IP, user agent, and path information
- **Contact Form**: Handle contact form submissions with email notifications
- **Analytics Dashboard**: ToanLens - Real-time visitor analytics dashboard
- **Vercel Compatible**: Ready to deploy on Vercel serverless platform

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Language**: TypeScript
- **Deployment**: Vercel

## Setup

### Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (free tier available)
- Gmail account for email notifications (optional)

### Installation

1. **Clone and Install Dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Setup Environment Variables**

   ```bash
   cp .env.example .env.local
   ```

3. **Configure `.env.local`**

   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

   **To get MongoDB URI:**

   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a cluster
   - Get the connection string from "Connect" → "Drivers"

   **To get Gmail App Password:**

   - Enable 2FA on your Gmail account
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Create "App Password" under "App passwords"

### Development

```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Server will run on http://localhost:5000
```

### Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Visitor Tracking

- **POST** `/api/visitors/track` - Track a new visitor

  ```json
  {
    "path": "/about"
  }
  ```

- **GET** `/api/visitors/analytics` - Get visitor analytics

  ```json
  {
    "success": true,
    "data": {
      "totalVisitors": 150,
      "uniqueVisitors": 120,
      "last7Days": 45,
      "visitorsByPath": [
        { "_id": "/", "count": 80 },
        { "_id": "/about", "count": 40 }
      ]
    }
  }
  ```

- **GET** `/api/visitors/list` - Get paginated visitor list (admin)

### Contact Form

- **POST** `/api/contact/submit` - Submit contact form

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, I'm interested in your work!"
  }
  ```

- **GET** `/api/contact/list` - Get all messages (admin)

- **PATCH** `/api/contact/:id/read` - Mark message as read (admin)

## Deployment on Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/repo.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Configure project settings:
   - Framework: Node.js
   - Root Directory: `backend`

### Step 3: Add Environment Variables

In Vercel project settings:

1. Go to "Settings" → "Environment Variables"
2. Add the following:
   - `MONGODB_URI` - Your MongoDB connection string
   - `PORT` - 5000 (or any port)
   - `NODE_ENV` - production
   - `EMAIL_USER` - Your Gmail address
   - `EMAIL_PASSWORD` - Your app password

### Step 4: Deploy

Click "Deploy" and Vercel will build and deploy your backend!

**Your API URL will be:** `https://your-project.vercel.app`

## Frontend Integration

In your Next.js frontend `.env.local`:

```
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
```

### Track Visitors

Add this to your main layout or a useEffect hook:

```typescript
useEffect(() => {
  const trackVisitor = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visitors/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname }),
      });
    } catch (error) {
      console.error("Visitor tracking failed:", error);
    }
  };

  trackVisitor();
}, [pathname]);
```

### Submit Contact Form

```typescript
const submitContact = async (name: string, email: string, message: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contact/submit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      }
    );
    const data = await response.json();
    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Main server
│   ├── routes/
│   │   ├── visitor.ts        # Visitor tracking routes
│   │   └── contact.ts        # Contact form routes
│   ├── models/
│   │   ├── Visitor.ts        # Visitor schema
│   │   └── Contact.ts        # Contact schema
│   └── utils/
│       ├── db.ts             # MongoDB connection
│       ├── email.ts          # Email utilities
│       └── getClientIp.ts    # IP address utility
├── vercel.json               # Vercel configuration
├── tsconfig.json             # TypeScript config
├── package.json              # Dependencies
└── .env.example              # Environment template
```

## MongoDB Atlas Setup Guide

1. Create account at [mongodb.com](https://www.mongodb.com)
2. Create a free M0 cluster
3. Go to "Database Access" and create a user
4. Go to "Network Access" and allow all IPs (0.0.0.0/0)
5. Click "Connect" → "Drivers" → copy the connection string
6. Replace `<username>`, `<password>`, and `<dbname>` in the URI

## Gmail Setup for Email Notifications

1. Enable 2-factor authentication on your Gmail account
2. Go to https://myaccount.google.com/apppasswords
3. Create a new app password (choose "Mail" and "Windows Computer")
4. Use this password in `EMAIL_PASSWORD` environment variable

## Troubleshooting

**MongoDB Connection Error:**

- Check your IP is whitelisted in MongoDB Atlas
- Verify connection string format
- Check if your network allows outbound connections

**Email Not Sending:**

- Enable "Less secure app access" (not recommended)
- Or use Gmail App Password (recommended)
- Check EMAIL_USER and EMAIL_PASSWORD are correct

**CORS Issues:**

- Update `origin` array in `src/index.ts` with your frontend URL
- Make sure frontend is making requests to correct API URL

## License

MIT
