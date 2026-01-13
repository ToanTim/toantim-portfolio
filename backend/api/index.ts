import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from '../src/utils/db';
import visitorRoutes from '../src/routes/visitor';
import contactRoutes from '../src/routes/contact';
import projectRouter from '../src/routes/project';
import e from 'express';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://toantim-portfolio.vercel.app',
      'https://toantim.com',
    ],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
//app.use('/api/visitors', visitorRoutes);
app.use('/api/contact', contactRoutes);

app.use('/api/projects', projectRouter);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running in development mode on http://localhost:${PORT}`);
  }
  else {
    console.log(`Server running in production mode up MongoDB cloud`);
  }
});

export default app;
