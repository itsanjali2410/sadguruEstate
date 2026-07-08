import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export interface AuthedRequest extends Request {
  admin?: { id: string; email: string };
}

export function signToken(payload: { id: string; email: string }): string {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
}

export function requireAuth(
  req: AuthedRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    req.admin = jwt.verify(token, config.jwtSecret) as {
      id: string;
      email: string;
    };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
