// 1. IMPORTACIONES
import { useState, useEffect, useMemo } from 'react';
import { Menu, X, Box, Smartphone, Globe, FileText, ArrowRight, Github, Linkedin, Play, Cpu, ChevronLeft, ChevronRight, Download, Filter, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { TRANSLATIONS, PROJECTS } from './data';
import './index.css';

// Importamos la imagen desde la carpeta src
import fotoPerfil from './mi_foto.png';

// Importamos librerías
import { motion, AnimatePresence } from "framer-motion";
import { useForm, ValidationError } from '@formspree/react';

// --- FUNCIONES AUXILIARES ---
const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Función para intentar adivinar el slug del icono de SimpleIcons
const getIconSlug = (techName) => {
    // Mapa manual para correcciones específicas si el nombre no coincide directo
    const map = {
        "C#": "csharp",
        "C++": "cplusplus",
        ".NET": "dotnet",
        "Material Design": "materialdesignicons",
        "SQL Server": "microsoftsqlserver",
        "HTML5": "html5",
        "CSS3": "css3",
        "React Native": "react",
        "Express.js": "express",
        "Node.js": "nodedotjs"
    };
    
    if (map[techName]) return map[techName];
    
    // Lógica por defecto: minúsculas, quitar espacios y puntos
    return techName.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
};

// --- COMPONENTE MODAL ---
const Modal = ({ project, onClose, lang, t }) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        // Listener para salir con ESC
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                if (isFullScreen) setIsFullScreen(false);
                else onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isFullScreen, onClose]);

  if (!project) return null;

  const changeSlide = (n) => {
    setSlideIdx((prev) => (prev + n + project.galeria.length) % project.galeria.length);
  };

  const currentMedia = project.galeria[slideIdx];
  const ytId = getYoutubeId(currentMedia);
  const isMp4 = currentMedia.toLowerCase().endsWith('.mp4');

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-fade-in">
      {/* Contenedor Principal: Si es fullscreen quitamos bordes, padding y límites de tamaño */}
      <div className={`glass w-full max-w-6xl h-[90vh] md:h-[80vh] overflow-hidden rounded-[2rem] relative flex flex-col md:flex-row shadow-2xl border border-white/10 transition-all duration-300 ${isFullScreen ? 'bg-transparent border-none shadow-none !p-0 !m-0 !max-w-none !h-full !rounded-none' : ''}`}>
        
        {/* Botón Cerrar (Se oculta en fullscreen) */}
        {!isFullScreen && (
            <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-red-500/80 p-2 rounded-full transition text-white backdrop-blur-sm">
            <X size={24} />
            </button>
        )}

        {/* Carrusel / Columna Izquierda */}
        <div className={`
            relative bg-stone-900/50 flex items-center justify-center transition-all duration-300
            ${isFullScreen 
                ? 'fixed inset-0 z-[200] w-full h-full bg-black' // Estilo Fullscreen
                : 'w-full md:w-3/5 h-2/5 md:h-full' // Estilo Normal
            }
        `}>
            
            {/* Medios */}
            {ytId ? (
                <iframe 
                    className="w-full h-full absolute inset-0" 
                    src={`https://www.youtube.com/embed/${ytId}?enablejsapi=1&rel=0`}
                    title="YouTube" frameBorder="0" allowFullScreen
                ></iframe>

            /* CASO 2: ES VIDEO LOCAL MP4 */
            ) : isMp4 ? (
                <video 
                    src={currentMedia} 
                    className="w-full h-full object-contain bg-black" 
                    controls autoPlay muted loop
                >Tu navegador no soporta videos.</video>

            /* CASO 3: ES IMAGEN */
            ) : (
                <img src={currentMedia} className="w-full h-full object-contain bg-black" alt="Project media" />
            )}
            
            {/* Botón Maximizar (Solo si no es YouTube) */}
            {!ytId && (
                <button 
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="absolute top-4 right-4 z-[210] bg-black/50 hover:bg-orange-600 p-2 rounded-full transition text-white backdrop-blur-sm group"
                    title={isFullScreen ? "Salir de pantalla completa" : "Pantalla completa"}
                >
                    {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                </button>
            )}

            {/* Flechas */}
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none z-[205]">
                <button onClick={(e) => {e.stopPropagation(); changeSlide(-1);}} className="pointer-events-auto bg-black/50 p-2 rounded-full hover:bg-orange-600 transition backdrop-blur-sm"><ChevronLeft size={isFullScreen ? 40 : 24}/></button>
                <button onClick={(e) => {e.stopPropagation(); changeSlide(1);}} className="pointer-events-auto bg-black/50 p-2 rounded-full hover:bg-orange-600 transition backdrop-blur-sm"><ChevronRight size={isFullScreen ? 40 : 24}/></button>
            </div>

            {/* Contador */}
            <div className="absolute bottom-4 right-4 z-[205] bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/30 flex items-center gap-1 shadow-lg select-none pointer-events-none">
                <motion.span 
                    key={slideIdx} 
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                    className="text-orange-500 font-black text-xs"
                >{slideIdx + 1}</motion.span>
                <span className="text-orange-500 font-black text-xs">/</span>
                <span className="text-orange-500 font-black text-xs">{project.galeria.length}</span>
            </div>
        </div>

        {/* Info / Columna Derecha (Se oculta en fullscreen) */}
        <div className={`
            w-full md:w-2/5 h-3/5 md:h-full p-8 flex flex-col bg-[#0c0a09]
            ${isFullScreen ? 'hidden' : 'flex'}
        `}>
          <div className="flex flex-wrap gap-2 mb-4">
             {project.tags.map(tag => (
                 <span key={tag} className="text-[10px] font-bold border border-orange-500/30 text-orange-400 bg-orange-500/5 px-2 py-1 rounded-full uppercase tracking-wider">{tag}</span>
             ))}
          </div>
          <h2 className="text-3xl font-black text-white mb-4 leading-tight">{project.titulo[lang]}</h2>
          
          <div className="flex-grow overflow-y-auto custom-scroll pr-2 mb-6">
            <p className="text-stone-400 text-sm leading-relaxed mb-6">{project.desc[lang]}</p>
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Cpu size={14} /> {t.modal_tech}
                </h4>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-stone-300">
                    {project.tech.map(tc => (
                        <li key={tc} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>{tc}</li>
                    ))}
                </ul>
            </div>
          </div>

          {/* Botones de acción DINÁMICOS */}
          <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-3">
            {project.links && project.links.map((link, index) => {
                
                // Función auxiliar para elegir icono según el tipo
                const getIcon = (type) => {
                    switch(type) {
                        case 'github': return <Github size={16} />;
                        case 'apk': return <Smartphone size={16} />;
                        case 'docker': return <Box size={16} />;
                        case 'web': return <Globe size={16} />;
                        default: return <Download size={16} />;
                    }
                };
                const btnStyle = link.type === 'github' ? "glass hover:bg-white/10" : "btn-orange";

                return (
                    <a key={index} href={link.url} target="_blank" rel="noreferrer" 
                        className={`flex-1 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${btnStyle}`}>
                        {getIcon(link.type)} {link.label[lang]}
                    </a>
                );
            })}
            
            {/* Si no hay links, mostramos mensaje opcional o nada */}
            {(!project.links || project.links.length === 0) && (
                <p className="text-xs text-stone-500 italic w-full text-center">Proyecto privado / En desarrollo</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL APP ---
function App() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'es');
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(0);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Estado para filtrar por tecnología
  const [filterTech, setFilterTech] = useState(null);

  // CONFIGURACIÓN DE FORMSPREE
  const [state, handleSubmit] = useForm("xkobaqjg");

  const t = TRANSLATIONS[lang];

  useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrolled((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- OBTENER TODAS LAS TECNOLOGÍAS ÚNICAS ---
  // Extraemos todos los arrays 'tech' de los proyectos, los aplanamos y quitamos duplicados
  const uniqueTechs = useMemo(() => {
      const all = PROJECTS.flatMap(p => p.tech);
      return [...new Set(all)].sort();
  }, []);

  // --- FILTRAR PROYECTOS ---
  // Si filterTech tiene valor, mostramos solo los que lo incluyan
  const visibleProjects = filterTech 
      ? PROJECTS.filter(p => p.tech.includes(filterTech))
      : PROJECTS;

  return (
    <div className="antialiased text-stone-200">
      
      {/* Barra de progreso */}
      <div className="fixed top-0 left-0 h-1 bg-orange-600 z-[100] transition-all duration-150" style={{ width: `${scrolled}%` }}></div>

      {/* Fondo Animado */}
      <div className="bg-animated">
          <div className="orb w-96 h-96 bg-orange-600 top-10 left-10"></div>
          <div className="orb w-80 h-80 bg-orange-800 bottom-20 right-20" style={{ animationDelay: '-5s' }}></div>
      </div>

      {/* Nav */}
      <nav className="fixed w-full z-50 glass py-4 px-6 md:px-12 flex justify-between items-center border-b border-white/5">
        <span className="text-xl font-black tracking-tighter text-orange-500">DEV.PORTFOLIO</span>
        
        <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest">
                <a href="#inicio" className="hover:text-orange-400 transition">{t.nav_home}</a>
                <a href="#proyectos" className="hover:text-orange-400 transition">{t.nav_projects}</a>
                <a href="#contacto" className="hover:text-orange-400 transition">{t.nav_contact}</a>
            </div>

            <div 
                className="relative"
                onMouseEnter={() => setIsLangMenuOpen(true)}
                onMouseLeave={() => setIsLangMenuOpen(false)}
            >
                <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition py-2">
                    <Globe size={16} /> <span>{lang.toUpperCase()}</span>
                </button>
                
                {isLangMenuOpen && (
                    <div className="absolute right-0 top-full pt-1 w-24 z-50">
                        <div className="bg-stone-900 border border-orange-500/20 rounded-xl overflow-hidden shadow-xl">
                            <button onClick={() => { setLang('es'); setIsLangMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-xs hover:bg-orange-500 hover:text-white transition">Español</button>
                            <button onClick={() => { setLang('en'); setIsLangMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-xs hover:bg-orange-500 hover:text-white transition">English</button>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="md:hidden text-orange-500 cursor-pointer"><Menu /></div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="text-center md:text-left order-2 md:order-1"
            >
                <div className="inline-block px-3 py-1 mb-4 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase">
                    {t.hero_status}
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                    CODE.<br/>CREATE.<br/><span className="orange-gradient">DEPLOY.</span>
                </h1>
                <p className="text-stone-400 text-lg mb-8 leading-relaxed">{t.hero_desc}</p>
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                    <a href="#proyectos" className="btn-orange px-8 py-4 rounded-2xl font-bold text-center">{t.btn_projects}</a>
                    <a href={`${import.meta.env.BASE_URL}CV_Alejandro_EstebanezMoreno.pdf`} target="_blank" rel="noopener noreferrer" download="CV_Alejandro_EstebanezMoreno.pdf" className="glass px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition">
                        <FileText size={16} /> {t.btn_cv}
                    </a>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="order-1 md:order-2 flex justify-center relative"
            >
                <div className="absolute inset-0 bg-orange-500/20 blur-[80px] rounded-full"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border-2 border-orange-500/50 profile-glow rotate-3 hover:rotate-0 transition duration-500 bg-stone-800">
                    <img src={fotoPerfil} alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition" />
                </div>
            </motion.div>
        </div>
      </section>

      {/* --- TECH STACK INTERACTIVO --- */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-xs font-bold text-stone-500 uppercase tracking-widest mb-8">
                {filterTech ? (lang === 'es' ? 'Filtrando por:' : 'Filtering by:') : t.stack_title}
            </p>
            
            {/* Si hay filtro activo, mostramos botón para borrar */}
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

            {/* Lista dinámica de iconos */}
            <div className="flex flex-wrap justify-center gap-4">
                {uniqueTechs.map(tech => {
                    const isActive = filterTech === tech;
                    const isInactive = filterTech && !isActive;

                    return (
                        <button
                            key={tech}
                            onClick={() => setFilterTech(isActive ? null : tech)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300
                                ${isActive 
                                    ? 'bg-orange-500 text-white border-orange-500 scale-105 shadow-lg shadow-orange-500/20' 
                                    : 'bg-white/5 border-white/5 text-stone-400 hover:bg-white/10 hover:border-white/10 hover:text-white'
                                }
                                ${isInactive ? 'opacity-30 grayscale' : 'opacity-100'}
                            `}
                        >
                            {/* Icono dinámico desde SimpleIcons */}
                            <img 
                                src={`https://cdn.simpleicons.org/${getIconSlug(tech)}/${isActive ? 'white' : '9ca3af'}`} 
                                className="w-4 h-4 transition-all"
                                onError={(e) => e.target.style.display = 'none'} // Si falla el icono, se oculta y queda solo texto
                                alt=""
                            />
                            <span className="text-xs font-bold uppercase tracking-wider">{tech}</span>
                        </button>
                    );
                })}
            </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section id="proyectos" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter">{t.section_projects_title}<span className="text-orange-500">.</span></h2>
                <p className="text-stone-400 mt-2">
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
        
        {/* Grid de proyectos (FILTRADO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
                {visibleProjects.map((p, index) => {
                    const coverImg = p.portada || "https://images.unsplash.com/photo-1550745165-9bc0b252726f";

                    return (
                        <motion.div 
                            layout
                            key={p.id} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedProject(p)} 
                            className="glass p-5 rounded-[2rem] cursor-pointer group hover:border-orange-500/50 hover:bg-stone-900/80 transition-all duration-300"
                        >
                            <div className="overflow-hidden w-3/4 mx-auto aspect-square rounded-[2.5rem] mb-5 relative bg-stone-950 shadow-2xl border-2 border-white/5">
                                <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition z-10"></div>
                                <img src={coverImg} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={p.titulo[lang]} />
                            </div>

                            <div className="flex gap-2 mb-3">
                                {p.tags.slice(0, 2).map(tag => (
                                    <span key={tag} className="text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-1 rounded-md text-stone-300">{tag}</span>
                                ))}
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition">{p.titulo[lang]}</h3>
                            <p className="text-stone-500 text-sm line-clamp-2">{p.resumen[lang]}</p>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            
            {/* Mensaje si no hay resultados */}
            {visibleProjects.length === 0 && (
                <div className="col-span-full py-20 text-center">
                    <p className="text-stone-500 text-lg">No hay proyectos con esta tecnología... todavía.</p>
                    <button onClick={() => setFilterTech(null)} className="mt-4 text-orange-500 font-bold hover:underline">Ver todos</button>
                </div>
            )}
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <div className="glass p-8 rounded-3xl inline-block border border-orange-500/10">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-[0.3em] mb-6">{t.repo_activity}</h3>
            <img 
                src="https://ghchart.rshah.org/ea580c/estebanez2" 
                alt="Github Chart" 
                className="w-full max-w-2xl opacity-80 hover:opacity-100 transition-opacity" 
            />
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-24 px-6 max-w-4xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
        >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            
            <div className="text-center mb-10">
                <h2 className="text-3xl font-black mb-4">{t.contact_title}</h2>
                <p className="text-stone-400">{t.contact_desc}</p>
            </div>

            {/* LÓGICA DE FORMSPREE */}
            {state.succeeded ? (
                <div className="text-center py-10 animate-fade-in">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado! 🚀</h3>
                    <p className="text-stone-400">Gracias por contactar. Te responderé lo antes posible.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <input type="text" name="name" placeholder={t.form_name_ph} className="p-4 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-orange-500 focus:bg-white/5 transition" required />
                            <ValidationError prefix="Name" field="name" errors={state.errors} />
                        </div>
                        <div className="flex flex-col">
                            <input type="email" name="email" placeholder={t.form_email_ph} className="p-4 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-orange-500 focus:bg-white/5 transition" required />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                        </div>
                    </div>
                    <textarea name="message" placeholder={t.form_msg_ph} rows="4" className="p-4 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-orange-500 focus:bg-white/5 transition" required></textarea>
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                    
                    <button type="submit" disabled={state.submitting} className="btn-orange py-4 rounded-xl font-bold tracking-widest hover:scale-[1.02] active:scale-95 transition disabled:opacity-50">
                        {state.submitting ? "ENVIANDO..." : t.btn_send}
                    </button>
                </form>
            )}
            
            <div className="flex justify-center gap-6 mt-10">
                <a href="https://www.linkedin.com/in/alejandro-estebanez-moreno-a2749a3aa/" className="text-stone-500 hover:text-orange-500 transition"><Linkedin /></a>
                <a href="https://github.com/estebanez2" className="text-stone-500 hover:text-orange-500 transition"><Github /></a>
            </div>
        </motion.div>
      </section>

      <footer className="py-8 text-center text-stone-600 text-xs font-bold uppercase tracking-widest">
        <p>{t.footer}</p>
      </footer>

      {selectedProject && (
          <Modal project={selectedProject} onClose={() => setSelectedProject(null)} lang={lang} t={t} />
      )}
    </div>
  );
}

export default App;