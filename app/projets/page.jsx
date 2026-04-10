import ProjectCard from "@/components/ProjectCard";

/* ============================================================
   Section 1 — Jeux créés avec JavaScript
   Chaque jeu est un lien externe vers le projet déployé.
   Remplace les `href` par les vraies URLs de tes jeux.
   ============================================================ */
const jsGames = [
  {
    id: 1,
    title: "Jeu du Pendu",
    description:
      "Un classique ! Devinez le mot caché lettre par lettre avant que le bonhomme ne soit complété. Plusieurs niveaux de difficulté disponibles.",
    href: "https://mickael-dvlp.github.io/01.Projet-Jeu-du-Pendu/",
    /* Remplace par l'URL de ton dépôt GitHub */
    github: "https://github.com/mickael-dvlp/01.Projet-Jeu-du-Pendu.git",
    tags: ["JavaScript", "HTML", "CSS"],
    emoji: "🎯",
  },
  {
    id: 2,
    title: "Morpion",
    description:
      "Le jeu de morpion (Tic-Tac-Toe) classique avec mode 2 joueurs et intelligence artificielle. Soyez le premier à aligner 3 symboles !",
    href: "https://mickael-dvlp.github.io/02.Projet-Morpion-Vanilla-/",
    /* Remplace par l'URL de ton dépôt GitHub */
    github: "https://github.com/mickael-dvlp/02.Projet-Morpion-Vanilla-.git",
    tags: ["JavaScript", "HTML", "CSS"],
    emoji: "⭕",
  },
  {
    id: 3,
    title: "Puissance 4",
    description:
      "Affrontez l'ordinateur dans une partie de Puissance 4. Alignez 4 jetons de votre couleur horizontalement, verticalement ou en diagonale avant votre adversaire !",
    href: "https://mickael-dvlp.github.io/04.Projet-jeu-Puissance4/",
    /* Remplace par l'URL de ton dépôt GitHub */
    github: "https://github.com/mickael-dvlp/04.Projet-jeu-Puissance4.git",
    tags: ["JavaScript", "HTML", "CSS"],
    emoji: "🔴",
  },
];

/* ============================================================
   Section 2 — Projets Personnels
   Remplis ce tableau avec tes vrais projets personnels.
   Structure identique aux autres sections.
   ============================================================ */
const personalProjects = [
  /* Exemple à décommenter et personnaliser :
  {
    id: 1,
    title: "Mon projet perso",
    description: "Description de mon projet.",
    href: "https://mon-projet.vercel.app",
    tags: ["Next.js", "Tailwind"],
    emoji: "🚀",
  },
  */
];

/* ============================================================
   Section 3 — Projets Vitrine
   Remplis ce tableau avec tes projets réalisés pour des clients.
   ============================================================ */
const showcaseProjects = [
  /* Exemple à décommenter et personnaliser :
  {
    id: 1,
    title: "Site vitrine client",
    description: "Site vitrine pour une entreprise locale.",
    href: "https://client-site.fr",
    tags: ["Next.js", "Tailwind", "PHP"],
    emoji: "🏢",
  },
  */
];

/**
 * SectionTitle — En-tête de section avec barre verticale décorative accent
 *
 * @param {string} title    - Titre principal de la section
 * @param {string} subtitle - Sous-titre descriptif (optionnel)
 */
function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
        {/* Barre verticale accent décorative */}
        <span className="w-1 h-8 bg-accent rounded-full inline-block flex-shrink-0" />
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 mt-2 ml-4 text-sm">{subtitle}</p>
      )}
    </div>
  );
}

/**
 * EmptySection — Affichage placeholder pour une section sans projets
 * Indique visuellement que des projets seront ajoutés prochainement
 *
 * @param {string} message - Message principal à afficher
 */
function EmptySection({ message }) {
  return (
    <div className="border-2 border-dashed border-dark-500 rounded-xl p-14 text-center">
      <p className="text-gray-400 text-lg">🚧 {message}</p>
      <p className="text-gray-600 text-sm mt-2">
        Des projets seront ajoutés prochainement.
      </p>
    </div>
  );
}

/**
 * ProjetsPage — Page regroupant tous les projets du portfolio
 *
 * Structure :
 *  1. En-tête de page
 *  2. Section "Jeux créé avec JS"     → 3 cartes cliquables (liens externes)
 *  3. Section "Projet Personnel"      → à remplir
 *  4. Section "Projet vitrine"        → à remplir
 *
 * Pour ajouter un projet : ajoute un objet dans le tableau correspondant.
 */
export default function ProjetsPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* ---- En-tête de la page ---- */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Mes Projets
          </h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-lg">
            Une sélection de mes réalisations — des jeux JavaScript aux projets
            professionnels.
          </p>
        </div>

        {/* ==================================================
            Section 1 — Jeux créés avec JS
            Les cartes sont des liens vers les jeux en ligne
        ================================================== */}
        <section>
          <SectionTitle
            title="Jeux créé avec JS"
            subtitle="Des jeux interactifs développés en JavaScript vanilla — clique pour jouer !"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jsGames.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* ==================================================
            Section 2 — Projets Personnels
        ================================================== */}
        <section>
          <SectionTitle
            title="Projet Personnel"
            subtitle="Mes projets personnels et expérimentations"
          />
          {personalProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <EmptySection message="Projets personnels à venir" />
          )}
        </section>

        {/* ==================================================
            Section 3 — Projets Vitrine
        ================================================== */}
        <section>
          <SectionTitle
            title="Projet vitrine"
            subtitle="Projets réalisés pour des clients et à des fins de démonstration"
          />
          {showcaseProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcaseProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <EmptySection message="Projets vitrine à venir" />
          )}
        </section>
      </div>
    </main>
  );
}
