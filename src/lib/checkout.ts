type CheckoutPayload = {
  plan: 'starter' | 'delivery' | 'enterprise';
  billingMode?: 'project' | 'retainer';
  email?: string;
};

type CheckoutResponse = {
  url?: string;
  fallbackUrl?: string;
  error?: string;
};

export async function startCheckout(payload: CheckoutPayload) {
  // TODO: `/api/checkout` is only available behind the deployed serverless runtime.
  // Keep client callers ready to fall back to a direct payment/contact link in local-only environments.
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      origin: window.location.origin,
    }),
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? ((await response.json()) as CheckoutResponse)
    : ({ error: 'Unexpected checkout response' } as CheckoutResponse);

  if (!response.ok) {
    throw data;
  }

  return data;
}
