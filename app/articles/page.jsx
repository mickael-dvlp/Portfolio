/**
 * ArticlesPage — Page listant tous les articles du blog
 *
 * Pour ajouter un article : importe ArticleCard et ajoute tes articles
 * dans un tableau, puis remplace le bloc EmptySection par la grille.
 */
export default function ArticlesPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ---- En-tête de la page ---- */}
        <div className="text-center mb-14">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Mes Articles
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-lg">
            Partage de connaissances, tutoriels et retours d'expérience sur
            le développement web moderne.
          </p>
        </div>

        {/* ---- Placeholder — aucun article pour le moment ---- */}
        <div className="border-2 border-dashed border-dark-500 rounded-xl p-14 text-center">
          <p className="text-gray-400 text-lg">🚧 Articles à venir</p>
          <p className="text-gray-600 text-sm mt-2">
            Des articles seront ajoutés prochainement.
          </p>
        </div>

      </div>
    </main>
  );
}
