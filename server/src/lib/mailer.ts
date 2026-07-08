import nodemailer from 'nodemailer';
import { config } from '../config.js';
import type { LeadDoc } from '../models/Lead.js';

const smtpReady = () =>
  Boolean(config.smtp.host && config.smtp.user && config.smtp.pass);

export async function notifyNewLead(lead: LeadDoc): Promise<void> {
  if (!smtpReady() || !config.smtp.notifyTo) return; // silently skip if unconfigured

  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.port === 465,
    auth: { user: config.smtp.user, pass: config.smtp.pass },
  });

  const lines = [
    `New ${lead.formType} lead from Sadguru Estate`,
    '',
    `Name:     ${lead.name || '-'}`,
    `Phone:    ${lead.phone}`,
    `Email:    ${lead.email || '-'}`,
    lead.propertyName ? `Property: ${lead.propertyName}` : '',
    lead.message ? `Message:  ${lead.message}` : '',
  ].filter(Boolean);

  await transporter.sendMail({
    from: `"Sadguru Estate" <${config.smtp.user}>`,
    to: config.smtp.notifyTo,
    subject: `New lead: ${lead.name || lead.phone}`,
    text: lines.join('\n'),
  });
}
