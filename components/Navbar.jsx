"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import ContactModal from "./ContactModal";

/* ============================================================
   Configuration des liens de navigation
   Ajoute ou modifie les entrées ici pour changer le menu
   ============================================================ */
const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Articles", href: "/articles" },
  { label: "Projet", href: "/projets" },
];

/**
 * Navbar — Barre de navigation fixée en haut de toutes les pages
 *
 * Fonctionnalités :
 *  - Logo + nom cliquables (retour accueil)
 *  - Liens actifs surlignés selon la route courante
 *  - Bouton "Contact" ouvre la modale ContactModal
 *  - Grande taille en haut de page, réduite au scroll (height + texte)
 *  - Fond transparent en haut, fond sombre plein au scroll (sans blur)
 *  - Menu hamburger responsive sur mobile (animé avec framer-motion)
 */
export default function Navbar() {
  /* Contrôle l'ouverture du menu mobile */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* Contrôle l'affichage de la modale de contact */
  const [isContactOpen, setIsContactOpen] = useState(false);

  /* Détecte si l'utilisateur a scrollé pour changer le style de la navbar */
  const [isScrolled, setIsScrolled] = useState(false);

  /* Route active — pour surligner le bon lien */
  const pathname = usePathname();

  /**
   * Écoute le scroll de la page
   * Passe isScrolled à true dès que le scroll dépasse 20px
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Ferme le menu mobile — appelé après un clic sur un lien
   */
  const closeMenu = () => setIsMenuOpen(false);

  /**
   * Ouvre la modale de contact et ferme le menu mobile si ouvert
   */
  const openContact = () => {
    setIsContactOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? /* Au scroll : fond sombre plein (pas de blur pour éviter l'effet blanc) */
              "bg-dark-900 shadow-lg border-b border-dark-500/40"
            : /* En haut de page : totalement transparent */
              "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
           * Hauteur de la navbar :
           *  - En haut de page (non scrollé) : h-24 (plus grande)
           *  - Après scroll                  : h-16 (taille standard)
           * transition-all assure l'animation fluide entre les deux états
           */}
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-24"}`}>

            {/* ---- Gauche : Logo + Nom ---- */}
            <Link href="/" className="flex items-center gap-3 group">
              {/*
               * Logo : légèrement plus grand en haut de page
               * w-10/h-10 → w-9/h-9 au scroll
               */}
              <Logo className={`transition-all duration-300 group-hover:scale-110 ${isScrolled ? "w-9 h-9" : "w-11 h-11"}`} />
              {/*
               * Nom : text-xl en haut de page, text-lg au scroll
               */}
              <span className={`text-white font-bold tracking-wide group-hover:text-accent-light transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"}`}>
                Mickael{" "}
                <span className="text-accent">MARTONE</span>
              </span>
            </Link>

            {/* ---- Droite : Liens desktop ---- */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-medium transition-all duration-300 hover:text-accent group ${
                    /* Taille des liens : text-base en haut, text-sm au scroll */
                    isScrolled ? "text-sm" : "text-base"
                  } ${
                    pathname === link.href ? "text-accent" : "text-gray-300"
                  }`}
                >
                  {link.label}
                  {/* Ligne de soulignement animée au survol */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      pathname === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}

              {/* Bouton Contact — ouvre la modale */}
              <button
                onClick={openContact}
                className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                Contact
              </button>
            </div>

            {/* ---- Icône hamburger (mobile uniquement) ---- */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-dark-700 transition-colors"
              aria-label="Ouvrir le menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  /* Icône croix (fermeture) */
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  /* Icône hamburger (ouverture) */
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ---- Menu mobile animé (glissement vers le bas) ---- */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-dark-800/95 backdrop-blur-md border-t border-dark-500/40"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`block text-sm font-medium py-2 transition-colors hover:text-accent ${
                      pathname === link.href ? "text-accent" : "text-gray-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={openContact}
                  className="w-full px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-lg transition-all"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modale de contact partagée */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
