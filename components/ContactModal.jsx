"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

/* ============================================================
   État initial du formulaire
   Défini en dehors du composant pour pouvoir le réutiliser
   au moment du reset après soumission
   ============================================================ */
const initialFormState = {
  nom: "",
  email: "",
  telephone: "",
  motif: "",
  description: "",
  website: "",
};

/**
 * ContactModal — Formulaire de contact affiché dans une popup modale animée
 *
 * La modale s'ouvre avec une animation de zoom + fondu (framer-motion).
 * Le clic en dehors de la modale la ferme automatiquement.
 *
 * @param {boolean}  isOpen  - Contrôle l'affichage de la modale
 * @param {Function} onClose - Callback appelé pour fermer la modale
 */
export default function ContactModal({ isOpen, onClose }) {
  /* État local du formulaire */
  const [form, setForm] = useState(initialFormState);
  const dialogRef = useRef(null);

  /**
   * Bloque le scroll du body quand la modale est ouverte
   * pour éviter le défilement en arrière-plan
   */
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocusedElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector = [
      "button:not([disabled])",
      "input:not([disabled]):not([tabindex='-1'])",
      "textarea:not([disabled])",
      "select:not([disabled])",
      "a[href]",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");

    const focusFirstElement = requestAnimationFrame(() => {
      dialogRef.current?.querySelector(focusableSelector)?.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll(focusableSelector)
      );
      if (!focusableElements.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFirstElement);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen, onClose]);

  /**
   * Met à jour le champ correspondant dans l'état du formulaire
   * @param {React.ChangeEvent} e - Événement de changement
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error);
      setForm(initialFormState);
      onClose();
      toast.success("Votre mail est bien parti !");
    } catch (err) {
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSending(false);
    }
  };

  /**
   * Ferme la modale uniquement si le clic est sur le fond (backdrop),
   * pas sur la carte blanche de la modale elle-même
   * @param {React.MouseEvent} e - Événement de clic
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    /* AnimatePresence permet d'animer la sortie du composant (exit) */
    <AnimatePresence>
      {isOpen && (
        /* Fond assombri — backdrop */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          {/* Carte de la modale */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            aria-describedby="contact-dialog-description"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="bg-dark-700 border border-dark-500 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            {/* ---- En-tête de la modale ---- */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 id="contact-dialog-title" className="text-2xl font-bold text-white">
                  Me contacter
                </h2>
                <p id="contact-dialog-description" className="sr-only">
                  Formulaire permettant d’envoyer une demande de contact.
                </p>
              </div>
              {/* Bouton de fermeture */}
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-dark-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* ---- Formulaire ---- */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot anti-spam : invisible pour les visiteurs, souvent rempli par les bots. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact-website">Site web</label>
                <input
                  id="contact-website"
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              {/* Nom ou entreprise */}
              <div>
                <label htmlFor="contact-nom" className="block text-sm font-medium text-gray-300 mb-1">
                  Nom ou entreprise <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="contact-nom"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  placeholder="Jean Dupont / Acme Corp."
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Adresse mail */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-1">
                  Adresse mail <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  placeholder="jean.dupont@email.com"
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Numéro de téléphone */}
              <div>
                <label htmlFor="contact-telephone" className="block text-sm font-medium text-gray-300 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="contact-telephone"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  placeholder="+33 6 00 00 00 00"
                  maxLength={30}
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Motif de la demande */}
              <div>
                <label htmlFor="contact-motif" className="block text-sm font-medium text-gray-300 mb-1">
                  Motif de la demande <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="contact-motif"
                  name="motif"
                  value={form.motif}
                  onChange={handleChange}
                  required
                  maxLength={150}
                  placeholder="Création de site, freelance, collaboration..."
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Description de la demande */}
              <div>
                <label htmlFor="contact-description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description de la demande{" "}
                  <span className="text-accent">*</span>
                </label>
                <textarea
                  id="contact-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  maxLength={3000}
                  rows={4}
                  placeholder="Décrivez votre projet ou votre demande en détail..."
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {/* Message d'erreur */}
              {error && (
                <p
                  id="contact-error"
                  role="alert"
                  aria-live="assertive"
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </p>
              )}

              {/* Boutons d'action */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={sending}
                  className="flex-1 px-4 py-2.5 border border-dark-500 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors disabled:opacity-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all hover:shadow-lg disabled:opacity-50"
                >
                  {sending ? "Envoi en cours..." : "Envoyer"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
