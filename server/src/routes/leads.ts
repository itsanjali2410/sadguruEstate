import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { Lead } from '../models/Lead.js';
import { requireAuth } from '../middleware/auth.js';
import { notifyNewLead } from '../lib/mailer.js';

const router = Router();

// ── PUBLIC ────────────────────────────────────────────────────

// Spam protection: max 5 submissions per IP per 15 minutes
const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions — please try again in a few minutes.' },
});

// POST /api/leads — capture a form / brochure-download submission
router.post('/', leadLimiter, async (req, res) => {
  // Honeypot: real users never see/fill the "website" field. Bots do.
  // Pretend success so the bot moves on, but store nothing.
  if (req.body.website) {
    return res.status(201).json({ ok: true, id: 'received' });
  }

  const phone = String(req.body.phone || '').trim();
  if (phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ error: 'Valid phone number required' });
  }

  const lead = await Lead.create({
    name: req.body.name || '',
    email: req.body.email || '',
    phone,
    message: req.body.message || '',
    formType: req.body.formType || 'contact',
    propertySlug: req.body.propertySlug || '',
    propertyName: req.body.propertyName || '',
    meta: req.body.meta || {},
  });

  // Fire-and-forget email; never blocks the response
  notifyNewLead(lead).catch((e) => console.error('Lead email failed:', e));

  res.status(201).json({ ok: true, id: lead._id });
});

// ── ADMIN ─────────────────────────────────────────────────────

// GET /api/leads — inbox
router.get('/', requireAuth, async (req, res) => {
  const q: Record<string, unknown> = {};
  if (req.query.status) q.status = req.query.status;
  const leads = await Lead.find(q).sort({ createdAt: -1 }).lean();
  res.json(leads);
});

// PATCH /api/leads/:id — update status
router.patch('/:id', requireAuth, async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  if (!lead) return res.status(404).json({ error: 'Not found' });
  res.json(lead);
});

// DELETE /api/leads/:id
router.delete('/:id', requireAuth, async (req, res) => {
  const deleted = await Lead.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
