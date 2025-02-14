// TODO rework error handling
import { NextFunction, Request, Response } from 'express';

// Function to handle error messages based on the environment
export const handleError = (error: unknown): string => {
  if (process.env.NODE_ENV === 'production') {
    return 'Internal Server Error';
  }
  return (error as Error).message;
};

// Middleware to handle errors and send appropriate responses
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = handleError(err);
  const stack = process.env.NODE_ENV === 'production' ? null : err.stack;

  res.status(statusCode).json({
    message,
    stack,
  });
};