"use client";

import { MotionConfig } from "framer-motion";

/** Respecte automatiquement la préférence système de réduction des animations. */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
