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

function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'es');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [filterTech, setFilterTech] = useState(null);
  const scrolled = useScrollProgress();

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const uniqueTechs = useMemo(() => {
    const all = PROJECTS.flatMap((p) => p.tech);
    return [...new Set(all)].sort();
  }, []);

  const visibleProjects = useMemo(
    () => (filterTech ? PROJECTS.filter((p) => p.tech.includes(filterTech)) : PROJECTS),
    [filterTech],
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

      <TechStack
        uniqueTechs={uniqueTechs}
        filterTech={filterTech}
        setFilterTech={setFilterTech}
        lang={lang}
        t={t}
      />

      <ProjectsSection
        visibleProjects={visibleProjects}
        filterTech={filterTech}
        setFilterTech={setFilterTech}
        setSelectedProject={setSelectedProject}
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
