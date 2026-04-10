"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ContactModal from "@/components/ContactModal";

/**
 * HomePage — Page d'accueil du portfolio
 *
 * Structure :
 *  1. HeroSection    → présentation + photo + CTA
 *  2. SkillsSection  → grille des compétences avec logos
 *  3. Section CTA    → bouton "Me contacter" qui ouvre la modale
 *
 * La modale ContactModal est gérée localement par l'état `isContactOpen`.
 */
export default function HomePage() {
  /* Contrôle l'affichage de la modale de contact */
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main>
      {/* ---- 1. Section héro : présentation + photo ---- */}
      <HeroSection />

      {/* ---- Séparateur moderne entre le héro et les compétences ---- */}
      <div className="relative flex items-center justify-center py-2 px-4">
        <div className="max-w-7xl w-full mx-auto flex items-center gap-4">
          {/* Ligne gauche : dégradé de transparent vers l'accent */}
          <div className="flex-1 h-px bg-linear-to-r from-transparent via-dark-500 to-accent/60" />

          {/* Losange central décoratif */}
          <div className="w-2 h-2 rotate-45 bg-accent shrink-0" />

          {/* Ligne droite : dégradé de l'accent vers transparent */}
          <div className="flex-1 h-px bg-linear-to-l from-transparent via-dark-500 to-accent/60" />
        </div>
      </div>

      {/* ---- 2. Section compétences : grille des logos tech ---- */}
      <SkillsSection />

      {/* ---- 3. Section appel à l'action : bouton "Me contacter" ---- */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            Un projet en tête ?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            N'hésitez pas à me contacter pour discuter de votre projet ou d'une
            opportunité de collaboration.
          </p>
          {/* Bouton principal — ouvre la modale de contact */}
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-10 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl text-lg"
          >
            Me contacter
          </button>
        </div>
      </section>

      {/* Modale de contact */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
