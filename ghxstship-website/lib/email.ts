/**
 * Email Service
 * Handles sending emails using Resend or Nodemailer
 */

import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface ContactEmailParams {
  to: string;
  from: string;
  name: string;
  subject: string;
  message: string;
  formType: string;
  metadata?: {
    company?: string;
    phone?: string;
    projectType?: string;
    projectBudget?: string;
    projectTimeline?: string;
  };
}

export async function sendContactEmail(params: ContactEmailParams): Promise<void> {
  const { to, from, name, subject, message, formType, metadata } = params;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Share Tech', monospace, Arial, sans-serif; line-height: 1.6; color: #000; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; }
          .header h1 { margin: 0; font-family: 'Anton', Impact, sans-serif; font-size: 24px; letter-spacing: 2px; }
          .content { background: #fff; padding: 30px; border: 2px solid #000; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; color: #525252; }
          .value { margin-top: 5px; }
          .footer { text-align: center; padding: 20px; color: #737373; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>GHXSTSHIP INDUSTRIES</h1>
            <p>New Contact Form Submission</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Form Type</div>
              <div class="value">${formType.replace(/_/g, ' ')}</div>
            </div>
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${from}">${from}</a></div>
            </div>
            ${metadata?.phone ? `
              <div class="field">
                <div class="label">Phone</div>
                <div class="value">${metadata.phone}</div>
              </div>
            ` : ''}
            ${metadata?.company ? `
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${metadata.company}</div>
              </div>
            ` : ''}
            ${metadata?.projectType ? `
              <div class="field">
                <div class="label">Project Type</div>
                <div class="value">${metadata.projectType}</div>
              </div>
            ` : ''}
            ${metadata?.projectBudget ? `
              <div class="field">
                <div class="label">Budget</div>
                <div class="value">${metadata.projectBudget.replace(/_/g, ' ')}</div>
              </div>
            ` : ''}
            ${metadata?.projectTimeline ? `
              <div class="field">
                <div class="label">Timeline</div>
                <div class="value">${metadata.projectTimeline}</div>
              </div>
            ` : ''}
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>GHXSTSHIP Industries LLC | Tampa, FL</p>
            <p>This email was sent from your website contact form</p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (resend) {
    // Use Resend if API key is configured
    await resend.emails.send({
      from: process.env.EMAIL_FROM_ADDRESS || 'hello@ghxstship.com',
      to,
      subject: `[Contact Form] ${subject}`,
      html: htmlContent,
      replyTo: from,
    });
  } else {
    // Fallback: log to console in development
    console.log('Email would be sent:', {
      to,
      from,
      subject,
      message,
    });
  }
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Share Tech', monospace, Arial, sans-serif; line-height: 1.6; color: #000; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-family: 'Anton', Impact, sans-serif; font-size: 36px; letter-spacing: 3px; }
          .content { background: #fff; padding: 40px; border: 2px solid #000; }
          .footer { text-align: center; padding: 20px; color: #737373; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>WELCOME TO GHXSTSHIP</h1>
          </div>
          <div class="content">
            <p>Hello ${name},</p>
            <p>Thank you for subscribing to GHXSTSHIP Industries updates!</p>
            <p>You'll be the first to know about:</p>
            <ul>
              <li>New project launches and case studies</li>
              <li>Industry insights and innovations</li>
              <li>Company news and announcements</li>
              <li>Behind-the-scenes content</li>
            </ul>
            <p>We create beyond reality. Stay tuned.</p>
            <p><strong>— The GHXSTSHIP Team</strong></p>
          </div>
          <div class="footer">
            <p>GHXSTSHIP Industries LLC | Tampa, FL</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe">Unsubscribe</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (resend) {
    await resend.emails.send({
      from: process.env.EMAIL_FROM_ADDRESS || 'hello@ghxstship.com',
      to: email,
      subject: 'Welcome to GHXSTSHIP Industries',
      html: htmlContent,
    });
  } else {
    console.log('Welcome email would be sent to:', email);
  }
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password?token=${token}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Share Tech', monospace, Arial, sans-serif; line-height: 1.6; color: #000; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #000; color: #fff; padding: 20px; text-align: center; }
          .content { background: #fff; padding: 40px; border: 2px solid #000; }
          .button { display: inline-block; padding: 15px 30px; background: #000; color: #fff; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #737373; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PASSWORD RESET</h1>
          </div>
          <div class="content">
            <p>You requested to reset your password.</p>
            <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
            <p style="text-align: center;">
              <a href="${resetUrl}" class="button">RESET PASSWORD</a>
            </p>
            <p>If you didn't request this, please ignore this email.</p>
            <p style="font-size: 12px; color: #737373;">Or copy and paste this URL: ${resetUrl}</p>
          </div>
          <div class="footer">
            <p>GHXSTSHIP Industries LLC | Tampa, FL</p>
          </div>
        </div>
      </body>
    </html>
  `;

  if (resend) {
    await resend.emails.send({
      from: process.env.EMAIL_FROM_ADDRESS || 'hello@ghxstship.com',
      to: email,
      subject: 'Reset Your Password - GHXSTSHIP Industries',
      html: htmlContent,
    });
  } else {
    console.log('Password reset email would be sent to:', email, 'with token:', token);
  }
}
