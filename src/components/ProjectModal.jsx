import { useEffect, useState } from 'react';
import { Box, Check, ChevronLeft, ChevronRight, Copy, Cpu, Download, Github, Globe, Maximize2, Minimize2, Smartphone, X } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import ProjectPlaceholder from './ProjectPlaceholder';
import TechIcon from './TechIcon';
import { getYoutubeId, isVideo } from '../utils/media';

const ProjectLinkIcon = ({ type }) => {
  switch (type) {
    case 'github': return <Github size={16} />;
    case 'apk': return <Smartphone size={16} />;
    case 'command': return <Copy size={16} />;
    case 'docker': return <Box size={16} />;
    case 'web': return <Globe size={16} />;
    default: return <Download size={16} />;
  }
};

const ModalMedia = ({ currentMedia, ytId, project, lang }) => {
  if (!currentMedia) {
    return <ProjectPlaceholder title={project.titulo[lang]} command={project.command} />;
  }

  if (ytId) {
    return (
      <iframe
        className="w-full h-full absolute inset-0"
        src={`https://www.youtube.com/embed/${ytId}?enablejsapi=1&rel=0`}
        title="YouTube" frameBorder="0" allowFullScreen
      ></iframe>
    );
  }

  if (isVideo(currentMedia)) {
    return (
      <video
        src={currentMedia}
        className="w-full h-full object-contain bg-black"
        controls preload="metadata" loop playsInline
      >Tu navegador no soporta videos.</video>
    );
  }

  return <img src={currentMedia} className="w-full h-full object-contain bg-black" alt="Project media" />;
};

const ProjectModal = ({ project, onClose, lang, t }) => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copiedLinkIndex, setCopiedLinkIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

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

  const mediaItems = project.galeria || [];
  const hasMedia = mediaItems.length > 0;

  const changeSlide = (n) => {
    if (!hasMedia) return;
    setSlideIdx((prev) => (prev + n + mediaItems.length) % mediaItems.length);
  };

  const copyCommand = async (command, index) => {
    if (!command) return;

    try {
      await navigator.clipboard.writeText(command);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = command;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopiedLinkIndex(index);
    window.setTimeout(() => setCopiedLinkIndex(null), 1800);
  };

  const currentMedia = hasMedia ? mediaItems[slideIdx] : null;
  const ytId = currentMedia ? getYoutubeId(currentMedia) : null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-10 animate-fade-in">
      <div className={`glass w-full max-w-6xl h-[calc(100dvh-1rem)] sm:h-[90vh] md:h-[80vh] max-h-[calc(100dvh-1rem)] overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] relative flex flex-col md:flex-row shadow-2xl border border-white/10 transition-all duration-300 ${isFullScreen ? 'bg-transparent border-none shadow-none !p-0 !m-0 !max-w-none !h-full !max-h-full !rounded-none' : ''}`}>
        {!isFullScreen && (
          <button onClick={onClose} className="hover-glow absolute top-3 right-3 sm:top-4 sm:right-4 z-[230] bg-black/50 hover:bg-red-500/80 p-2 rounded-full transition text-white backdrop-blur-sm" title="Cerrar">
            <X size={24} />
          </button>
        )}

        <div className={`
            relative bg-stone-900/50 flex items-center justify-center transition-all duration-300
            ${isFullScreen
              ? 'fixed inset-0 z-[200] w-full h-full bg-black'
              : 'w-full md:w-3/5 h-[38%] sm:h-2/5 md:h-full'
            }
        `}>
          <ModalMedia currentMedia={currentMedia} ytId={ytId} project={project} lang={lang} />

          {hasMedia && !ytId && (
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className={`hover-glow absolute top-3 sm:top-4 z-[210] bg-black/50 hover:bg-orange-600 p-2 rounded-full transition text-white backdrop-blur-sm group ${isFullScreen ? 'right-3 sm:right-4' : 'right-14 sm:right-16 md:right-4'}`}
              title={isFullScreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullScreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
            </button>
          )}

          {hasMedia && (
            <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none z-[205]">
              <button onClick={(e) => { e.stopPropagation(); changeSlide(-1); }} className="hover-glow pointer-events-auto bg-black/50 p-2 rounded-full hover:bg-orange-600 transition backdrop-blur-sm"><ChevronLeft size={isFullScreen ? 40 : 24} /></button>
              <button onClick={(e) => { e.stopPropagation(); changeSlide(1); }} className="hover-glow pointer-events-auto bg-black/50 p-2 rounded-full hover:bg-orange-600 transition backdrop-blur-sm"><ChevronRight size={isFullScreen ? 40 : 24} /></button>
            </div>
          )}

          {hasMedia && (
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-[205] bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/30 flex items-center gap-1 shadow-lg select-none pointer-events-none">
              <Motion.span
                key={slideIdx}
                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
                className="text-orange-500 font-black text-xs"
              >{slideIdx + 1}</Motion.span>
              <span className="text-orange-500 font-black text-xs">/</span>
              <span className="text-orange-500 font-black text-xs">{mediaItems.length}</span>
            </div>
          )}
        </div>

        <div className={`
            w-full md:w-2/5 h-[62%] sm:h-3/5 md:h-full min-h-0 p-5 sm:p-8 flex flex-col bg-[#0c0a09]
            ${isFullScreen ? 'hidden' : 'flex'}
        `}>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold border border-orange-500/30 text-orange-400 bg-orange-500/5 px-2 py-1 rounded-full uppercase tracking-wider">{tag}</span>
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">{project.titulo[lang]}</h2>

          <div className="flex-grow min-h-0 overflow-y-auto custom-scroll pr-2 mb-4 sm:mb-6">
            <p className="text-stone-400 text-sm leading-relaxed mb-6">{project.desc[lang]}</p>

            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Cpu size={14} /> {t.modal_tech}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                {project.tech.map((tc) => (
                  <li key={tc} className="flex items-center gap-2 rounded-lg border border-white/5 bg-black/20 px-2.5 py-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-orange-500/10 text-orange-300">
                      <TechIcon tech={tc} className="h-3.5 w-3.5" />
                    </span>
                    <span>{tc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-3">
            {project.links && project.links.map((link, index) => {
              const isCopyAction = link.type === 'command';
              const isCopied = copiedLinkIndex === index;
              const btnStyle = link.type === 'github' ? 'glass hover:bg-white/10' : 'btn-orange';
              const buttonContent = (
                <>
                  {isCopied ? <Check size={16} /> : <ProjectLinkIcon type={link.type} />}
                  {isCopied ? t.btn_copied : link.label[lang]}
                </>
              );

              if (isCopyAction) {
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => copyCommand(link.command || project.command, index)}
                    className={`hover-glow flex-[1_1_140px] min-w-0 px-3 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-center transition ${btnStyle}`}
                  >
                    {buttonContent}
                  </button>
                );
              }

              return (
                <a key={index} href={link.url} target="_blank" rel="noreferrer"
                  className={`hover-glow flex-[1_1_140px] min-w-0 px-3 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-center transition ${btnStyle}`}>
                  {buttonContent}
                </a>
              );
            })}

            {(!project.links || project.links.length === 0) && (
              <p className="text-xs text-stone-500 italic w-full text-center">Proyecto privado / En desarrollo</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
