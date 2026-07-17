import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CodeRain from "@/components/CodeRain";
import MotionProvider from "@/components/MotionProvider";
import { ContactModalProvider } from "@/components/ContactModalProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL("https://mickael-martone-dvp.com"),
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
        <MotionProvider>
          {/* Pluie de code en fond — fixed, derrière tout le contenu */}
          <CodeRain />

          {/* Contenu principal au-dessus de l'animation */}
          <ContactModalProvider>
            <div className="relative z-1 flex flex-col flex-1">
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ContactModalProvider>

          {/* Bouton retour en haut */}
          <BackToTop />
        </MotionProvider>

        {/* Notifications toast */}
        <Toaster position="bottom-center" richColors />

        {/* Mesure des performances en production */}
        <SpeedInsights />
      </body>
    </html>
  );
}
