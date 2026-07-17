"use client";

import { useContactModal } from "./ContactModalProvider";

/** Petit îlot client chargé uniquement de l’ouverture de la modale de contact. */
export default function ContactButton({ children, className }) {
  const { openContact } = useContactModal();

  return (
    <button type="button" onClick={openContact} className={className}>
      {children}
    </button>
  );
}
