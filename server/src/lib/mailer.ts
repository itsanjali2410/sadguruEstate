import nodemailer, { type Transporter } from 'nodemailer';
import { config } from '../config.js';
import type { LeadDoc } from '../models/Lead.js';

/** True when SMTP credentials and a recipient are all configured. */
export const mailReady = () =>
  Boolean(
    config.smtp.host && config.smtp.user && config.smtp.pass && config.smtp.notifyTo
  );

// One transporter for the process: nodemailer pools the connection, so we
// don't pay a fresh SMTP handshake for every lead.
let transporter: Transporter | null = null;
function getTransporter(): Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: { user: config.smtp.user, pass: config.smtp.pass },
    });
  }
  return transporter;
}

const FROM = () => `"Sadguru Estate Website" <${config.smtp.user}>`;

const FORM_LABELS: Record<string, string> = {
  contact: 'Contact form',
  property_inquiry: 'Property enquiry',
  quick_info: 'Quick info request',
  brochure_download: 'Brochure download',
};

export async function notifyNewLead(lead: LeadDoc): Promise<void> {
  if (!mailReady()) return; // warned once at startup (index.ts) and shown on /api/health

  const kind = FORM_LABELS[lead.formType] || lead.formType;
  const lines = [
    `New lead — ${kind}`,
    '',
    `Name:     ${lead.name || '-'}`,
    `Phone:    ${lead.phone}`,
    `Email:    ${lead.email || '-'}`,
    lead.propertyName ? `Property: ${lead.propertyName}` : '',
    lead.message ? `Message:  ${lead.message}` : '',
    '',
    `Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
    'Manage:   https://www.sadguruestates.com/admin',
  ].filter(Boolean);

  await getTransporter().sendMail({
    from: FROM(),
    to: config.smtp.notifyTo,
    // Hitting "Reply" in the inbox goes straight to the lead when they left an email.
    replyTo: lead.email || undefined,
    subject: `New lead: ${lead.name || lead.phone}${lead.propertyName ? ` — ${lead.propertyName}` : ''}`,
    text: lines.join('\n'),
  });
}

/** Admin-triggered end-to-end check that SMTP really delivers. Returns the recipient. */
export async function sendTestEmail(): Promise<string> {
  if (!mailReady()) {
    throw new Error(
      'SMTP not configured — set SMTP_HOST, SMTP_USER, SMTP_PASS and LEAD_NOTIFY_TO'
    );
  }
  await getTransporter().sendMail({
    from: FROM(),
    to: config.smtp.notifyTo,
    subject: 'Test: lead notifications are working',
    text: 'This is a test from the Sadguru Estate website. Lead notification emails are configured correctly.',
  });
  return config.smtp.notifyTo;
}
