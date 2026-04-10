"use client";

import { motion } from "framer-motion";

/**
 * ArticleCard — Carte d'article avec effet de hover
 *
 * Effets visuels :
 *  - Élévation vers le haut au survol (translateY)
 *  - Bordure qui vire à l'accent au survol
 *  - Bande colorée (gradient) qui apparaît en haut au survol
 *  - Titre qui prend la couleur accent au survol
 *
 * @param {Object} article              - Données de l'article
 * @param {string} article.title        - Titre de l'article
 * @param {string} article.description  - Description / extrait de l'article
 * @param {string} article.category     - Catégorie (ex: "Next.js", "CSS")
 * @param {string} article.date         - Date de publication (ex: "15 Mars 2024")
 * @param {number} article.readTime     - Temps de lecture estimé en minutes
 * @param {number} index                - Index dans la liste (pour décaler l'animation)
 */
export default function ArticleCard({ article, index }) {
  return (
    <motion.article
      /* Entrée : fondu + glissement depuis le bas */
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      /* Élévation au survol */
      whileHover={{ y: -7 }}
      className="group bg-dark-700 border border-dark-500 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-xl cursor-pointer"
    >
      {/* Bande dégradée en haut — invisible au repos, apparaît au survol */}
      <div className="h-1 bg-linear-to-r from-accent to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6">
        {/* ---- Méta : catégorie + date ---- */}
        <div className="flex items-center justify-between mb-4">
          {/* Badge de catégorie */}
          <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
            {article.category}
          </span>
          {/* Date de publication */}
          <span className="text-gray-500 text-xs">{article.date}</span>
        </div>

        {/* ---- Titre ---- */}
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h3>

        {/* ---- Description / extrait ---- */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {article.description}
        </p>

        {/* ---- Pied de carte : temps de lecture + CTA ---- */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-dark-500/50">
          <span className="text-gray-500 text-xs">
            {article.readTime} min de lecture
          </span>
          <span className="text-accent text-sm font-medium group-hover:underline underline-offset-2">
            Lire l'article →
          </span>
        </div>
      </div>
    </motion.article>
  );
}
