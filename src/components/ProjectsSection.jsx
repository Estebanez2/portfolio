import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion as Motion } from 'framer-motion';

const ProjectsSection = ({ visibleProjects, filterTech, setFilterTech, setSelectedProject, lang, t }) => (
  <section id="proyectos" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-4">
      <div className="w-full min-w-0">
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">{t.section_projects_title}<span className="text-orange-500">.</span></h2>
        <p className="text-stone-400 mt-2 break-words">
          {filterTech
            ? (lang === 'es' ? `Mostrando proyectos con ${filterTech}` : `Showing projects built with ${filterTech}`)
            : t.section_projects_subtitle
          }
        </p>
      </div>
      <a href="https://github.com/estebanez2" target="_blank" rel="noreferrer" className="text-xs font-bold text-orange-500 uppercase tracking-widest hover:text-white transition flex items-center gap-2">
        {t.github_link} <ArrowRight size={16} />
      </a>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      <AnimatePresence mode="popLayout">
        {visibleProjects.map((p) => {
          const coverImg = p.portada || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f';

          return (
            <Motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(p)}
              className="glass p-4 sm:p-5 rounded-[2rem] cursor-pointer group hover:border-orange-500/50 hover:bg-stone-900/80 transition-all duration-300"
            >
              <div className="overflow-hidden w-44 sm:w-3/4 mx-auto aspect-square rounded-[2rem] sm:rounded-[2.5rem] mb-5 relative bg-stone-950 shadow-2xl border-2 border-white/5">
                <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition z-10"></div>
                <img src={coverImg} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={p.titulo[lang]} />
              </div>

              <div className="flex gap-2 mb-3">
                {p.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-1 rounded-md text-stone-300">{tag}</span>
                ))}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition">{p.titulo[lang]}</h3>
              <p className="text-stone-500 text-sm line-clamp-2">{p.resumen[lang]}</p>
            </Motion.div>
          );
        })}
      </AnimatePresence>

      {visibleProjects.length === 0 && (
        <div className="col-span-full py-20 text-center">
          <p className="text-stone-500 text-lg">No hay proyectos con esta tecnología... todavía.</p>
          <button onClick={() => setFilterTech(null)} className="mt-4 text-orange-500 font-bold hover:underline">Ver todos</button>
        </div>
      )}
    </div>
  </section>
);

export default ProjectsSection;
