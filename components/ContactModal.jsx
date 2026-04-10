"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   État initial du formulaire
   Défini en dehors du composant pour pouvoir le réutiliser
   au moment du reset après soumission
   ============================================================ */
const initialFormState = {
  nom: "",
  telephone: "",
  motif: "",
  description: "",
};

/**
 * ContactModal — Formulaire de contact affiché dans une popup modale animée
 *
 * La modale s'ouvre avec une animation de zoom + fondu (framer-motion).
 * Le clic en dehors de la modale la ferme automatiquement.
 *
 * TODO: connecter handleSubmit à une API ou service d'email
 *
 * @param {boolean}  isOpen  - Contrôle l'affichage de la modale
 * @param {Function} onClose - Callback appelé pour fermer la modale
 */
export default function ContactModal({ isOpen, onClose }) {
  /* État local du formulaire */
  const [form, setForm] = useState(initialFormState);

  /**
   * Bloque le scroll du body quand la modale est ouverte
   * pour éviter le défilement en arrière-plan
   */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    /* Nettoyage au démontage du composant */
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  /**
   * Met à jour le champ correspondant dans l'état du formulaire
   * @param {React.ChangeEvent} e - Événement de changement
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Gère la soumission du formulaire
   * Pour l'instant log les données — à connecter à une vraie API plus tard
   * @param {React.FormEvent} e - Événement de soumission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    /* TODO: envoyer les données à une API / base de données */
    console.log("Données du formulaire :", form);
    setForm(initialFormState);
    onClose();
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          {/* Carte de la modale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="bg-dark-700 border border-dark-500 rounded-2xl p-8 w-full max-w-md shadow-2xl"
          >
            {/* ---- En-tête de la modale ---- */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Me contacter</h2>
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
              {/* Nom ou entreprise */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Nom ou entreprise{" "}
                  <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  placeholder="Jean Dupont / Acme Corp."
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Numéro de téléphone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={form.telephone}
                  onChange={handleChange}
                  placeholder="+33 6 00 00 00 00"
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Motif de la demande */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Motif de la demande{" "}
                  <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="motif"
                  value={form.motif}
                  onChange={handleChange}
                  required
                  placeholder="Création de site, freelance, collaboration..."
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              {/* Description de la demande */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description de la demande{" "}
                  <span className="text-accent">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Décrivez votre projet ou votre demande en détail..."
                  className="w-full px-4 py-2.5 bg-dark-800 border border-dark-500 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-dark-500 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all hover:shadow-lg"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
