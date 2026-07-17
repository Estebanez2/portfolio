import { RotateCcw } from 'lucide-react';
import { getIconSlug } from '../utils/simpleIcons';

const TechStack = ({ uniqueTechs, filterTech, setFilterTech, lang, t }) => (
  <section className="py-10 sm:py-12 border-y border-white/5 bg-black/20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <p className="text-center text-xs font-bold text-stone-500 uppercase tracking-widest mb-8">
        {filterTech ? (lang === 'es' ? 'Filtrando por:' : 'Filtering by:') : t.stack_title}
      </p>

      {filterTech && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setFilterTech(null)}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 transition"
          >
            <RotateCcw size={14} /> {lang === 'es' ? 'Borrar filtro' : 'Clear filter'}
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {uniqueTechs.map((tech) => {
          const isActive = filterTech === tech;
          const isInactive = filterTech && !isActive;

          return (
            <button
              key={tech}
              onClick={() => setFilterTech(isActive ? null : tech)}
              className={`
                flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border transition-all duration-300
                ${isActive
                  ? 'bg-orange-500 text-white border-orange-500 scale-105 shadow-lg shadow-orange-500/20'
                  : 'bg-white/5 border-white/5 text-stone-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                }
                ${isInactive ? 'opacity-30 grayscale' : 'opacity-100'}
              `}
            >
              <img
                src={`https://cdn.simpleicons.org/${getIconSlug(tech)}/${isActive ? 'white' : '9ca3af'}`}
                className="w-4 h-4 transition-all"
                onError={(e) => e.target.style.display = 'none'}
                alt=""
              />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">{tech}</span>
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

export default TechStack;
