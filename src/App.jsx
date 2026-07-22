import { useEffect, useMemo, useState } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import ContactSection from './components/ContactSection';
import GithubActivity from './components/GithubActivity';
import HeroSection from './components/HeroSection';
import Navigation from './components/Navigation';
import ProjectModal from './components/ProjectModal';
import ProjectsSection from './components/ProjectsSection';
import TechStack from './components/TechStack';
import { useScrollProgress } from './hooks/useScrollProgress';
import { PROJECTS, TRANSLATIONS } from './data';
import './index.css';

const ESSENTIAL_TECHS = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'CSS3',
  'Tailwind CSS',
  'Bootstrap',
  'Vite',
  'Three.js',
  'Android Studio',
  'Jetpack Compose',
  'Kotlin',
  'Java',
  'C#',
  'C++',
  'C Language',
  '.NET',
  'Unreal Engine',
  'Unity 2D',
  'Docker',
  'FastAPI',
  'Spring Boot',
  'PostgreSQL',
  'MySQL',
  'SQL Server',
  'MongoDB',
  'SQLite',
  'Firebase',
  'GitHub Actions',
];

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio-lang') || 'en');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const scrolled = useScrollProgress();

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang);
  }, [lang]);

  const orderedProjects = useMemo(
    () => [...PROJECTS].sort((a, b) => {
      const yearDifference = Number(b.meta?.year ?? 0) - Number(a.meta?.year ?? 0);
      return yearDifference || b.id - a.id;
    }),
    [],
  );

  const uniqueTechs = useMemo(() => {
    const availableTechs = new Set(orderedProjects.flatMap((p) => p.tech));
    return ESSENTIAL_TECHS.filter((tech) => availableTechs.has(tech));
  }, [orderedProjects]);

  const visibleProjects = useMemo(
    () => (
      selectedTechs.length > 0
        ? orderedProjects.filter((p) => selectedTechs.some((tech) => p.tech.includes(tech)))
        : orderedProjects
    ),
    [orderedProjects, selectedTechs],
  );

  return (
    <div className="antialiased text-stone-200">
      <div className="fixed top-0 left-0 h-1 bg-orange-600 z-[100] transition-all duration-150" style={{ width: `${scrolled}%` }}></div>

      <AnimatedBackground />

      <Navigation
        lang={lang}
        setLang={setLang}
        t={t}
        isLangMenuOpen={isLangMenuOpen}
        setIsLangMenuOpen={setIsLangMenuOpen}
      />

      <HeroSection t={t} />

      <ProjectsSection
        visibleProjects={visibleProjects}
        selectedTechs={selectedTechs}
        clearSelectedTechs={() => setSelectedTechs([])}
        setSelectedProject={setSelectedProject}
        lang={lang}
        t={t}
      />

      <TechStack
        uniqueTechs={uniqueTechs}
        selectedTechs={selectedTechs}
        setSelectedTechs={setSelectedTechs}
        lang={lang}
        t={t}
      />

      <GithubActivity t={t} />

      <ContactSection t={t} />

      <footer className="py-8 text-center text-stone-600 text-xs font-bold uppercase tracking-widest">
        <p>{t.footer}</p>
      </footer>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} lang={lang} t={t} />
      )}
    </div>
  );
}

export default App;
