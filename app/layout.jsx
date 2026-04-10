import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

/* ============================================================
   Configuration de la police Inter (Google Fonts)
   La variable CSS --font-inter est utilisée dans globals.css
   ============================================================ */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* ============================================================
   Métadonnées de l'application (utilisées pour le SEO)
   ============================================================ */
export const metadata = {
  title: "Mickael MARTONE — Développeur Web",
  description:
    "Portfolio de Mickael MARTONE, développeur web full stack spécialisé en React, Next.js et PHP.",
  keywords: [
    "développeur web",
    "React",
    "Next.js",
    "PHP",
    "portfolio",
    "freelance",
  ],
  icons: {
    icon: "/image/favicon.ico",
  },
};

/**
 * RootLayout — Layout racine appliqué à toutes les pages
 *
 * Il englobe systématiquement :
 *   - La Navbar (fixée en haut)
 *   - Le contenu de la page (children)
 *   - Le Footer
 *
 * @param {React.ReactNode} children - Le contenu de la page en cours
 */
export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-dark-900 text-white flex flex-col min-h-screen antialiased">
        {/* Barre de navigation commune à toutes les pages */}
        <Navbar />

        {/* Contenu principal de chaque page */}
        <div className="flex-1">{children}</div>

        {/* Pied de page commun à toutes les pages */}
        <Footer />

        {/* Bouton retour en haut */}
        <BackToTop />
      </body>
    </html>
  );
}
