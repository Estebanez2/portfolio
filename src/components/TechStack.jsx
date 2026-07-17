import { useLayoutEffect, useRef } from 'react';
import { RotateCcw } from 'lucide-react';
import TechIcon from './TechIcon';

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

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {uniqueTechs.map((tech) => {
            const isActive = selectedTechs.includes(tech);

            return (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                aria-pressed={isActive}
                className={`
                  hover-glow group flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 transition-all duration-300
                  ${isActive
                    ? 'bg-orange-500 text-white border-orange-400 scale-105 shadow-lg shadow-orange-500/20'
                    : 'bg-white/[0.06] border-white/10 text-stone-300 hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-white'
                  }
                `}
              >
                <span className={`
                  grid h-7 w-7 shrink-0 place-items-center rounded-xl border transition
                  ${isActive
                    ? 'border-white/20 bg-white/15'
                    : 'border-orange-500/10 bg-black/25 group-hover:border-orange-500/25 group-hover:bg-orange-500/10'
                  }
                `}>
                  <TechIcon tech={tech} active={isActive} className="h-4 w-4" />
                </span>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider">{tech}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
