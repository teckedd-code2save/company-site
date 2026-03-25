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

  const data = (await response.json()) as CheckoutResponse;

  if (!response.ok) {
    throw data;
  }

  return data;
}
