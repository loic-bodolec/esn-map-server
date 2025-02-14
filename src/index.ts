// TODO rework error handling 
import cors from 'cors';
import express, { RequestHandler, Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import corsOptions from './config/cors/corsOptions';
import logger from './config/logger/logger';
import swaggerOptions from './config/swagger/swaggerOptions';
import { AppDataSource } from './config/typeorm/data-source';
import { createDefaultAdminUser } from './dataLayer/dao/userDao';
import { isLoggedIn } from './middleware/authMiddleware';
import authRoutes from './routes/authRoutes';
import clientRoutes from './routes/clientRoutes';
import consultantRoutes from './routes/consultantRoutes';
import expertiseRoutes from './routes/expertiseRoutes';
import jobRoutes from './routes/jobRoutes';
import technoRoutes from './routes/technoRoutes';
import userRoutes from './routes/userRoutes';
import workRoutes from './routes/workRoutes';
import { errorHandler } from './utils/handleError';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

const PORT = process.env.PORT ?? 5000;
const app = express();

app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(limiter); // Enable Rate Limit

// Configure Morgan to use Winston for logging HTTP requests
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Body parser middleware
app.use(express.json()); // To parse JSON data
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/auth', authRoutes);
app.use('/users', isLoggedIn as RequestHandler, userRoutes);
app.use('/clients', isLoggedIn as RequestHandler, clientRoutes);
app.use('/consultants', isLoggedIn as RequestHandler, consultantRoutes);
app.use('/technos', isLoggedIn as RequestHandler, technoRoutes);
app.use('/works', isLoggedIn as RequestHandler, workRoutes);
app.use('/expertises', isLoggedIn as RequestHandler, expertiseRoutes);
app.use('/jobs', isLoggedIn as RequestHandler, jobRoutes);

// Error handling middleware
// This middleware captures and handles application-specific errors.
// It centralizes error handling and provides consistent responses to users.
app.use(errorHandler);

// Handle 404 errors
// This middleware handles requests to routes that do not exist.
// It returns a 404 response with a message indicating that the route was not found.
// This informs users that the requested route does not exist and prevents unhandled errors.
app.use((res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
// This middleware captures all unhandled errors in the application.
// It logs the error and returns a 500 response with a generic error message.
// This helps capture unforeseen errors and prevents the application from crashing,
// while keeping a record of the errors in the logs for debugging.
app.use((err: any, res: Response) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

AppDataSource.initialize()
  .then(() => {
    // Call the function to create a default admin user
    createDefaultAdminUser().catch((err) => logger.error(err));
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => logger.error(error));

  