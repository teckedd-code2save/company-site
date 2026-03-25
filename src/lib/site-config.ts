export const siteConfig = {
  githubOrg: import.meta.env.VITE_GITHUB_ORG || 'teckedd-code2save',
  contactEmail:
    import.meta.env.VITE_CONTACT_EMAIL || 'edwardktwumasi1000@gmail.com',
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL || '',
  paymentLinks: {
    starter: import.meta.env.VITE_PAYMENT_STARTER_URL || '',
    delivery: import.meta.env.VITE_PAYMENT_DELIVERY_URL || '',
    enterprise: import.meta.env.VITE_PAYMENT_ENTERPRISE_URL || '',
  },
};

export function resolvePaymentLink(
  tier: keyof typeof siteConfig.paymentLinks,
  fallback = '#contact'
) {
  return siteConfig.paymentLinks[tier] || fallback;
}

export function resolveContactLink() {
  return siteConfig.calendlyUrl || '#contact';
}
