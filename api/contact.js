/**
 * Contact form handler — sends email via Resend REST API.
 * No external redirect. Returns JSON so the client stays on page.
 */

const RESEND_API = 'https://api.resend.com/emails';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setCorsHeaders(res, origin) {
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  setCorsHeaders(res, origin);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, project_type, message } = req.body || {};

  // ── Validation ──────────────────────────────────────────────────────
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email is required.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message is required (min 10 characters).' });
  }

  // ── Resend config ───────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_EMAIL || process.env.VITE_CONTACT_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error('Missing Resend configuration');
    return res.status(503).json({ error: 'Email service is not configured.' });
  }

  const subject = `New contact from ${name} — Serendepify AI`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : '',
    project_type ? `Focus: ${project_type}` : '',
    '',
    'Message:',
    message,
  ].filter(Boolean).join('\n');

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ''}
    ${project_type ? `<p><strong>Focus:</strong> ${escapeHtml(project_type)}</p>` : ''}
    <hr/>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const response = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('Resend error:', response.status, body);
      return res.status(502).json({ error: 'Email provider returned an error.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact send failed:', err);
    return res.status(500).json({ error: 'Unable to send message. Please try again later.' });
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
