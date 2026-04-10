"use client";

import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiSass,
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiClaude,
} from "react-icons/si";

/* ============================================================
   Compétences regroupées par catégorie
   Chaque catégorie a un titre et une liste de skills
   ============================================================ */
const categories = [
  {
    label: "Frontend",
    skills: [
      { icon: SiHtml5,      name: "HTML5",      color: "#E44D26", glow: "rgba(228, 77, 38, 0.45)" },
      { icon: SiCss,        name: "CSS3",        color: "#1572B6", glow: "rgba(21, 114, 182, 0.45)" },
      { icon: SiSass,       name: "SASS",        color: "#CC6699", glow: "rgba(204, 102, 153, 0.45)" },
      { icon: SiBootstrap,  name: "Bootstrap",   color: "#7952B3", glow: "rgba(121, 82, 179, 0.45)" },
      { icon: SiTailwindcss,name: "Tailwind",    color: "#06B6D4", glow: "rgba(6, 182, 212, 0.45)" },
    ],
  },
  {
    label: "Frameworks & Langages",
    skills: [
      { icon: SiJavascript, name: "JavaScript",  color: "#F7DF1E", glow: "rgba(247, 223, 30, 0.35)" },
      { icon: SiReact,      name: "React",       color: "#61DAFB", glow: "rgba(97, 218, 251, 0.35)" },
      { icon: SiNextdotjs,  name: "Next.js",     color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.15)" },
      { icon: SiPhp,        name: "PHP",         color: "#8892BF", glow: "rgba(136, 146, 191, 0.45)" },
    ],
  },
  {
    label: "Outils",
    skills: [
      { icon: SiClaude,     name: "Claude Code", color: "#D97757", glow: "rgba(217, 119, 87, 0.45)" },
    ],
  },
];

/**
 * SkillCard — Carte individuelle d'une compétence
 */
function SkillCard({ skill, index }) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{
        scale: 1.07,
        y: -6,
        boxShadow: `0 0 28px ${skill.glow}`,
        borderColor: skill.color,
      }}
      className="flex flex-col items-center gap-3 p-6 bg-dark-700 border border-dark-500 rounded-xl cursor-default transition-colors duration-300 group"
    >
      <Icon
        size={50}
        style={{ color: skill.color }}
        className="transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
      />
      <p className="text-gray-300 font-medium text-sm group-hover:text-white transition-colors">
        {skill.name}
      </p>
    </motion.div>
  );
}

/**
 * SkillsSection — Section "Mes Technologies" regroupée par catégorie
 */
export default function SkillsSection() {
  return (
    <section id="competences" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ---- En-tête de section ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Mes Technologies
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Les outils et frameworks que j'utilise au quotidien pour créer
            des expériences web modernes et performantes.
          </p>
        </motion.div>

        {/* ---- Groupes de catégories ---- */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category.label}>
              {/* Titre de catégorie */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-5 bg-accent rounded-full" />
                <h3 className="text-gray-300 font-semibold text-sm uppercase tracking-widest">
                  {category.label}
                </h3>
                <div className="flex-1 h-px bg-dark-500/60" />
              </div>

              {/* Grille des cartes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
