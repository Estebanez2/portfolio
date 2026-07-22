import { useLayoutEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import TechIcon from './TechIcon';

const TECH_LABELS = {
  '2D Modeling': '2D Model',
  '3D Modeling': '3D Model',
  'A* Pathfinding': 'A* Path',
  'Android Studio': 'Android',
  'AutoCAD 2023': 'AutoCAD',
  'Bluetooth Protocol': 'Bluetooth',
  'C Language': 'C',
  CSS3: 'CSS',
  'Epic Online Services': 'EOS',
  'Game Networking': 'Networking',
  'GitHub Actions': 'Actions',
  'Google Calendar API': 'Calendar',
  JavaScript: 'JS',
  'Jetpack Compose': 'Compose',
  'Linux Kernel': 'Kernel',
  'Material Design': 'Material',
  'NVIDIA DLSS': 'DLSS',
  'Process Management': 'Processes',
  'Responsive Design': 'Responsive',
  'Spring Boot': 'Spring',
  'SQL Server': 'SQL Server',
  'Tailwind CSS': 'Tailwind',
  TypeScript: 'TS',
  'Unreal Engine': 'Unreal',
  'Unity 2D': 'Unity',
  'Windows Forms': 'WinForms',
};

const TechStack = ({ uniqueTechs, selectedTechs, setSelectedTechs, lang, t }) => {
  const sectionRef = useRef(null);
  const previousSectionTop = useRef(null);
  const hasSelectedTechs = selectedTechs.length > 0;

  useLayoutEffect(() => {
    if (previousSectionTop.current === null || !sectionRef.current) return;

    const nextSectionTop = sectionRef.current.getBoundingClientRect().top;
    const scrollCorrection = nextSectionTop - previousSectionTop.current;
    previousSectionTop.current = null;

    if (scrollCorrection !== 0) {
      window.scrollTo({ top: window.scrollY + scrollCorrection, behavior: 'auto' });
    }
  }, [selectedTechs]);

  const updateSelectedTechs = (updater) => {
    previousSectionTop.current = sectionRef.current?.getBoundingClientRect().top ?? null;
    setSelectedTechs(updater);
  };

  const toggleTech = (tech) => {
    updateSelectedTechs((currentTechs) => (
      currentTechs.includes(tech)
        ? currentTechs.filter((currentTech) => currentTech !== tech)
        : [...currentTechs, tech]
    ));
  };

  return (
    <section ref={sectionRef} className="py-10 sm:py-12 border-y border-white/5 bg-black/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold text-stone-500 uppercase tracking-widest mb-8">
          {hasSelectedTechs ? (lang === 'es' ? 'Filtrando por:' : 'Filtering by:') : t.stack_title}
        </p>

        {hasSelectedTechs && (
          <div className="flex justify-center mb-6">
            <button
              onClick={() => updateSelectedTechs([])}
              className="hover-glow flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 transition"
            >
              <RotateCcw size={14} /> {lang === 'es' ? 'Borrar filtro' : 'Clear filter'}
            </button>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {uniqueTechs.map((tech) => {
            const isActive = selectedTechs.includes(tech);
            const label = TECH_LABELS[tech] || tech;

            return (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                aria-pressed={isActive}
                aria-label={tech}
                title={tech}
                className={`
                  hover-glow group flex h-[68px] w-[76px] flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-2 transition-all duration-300 sm:h-[72px] sm:w-[86px]
                  ${isActive
                    ? 'bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/20'
                    : 'bg-white/[0.06] border-white/10 text-stone-300 hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-white'
                  }
                `}
              >
                <span className={`
                  grid h-8 w-8 shrink-0 place-items-center rounded-md border transition
                  ${isActive
                    ? 'border-white/20 bg-white/15'
                    : 'border-orange-500/10 bg-black/25 group-hover:border-orange-500/25 group-hover:bg-orange-500/10'
                  }
                `}>
                  <TechIcon tech={tech} active={isActive} className="h-5 w-5" />
                </span>
                <span className="w-full truncate text-center text-[10px] font-bold leading-tight tracking-normal sm:text-[11px]">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
