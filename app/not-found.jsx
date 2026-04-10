import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      {/* Éléments décoratifs de fond */}
      <div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "rgba(108, 99, 255, 0.08)" }}
      />
      <div
        className="fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "rgba(147, 51, 234, 0.07)" }}
      />

      <div className="text-center space-y-6 relative">
        {/* Code d'erreur */}
        <p className="text-8xl lg:text-9xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent select-none">
          404
        </p>

        {/* Séparateur */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-dark-500" />
          <span className="text-dark-500 text-xs uppercase tracking-widest">page introuvable</span>
          <div className="h-px w-16 bg-dark-500" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">
            Cette page n'existe pas
          </h1>
          <p className="text-gray-400 max-w-sm mx-auto">
            La page que tu cherches a peut-être été déplacée, supprimée ou n'a jamais existé.
          </p>
        </div>

        {/* Bouton retour */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
