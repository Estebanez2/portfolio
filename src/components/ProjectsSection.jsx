import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import ProjectPlaceholder from './ProjectPlaceholder';

const ProjectsSection = ({ visibleProjects, selectedTechs, clearSelectedTechs, setSelectedProject, lang, t }) => {
  const hasSelectedTechs = selectedTechs.length > 0;
  const selectedTechText = selectedTechs.join(', ');

  return (
    <section id="proyectos" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-4">
        <div className="w-full min-w-0">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">
            {t.section_projects_title}<span className="text-orange-500">.</span>
          </h2>
          <p className="text-stone-400 mt-2 break-words">
            {hasSelectedTechs
              ? (lang === 'es' ? `Mostrando proyectos con ${selectedTechText}` : `Showing projects built with ${selectedTechText}`)
              : t.section_projects_subtitle
            }
          </p>
        </div>
        <a href="https://github.com/estebanez2" target="_blank" rel="noreferrer" className="text-glow text-xs font-bold text-orange-500 uppercase tracking-widest hover:text-white transition flex items-center gap-2">
          {t.github_link} <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((p) => {
            const hasCover = Boolean(p.portada);
            const isContainedCover = p.coverMode === 'contain';
            const coverStyle = p.coverBg ? { backgroundColor: p.coverBg } : undefined;

            return (
              <Motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(p)}
                className="glass hover-glow p-4 rounded-[1.5rem] cursor-pointer group hover:border-orange-500/50 hover:bg-stone-900/80 transition-all duration-300"
              >
                <div className="overflow-hidden w-40 sm:w-2/3 xl:w-3/4 mx-auto aspect-square rounded-[1.5rem] mb-4 relative bg-stone-950 shadow-2xl border-2 border-white/5" style={coverStyle}>
                  {p.coverOverlay !== false && (
                    <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition z-10"></div>
                  )}
                  {hasCover ? (
                    <img
                      src={p.portada}
                      className={`w-full h-full ${isContainedCover ? 'object-contain p-5 sm:p-6' : 'object-cover'} group-hover:scale-105 transition duration-700`}
                      alt={p.titulo[lang]}
                    />
                  ) : (
                    <div className="h-full w-full transition duration-700 group-hover:scale-105">
                      <ProjectPlaceholder title={p.titulo[lang]} command={p.command} compact />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-1 rounded-md text-stone-300">{tag}</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-orange-500 transition">{p.titulo[lang]}</h3>
                <p className="text-stone-500 text-sm line-clamp-2">{p.resumen[lang]}</p>
              </Motion.div>
            );
          })}
        </AnimatePresence>

        {visibleProjects.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-stone-500 text-lg">
              {lang === 'es' ? 'No hay proyectos con esas tecnologías... todavía.' : 'No projects with those technologies yet.'}
            </p>
            <button onClick={clearSelectedTechs} className="text-glow mt-4 text-orange-500 font-bold hover:underline">
              {lang === 'es' ? 'Ver todos' : 'View all'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
