import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ModalCtx = {
  pricingOpen: boolean;
  contactOpen: boolean;
  openPricing: () => void;
  closePricing: () => void;
  openContact: () => void;
  closeContact: () => void;
};

const Ctx = createContext<ModalCtx>({
  pricingOpen: false,
  contactOpen: false,
  openPricing: () => {},
  closePricing: () => {},
  openContact: () => {},
  closeContact: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = pricingOpen || contactOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [pricingOpen, contactOpen]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPricingOpen(false); setContactOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Ctx.Provider value={{
      pricingOpen,
      contactOpen,
      openPricing:  () => { setPricingOpen(true);  setContactOpen(false); },
      closePricing: () => setPricingOpen(false),
      openContact:  () => { setContactOpen(true);  setPricingOpen(false); },
      closeContact: () => setContactOpen(false),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useModal = () => useContext(Ctx);
