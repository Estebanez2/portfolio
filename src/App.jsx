// 1. IMPORTACIONES
import { useState, useEffect } from 'react';
import { Menu, X, Globe, FileText, ArrowRight, Github, Linkedin, Play, Cpu, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { TRANSLATIONS, PROJECTS } from './data';
import './index.css';

// Importamos la imagen desde la carpeta src (asegúrate de que está ahí)
import fotoPerfil from './mi_foto.png';

// Importamos librerías de animación y formulario
import { motion } from "framer-motion";
import { useForm, ValidationError } from '@formspree/react';

// --- FUNCIONES AUXILIARES ---
const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// --- COMPONENTE MODAL ---
const Modal = ({ project, onClose, lang, t }) => {
  const [slideIdx, setSlideIdx] = useState(0);

  if (!project) return null;

  const changeSlide = (n) => {
    setSlideIdx((prev) => (prev + n + project.galeria.length) % project.galeria.length);
  };

  const currentMedia = project.galeria[slideIdx];
  const ytId = getYoutubeId(currentMedia);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-fade-in">
      <div className="glass w-full max-w-6xl h-[90vh] md:h-[80vh] overflow-hidden rounded-[2rem] relative flex flex-col md:flex-row shadow-2xl border border-white/10">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-red-500/80 p-2 rounded-full transition text-white backdrop-blur-sm">
          <X size={24} />
        </button>

        {/* Carrusel */}
        <div className="w-full md:w-3/5 h-2/5 md:h-full relative bg-stone-900/50 flex items-center justify-center">
            {ytId ? (
                <iframe 
                    className="w-full h-full absolute inset-0" 
                    src={`https://www.youtube.com/embed/${ytId}?enablejsapi=1&rel=0`}
                    title="YouTube" frameBorder="0" allowFullScreen
                ></iframe>
            ) : (
                <img src={currentMedia} className="w-full h-full object-cover" alt="Project screenshot" />
            )}
            
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button onClick={() => changeSlide(-1)} className="pointer-events-auto bg-black/50 p-2 rounded-full hover:bg-orange-600 transition backdrop-blur-sm"><ChevronLeft /></button>
                <button onClick={() => changeSlide(1)} className="pointer-events-auto bg-black/50 p-2 rounded-full hover:bg-orange-600 transition backdrop-blur-sm"><ChevronRight /></button>
            </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-2/5 h-3/5 md:h-full p-8 flex flex-col bg-[#0c0a09]">
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

          <div className="mt-auto pt-4 border-t border-white/5 flex gap-3">
            <a href={project.repo} target="_blank" rel="noreferrer" className={`flex-1 glass py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition ${project.repo === '#' ? 'opacity-50 pointer-events-none' : ''}`}>
                <Github size={16} /> {t.btn_repo}
            </a>
            <a href={project.link} className="flex-1 btn-orange py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                <Download size={16} /> {t.btn_download}
            </a>
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

  // CONFIGURACIÓN DE FORMSPREE
  const [state, handleSubmit] = useForm("xkobaqjg");

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrolled((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* HERO SECTION (Con animación de entrada) */}
      <section id="inicio" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
            
            {/* Texto Animado */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center md:text-left order-2 md:order-1"
            >
                <div className="inline-block px-3 py-1 mb-4 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase">
                    {t.hero_status}
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                    CODE.<br/>CREATE.<br/><span className="orange-gradient">DEPLOY.</span>
                </h1>
                <p className="text-stone-400 text-lg mb-8 leading-relaxed">
                    {t.hero_desc}
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                    <a href="#proyectos" className="btn-orange px-8 py-4 rounded-2xl font-bold text-center">{t.btn_projects}</a>
                    {/* ENLACE AL CV REAL */}
                    <a 
                        href="/CV_Alejandro_EstebanezMoreno.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        download="CV_Alejandro_EstebanezMoreno.pdf"
                        className="glass px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition"
                    >
                        <FileText size={16} /> {t.btn_cv}
                    </a>
                </div>
            </motion.div>

            {/* Foto de Perfil Animada */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 md:order-2 flex justify-center relative"
            >
                <div className="absolute inset-0 bg-orange-500/20 blur-[80px] rounded-full"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border-2 border-orange-500/50 profile-glow rotate-3 hover:rotate-0 transition duration-500 bg-stone-800">
                    <img src={fotoPerfil} alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition" />
                </div>
            </motion.div>
        </div>
      </section>

      {/* Stack Section */}
      <section className="py-8 border-y border-white/5 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">{t.stack_title}</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                <img src="https://cdn.simpleicons.org/android/3DDC84" className="h-8 md:h-10" title="Android" />
                <img src="https://cdn.simpleicons.org/kotlin/7F52FF" className="h-8 md:h-10" title="Kotlin" />
                <img src="https://cdn.simpleicons.org/unity/white" className="h-8 md:h-10" title="Unity" />
                <img src="https://cdn.simpleicons.org/csharp/512BD4" className="h-8 md:h-10" title="C#" />
                <img src="https://cdn.simpleicons.org/git/F05032" className="h-8 md:h-10" title="Git" />
            </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section id="proyectos" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter">{t.section_projects_title}<span className="text-orange-500">.</span></h2>
                <p className="text-stone-400 mt-2">{t.section_projects_subtitle}</p>
            </div>
            <a href="https://github.com/estebanez2" target="_blank" rel="noreferrer" className="text-xs font-bold text-orange-500 uppercase tracking-widest hover:text-white transition flex items-center gap-2">
                {t.github_link} <ArrowRight size={16} />
            </a>
        </div>
        
        {/* Grid de proyectos con animación secuencial (Stagger) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p, index) => {
                let coverImg = p.galeria.find(item => !getYoutubeId(item)) || "https://images.unsplash.com/photo-1550745165-9bc0b252726f";
                const firstIsVideo = getYoutubeId(p.galeria[0]);
                if(firstIsVideo) coverImg = `https://img.youtube.com/vi/${firstIsVideo}/hqdefault.jpg`;

                return (
                    <motion.div 
                        key={p.id} 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => setSelectedProject(p)} 
                        className="glass p-5 rounded-[2rem] cursor-pointer group hover:border-orange-500/50 hover:bg-stone-900/80 transition-all duration-300"
                    >
                        <div className="overflow-hidden rounded-[1.5rem] mb-5 h-48 relative">
                            <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition z-10"></div>
                            {firstIsVideo && <div className="absolute inset-0 flex items-center justify-center z-20"><div className="bg-black/50 p-3 rounded-full backdrop-blur-sm"><Play className="text-white fill-white" size={20} /></div></div>}
                            <img src={coverImg} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={p.titulo[lang]} />
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
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <div className="glass p-8 rounded-3xl inline-block border border-orange-500/10">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-[0.3em] mb-6">{t.repo_activity}</h3>
            <img src="https://ghchart.rshah.org/ea580c/TU_USUARIO" alt="Github Chart" className="w-full max-w-2xl opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      </section>

      {/* Contacto Section con Formulario AJAX */}
      <section id="contacto" className="py-24 px-6 max-w-4xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
                <a href="#" className="text-stone-500 hover:text-orange-500 transition"><Linkedin /></a>
                <a href="#" className="text-stone-500 hover:text-orange-500 transition"><Github /></a>
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