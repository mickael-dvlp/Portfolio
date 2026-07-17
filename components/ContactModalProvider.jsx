"use client";

import { createContext, useContext, useState } from "react";
import ContactModal from "./ContactModal";

const ContactModalContext = createContext(null);

/**
 * ContactModalProvider — Fournit une instance unique de ContactModal
 * partagée par toute l'application (Navbar, Footer, HomePage...).
 *
 * Évite d'avoir une modale + un état isOpen dupliqués dans chaque
 * composant qui a besoin d'ouvrir le formulaire de contact.
 */
export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = () => setIsOpen(true);
  const closeContact = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ openContact }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={closeContact} />
    </ContactModalContext.Provider>
  );
}

/**
 * useContactModal — Hook d'accès au contrôle de la modale de contact
 * @returns {{ openContact: () => void }}
 */
export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal doit être utilisé à l'intérieur de ContactModalProvider");
  }
  return context;
}
