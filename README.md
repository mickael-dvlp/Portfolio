# Portfolio — Mickael MARTONE

Portfolio personnel de Mickael MARTONE, développeur web full stack. Conçu pour présenter mes compétences, mes projets et mes articles.

## Technologies utilisées

- Framework : Next.js 16 (App Router)
- Style : Tailwind CSS v4
- Icônes : React Icons
- Langage : JavaScript (JSX)
- Déploiement : Vercel _(prévu)_

## Structure du projet

```
app/
├── layout.jsx          # Layout racine (Navbar, Footer, BackToTop)
├── template.jsx        # Transitions de page (fondu entre les routes)
├── page.jsx            # Page d'accueil
├── not-found.jsx       # Page 404 personnalisée
├── articles/
│   └── page.jsx        # Page articles (à venir)
└── projets/
    └── page.jsx        # Page projets

components/
├── Navbar.jsx          # Barre de navigation responsive
├── Footer.jsx          # Pied de page
├── Logo.jsx            # Logo (public/image/logo/logov1.png)
├── HeroSection.jsx     # Section d'accueil (nom, titre, CTA)
├── SkillsSection.jsx   # Grille des compétences par catégorie
├── ProjectCard.jsx     # Carte de projet
├── ArticleCard.jsx     # Carte d'article
├── ContactModal.jsx    # Modale de contact
└── BackToTop.jsx       # Bouton retour en haut de page
```

## Pages

### Accueil (`/`)

Présentation personnelle avec photo, titre, liens CTA vers les compétences et les projets. Section compétences organisée par catégorie : **Frontend**, **Frameworks & Langages**, **Outils**.

### Projets (`/projets`)

Trois sections :

- **Jeux créés avec JS** — projets JavaScript vanilla (Pendu, Morpion, Puissance 4)
- **Projets personnels** — à venir
- **Projets vitrines** — à venir

### Articles (`/articles`)

Blog technique à venir — tutoriels et retours d'expérience sur le développement web.

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans le navigateur.

> Le projet utilise Webpack (`--webpack`) en développement pour contourner un bug Turbopack sur Windows avec Next.js 16.
