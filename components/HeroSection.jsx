"use client";

import { motion } from "framer-motion";

/* ============================================================
   Variantes d'animation Framer Motion
   Définies en dehors du composant pour éviter les re-créations
   ============================================================ */

/* Animation d'entrée : glissement depuis la gauche */
const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

/* Animation d'entrée : glissement depuis la droite */
const imageVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut", delay: 0.2 },
  },
};

/**
 * HeroSection — Section d'introduction en haut de la page d'accueil
 *
 * Affiche :
 *  - Un badge de disponibilité (statut freelance)
 *  - Le nom et le titre du développeur
 *  - Une courte description
 *  - Deux boutons CTA (compétences / projets)
 *  - Des statistiques rapides
 *  - Un placeholder photo (à remplacer par ta vraie photo)
 *
 * TODO: remplacer le placeholder photo par un composant <Image> de Next.js
 *       avec ta vraie photo (ex: <Image src="/photo.jpg" alt="..." fill />)
 */
export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      {/* ---- Éléments décoratifs de fond (cercles lumineux flous) ---- */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none animate-pulse-slow"
        style={{ backgroundColor: "rgba(108, 99, 255, 0.12)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none animate-pulse-slow"
        style={{
          backgroundColor: "rgba(147, 51, 234, 0.1)",
          animationDelay: "1.5s",
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
        {/* ======================================================
            Colonne gauche : Texte de présentation
        ====================================================== */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Titre principal */}
          <div>
            <p className="text-gray-400 text-lg mb-2">Bonjour, je suis</p>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Mickael {/* Dégradé violet sur le nom de famille */}
              <span className="bg-linear-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                MARTONE
              </span>
            </h1>
            <h2 className="text-2xl lg:text-3xl font-medium text-gray-300 mt-3">
              Développeur Web Full Stack
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Passionné par la création d'expériences web modernes et
            performantes. Je conçois des applications de A à Z avec les
            technologies les plus récentes du web.
          </p>

          {/* Boutons d'action (CTA) */}
          <div className="flex flex-wrap gap-4 pt-2">
            {/* Ancre vers la section compétences sur la même page */}
            <a
              href="#competences"
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Voir mes compétences
            </a>
            {/* Lien vers la page projets */}
            <a
              href="/projets"
              className="px-6 py-3 border border-dark-500 text-gray-300 hover:border-accent hover:text-accent font-medium rounded-lg transition-all duration-200"
            >
              Mes projets
            </a>
          </div>

          {/* Boutons CV */}
          <div className="flex flex-wrap gap-4">
            {["Cv de Mickael", "Cv ATS"].map((label) => (
              <div key={label} className="relative group/cv">
                <button
                  disabled
                  className="px-6 py-3 border border-dark-500 text-gray-500 font-medium rounded-lg cursor-not-allowed opacity-60"
                >
                  {label}
                </button>
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-dark-700 text-gray-300 text-xs px-3 py-1.5 rounded-md border border-dark-500 opacity-0 group-hover/cv:opacity-100 transition-opacity duration-200 pointer-events-none">
                  En cours de création
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ======================================================
            Colonne droite : Photo de profil (placeholder)
        ====================================================== */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Halo lumineux derrière la photo */}
            <div
              className="absolute inset-0 rounded-full blur-2xl animate-pulse-slow"
              style={{ backgroundColor: "rgba(108, 99, 255, 0.2)" }}
            />

            {/* ------------------------------------------------
                Placeholder photo — à remplacer par ton image !
                Exemple avec Next.js Image :
                <Image
                  src="/photo.jpg"
                  alt="Mickael MARTONE"
                  fill
                  className="object-cover"
                  priority
                />
            ------------------------------------------------ */}
            <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-accent/30 shadow-2xl">
              <div className="w-full h-full bg-linear-to-br from-dark-700 to-dark-600 flex flex-col items-center justify-center">
                <p className="text-gray-400 text-sm font-medium">A venir !</p>
              </div>
            </div>

            {/* Badge flottant animé */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-dark-700 border border-dark-500 rounded-xl px-4 py-2 shadow-lg"
            >
              <p className="text-white text-sm font-semibold">Next.js 16</p>
              <p className="text-gray-400 text-xs">Full Stack</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
