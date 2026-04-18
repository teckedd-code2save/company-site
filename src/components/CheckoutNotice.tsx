import { useMemo } from 'react';

export default function CheckoutNotice() {
  const message = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('checkout');

    if (status === 'success') {
      return "Payment successful. We'll follow up within 24 hours with next steps.";
    }

    if (status === 'cancelled') {
      return "Checkout cancelled. No worries — reach out whenever you're ready.";
    }

    return '';
  }, []);

  if (!message) {
    return null;
  }

  return (
    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <div className="mx-auto max-w-7xl">{message}</div>
    </div>
  );
}
