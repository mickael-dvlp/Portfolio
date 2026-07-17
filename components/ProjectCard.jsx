"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

/**
 * ProjectCard — Carte de projet avec effet hover et lien externe optionnel
 *
 * Si `project.href` est renseigné, toute la carte devient un lien cliquable
 * qui s'ouvre dans un nouvel onglet. Sinon, c'est juste un bloc d'affichage.
 *
 * Effets visuels :
 *  - Élévation vers le haut au survol
 *  - Bande dégradée en haut qui s'illumine au survol
 *  - Bordure accent et ombre au survol
 *  - Icône de lien externe visible au survol si href présent
 *
 * @param {Object}   project              - Données du projet
 * @param {string}   project.title        - Titre du projet
 * @param {string}   project.description  - Description courte
 * @param {string}   [project.href]       - URL externe (optionnel — rend la carte cliquable)
 * @param {string}   [project.github]     - URL du dépôt GitHub (optionnel)
 * @param {string[]} [project.tags]       - Liste des technos utilisées
 * @param {string}   [project.emoji]      - Emoji représentant le projet
 * @param {number}   index                - Index pour décaler l'animation d'entrée
 */
export default function ProjectCard({ project, index }) {
  const titleId = useId();

  /* Contenu interne de la carte (commun lien/div) */
  const cardContent = (
    <>
      {/* Bande dégradée en haut — s'illumine au survol */}
      <div className="h-1 bg-linear-to-r from-accent via-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6">
        {/* ---- En-tête : emoji + titre + icône lien externe ---- */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Image ou emoji représentant le projet (optionnel) */}
            {project.image ? (
              <Image src={project.image} alt={project.title} width={40} height={40} className="object-contain" />
            ) : project.emoji ? (
              <span className="text-3xl">{project.emoji}</span>
            ) : null}
            <h3
              id={titleId}
              className="text-white font-semibold text-lg group-hover:text-accent transition-colors leading-snug"
            >
              {project.title}
            </h3>
          </div>
          {/* Icône lien externe — visible uniquement si href est fourni */}
          {project.href && (
            <FiExternalLink
              className="text-gray-500 group-hover:text-accent transition-colors shrink-0 mt-1"
              size={18}
            />
          )}
        </div>

        {/* Description du projet */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tags de technologies utilisées (optionnel) */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-dark-500/50 text-gray-400 text-xs rounded-md border border-dark-500 group-hover:border-accent/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ---- Lien GitHub — affiché en bas à droite si github est fourni ---- */}
        {project.github && (
          <div className="flex justify-end mt-4 pt-3 border-t border-dark-500/50">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 pointer-events-auto flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-medium transition-colors duration-200"
            >
              <FaGithub size={14} />
              Voir lien Github
            </a>
          </div>
        )}
      </div>
    </>
  );

  return (
    <motion.div
      /* Entrée : fondu + glissement depuis le bas */
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      /* Élévation au survol */
      whileHover={{ y: -7 }}
      className="relative group bg-dark-700 border border-dark-500 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl"
    >
      {/* Le lien principal couvre la carte sans contenir le lien GitHub. */}
      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-labelledby={titleId}
          className="absolute inset-0 z-1 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      )}
      <div className={project.href ? "relative z-2 pointer-events-none" : undefined}>
        {cardContent}
      </div>
    </motion.div>
  );
}
