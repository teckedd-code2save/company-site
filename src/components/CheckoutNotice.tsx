import { useMemo } from 'react';

export default function CheckoutNotice() {
  const message = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('checkout');

    if (status === 'success') {
      return 'Payment successful. Serendepify should follow up with the next steps shortly.';
    }

    if (status === 'cancelled') {
      return 'Checkout was cancelled. You can still request a demo or continue through contact when ready.';
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
