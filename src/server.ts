import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import companyRoutes from './routes/companyRoutes';
import locationRoutes from './routes/locationRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/companies', companyRoutes);
app.use('/locations', locationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/auth`);
  console.log(`🕒 Attendance endpoints: http://localhost:${PORT}/attendance`);
  console.log(`🏢 Company endpoints: http://localhost:${PORT}/companies`);
  console.log(`📍 Location endpoints: http://localhost:${PORT}/locations`);
});

export default app; 