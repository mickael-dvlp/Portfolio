"use client";

import { motion } from "framer-motion";

/**
 * Template — Wrapper de transition appliqué à chaque changement de route
 *
 * Contrairement au layout, le template est re-monté à chaque navigation,
 * ce qui permet de déclencher l'animation d'entrée à chaque changement de page.
 */
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
