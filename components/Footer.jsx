"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";
import Logo from "./Logo";
import ContactModal from "./ContactModal";

/* ============================================================
   Liens vers les réseaux sociaux
   Remplace les href placeholder par tes vraies URLs
   ============================================================ */
const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/mickael-dvlp",
    label: "GitHub",
    /* Couleur au survol correspondant à la marque GitHub */
    hoverClass: "hover:text-white",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com/placeholder",
    label: "YouTube",
    /* Couleur au survol correspondant à la marque YouTube */
    hoverClass: "hover:text-red-500",
  },
  {
    icon: FaLinkedin,
    href: "https://linkedin.com/in/placeholder",
    label: "LinkedIn",
    /* Couleur au survol correspondant à la marque LinkedIn */
    hoverClass: "hover:text-blue-400",
  },
];

/**
 * Footer — Pied de page commun à toutes les pages
 *
 * Contient :
 *  - Logo + nom (lien vers l'accueil)
 *  - Icônes des réseaux sociaux (GitHub, YouTube, LinkedIn)
 *  - Bouton "Me contacter" ouvrant la modale ContactModal
 *  - Ligne de copyright
 */
export default function Footer() {
  /* Contrôle l'affichage de la modale de contact */
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <footer className="bg-dark-800 border-t border-dark-500/40 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* ---- Rangée principale ---- */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo + Nom */}
            <Link href="/" className="flex items-center gap-3 group">
              <Logo className="w-8 h-8" />
              <span className="text-white font-semibold group-hover:text-accent-light transition-colors">
                Mickael <span className="text-accent">MARTONE</span>
              </span>
            </Link>

            {/* Icônes réseaux sociaux — gap-8 pour l'espacement entre les logos */}
            <div className="flex items-center gap-8">
              {socialLinks.map(({ icon: Icon, href, label, hoverClass }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  /* Transition d'agrandissement + changement de couleur au survol */
                  className={`text-gray-400 ${hoverClass} transition-all duration-200 hover:scale-125`}
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>

            {/* Bouton "Me contacter" */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
            >
              Me contacter
            </button>
          </div>

          {/* ---- Ligne de copyright ---- */}
          <div className="mt-8 pt-6 border-t border-dark-500/30 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Mickael MARTONE. Tous droits
              réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Modale de contact */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
