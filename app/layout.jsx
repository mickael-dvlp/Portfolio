import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Toaster } from "sonner";

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
  title: "Mickael MARTONE — Développeur Web Full Stack",
  description:
    "Portfolio de Mickael MARTONE, développeur web full stack freelance spécialisé en React, Next.js et PHP. Création de sites web modernes, performants et sur mesure.",
  keywords: [
    "développeur web",
    "développeur full stack",
    "React",
    "Next.js",
    "PHP",
    "portfolio",
    "freelance",
    "Mickael MARTONE",
  ],
  icons: {
    icon: "/image/favicon.ico",
  },
  openGraph: {
    title: "Mickael MARTONE — Développeur Web Full Stack",
    description:
      "Développeur web full stack freelance spécialisé en React, Next.js et PHP. Découvrez mes projets et contactez-moi.",
    images: ["/image/logo/logov1.png"],
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary",
    title: "Mickael MARTONE — Développeur Web Full Stack",
    description:
      "Développeur web full stack freelance spécialisé en React, Next.js et PHP.",
    images: ["/image/logo/logov1.png"],
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

        {/* Notifications toast */}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
