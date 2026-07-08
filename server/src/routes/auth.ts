import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { signToken, requireAuth, AuthedRequest } from '../middleware/auth.js';

const router = Router();

// POST /api/auth/login  { email, password }
router.post('/login', async (req, res) => {
  const email = String(req.body.email || '').toLowerCase().trim();
  const password = String(req.body.password || '');
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken({ id: String(admin._id), email: admin.email });
  res.json({ token, email: admin.email });
});

// GET /api/auth/me  — verify a token is still valid
router.get('/me', requireAuth, (req: AuthedRequest, res) => {
  res.json({ admin: req.admin });
});

export default router;
