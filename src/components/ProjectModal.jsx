import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, Copy, Cpu, Download, Github, Globe, Maximize2, Minimize2, RotateCcw, Smartphone, X, ZoomIn, ZoomOut } from 'lucide-react';
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

const clamp = (value, min, max) => {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
};

const getDistance = ([first, second]) => Math.hypot(first.x - second.x, first.y - second.y);

const getMidpoint = ([first, second]) => ({
  x: (first.x + second.x) / 2,
  y: (first.y + second.y) / 2,
});

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

const ZoomableImage = ({ src, alt }) => {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [fitSize, setFitSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const zoomRef = useRef(zoom);
  const dragStart = useRef(null);
  const pinchStart = useRef(null);
  const touchStart = useRef(null);
  const tapStart = useRef(null);
  const lastTap = useRef({ time: 0, x: 0, y: 0 });
  const pendingScroll = useRef(null);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const calculateFitSize = () => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image?.naturalWidth || !image?.naturalHeight) return;

    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const containerRatio = rect.width / rect.height;
    const imageRatio = image.naturalWidth / image.naturalHeight;
    const width = containerRatio > imageRatio ? rect.height * imageRatio : rect.width;
    const height = containerRatio > imageRatio ? rect.height : rect.width / imageRatio;

    setContainerSize({ width: rect.width, height: rect.height });
    setFitSize({ width, height });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    calculateFitSize();
    const resizeObserver = new ResizeObserver(calculateFitSize);
    resizeObserver.observe(container);
    window.addEventListener('resize', calculateFitSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', calculateFitSize);
    };
  }, [src]);

  const getContentSize = (nextZoom = zoomRef.current) => ({
    width: Math.max(containerSize.width, fitSize.width * nextZoom),
    height: Math.max(containerSize.height, fitSize.height * nextZoom),
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || !pendingScroll.current) return;

    const { left, top } = pendingScroll.current;
    pendingScroll.current = null;
    container.scrollLeft = clamp(left, 0, container.scrollWidth - container.clientWidth);
    container.scrollTop = clamp(top, 0, container.scrollHeight - container.clientHeight);
  }, [zoom, fitSize, containerSize]);

  const setZoomFromPoint = (nextZoom, point = null) => {
    const container = containerRef.current;
    const clampedZoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);

    if (!container) {
      setZoom(clampedZoom);
      return;
    }

    const rect = container.getBoundingClientRect();
    const anchorX = point ? point.x - rect.left : rect.width / 2;
    const anchorY = point ? point.y - rect.top : rect.height / 2;
    const previousContentSize = getContentSize(zoomRef.current);
    const nextContentSize = {
      width: Math.max(rect.width, fitSize.width * clampedZoom),
      height: Math.max(rect.height, fitSize.height * clampedZoom),
    };
    const ratioX = previousContentSize.width > 0 ? (container.scrollLeft + anchorX) / previousContentSize.width : 0.5;
    const ratioY = previousContentSize.height > 0 ? (container.scrollTop + anchorY) / previousContentSize.height : 0.5;

    pendingScroll.current = {
      left: ratioX * nextContentSize.width - anchorX,
      top: ratioY * nextContentSize.height - anchorY,
    };

    zoomRef.current = clampedZoom;
    setZoom(clampedZoom);
  };

  const zoomBy = (factor, point = null) => {
    setZoomFromPoint(zoomRef.current * factor, point);
  };

  const resetZoom = () => {
    pendingScroll.current = { left: 0, top: 0 };
    zoomRef.current = MIN_ZOOM;
    setZoom(MIN_ZOOM);
  };

  const toggleZoom = (point = null) => {
    setZoomFromPoint(zoomRef.current > MIN_ZOOM ? MIN_ZOOM : 2.35, point);
  };

  const handleWheel = (event) => {
    event.preventDefault();
    zoomBy(event.deltaY > 0 ? 0.88 : 1.12, { x: event.clientX, y: event.clientY });
  };

  const finishInteraction = () => {
    dragStart.current = null;
    touchStart.current = null;
    pinchStart.current = null;
    setIsInteracting(false);
  };

  const handleMouseDown = (event) => {
    if (event.button !== 0 || zoomRef.current <= MIN_ZOOM) return;

    const container = containerRef.current;
    if (!container) return;

    event.preventDefault();
    dragStart.current = {
      point: { x: event.clientX, y: event.clientY },
      scrollLeft: container.scrollLeft,
      scrollTop: container.scrollTop,
    };
    setIsInteracting(true);

    const handleMouseMove = (moveEvent) => {
      if (!dragStart.current || !containerRef.current) return;
      containerRef.current.scrollLeft = dragStart.current.scrollLeft - (moveEvent.clientX - dragStart.current.point.x);
      containerRef.current.scrollTop = dragStart.current.scrollTop - (moveEvent.clientY - dragStart.current.point.y);
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('blur', handleMouseUp);
      finishInteraction();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('blur', handleMouseUp);
  };

  const readTouchPoints = (touches) => [...touches].map((touch) => ({ x: touch.clientX, y: touch.clientY }));

  const handleTouchStart = (event) => {
    const points = readTouchPoints(event.touches);
    if (points.length === 1) {
      const container = containerRef.current;
      touchStart.current = container
        ? { point: points[0], scrollLeft: container.scrollLeft, scrollTop: container.scrollTop }
        : null;
      tapStart.current = { ...points[0], time: Date.now() };
      setIsInteracting(zoomRef.current > MIN_ZOOM);
      return;
    }

    if (points.length === 2) {
      event.preventDefault();
      pinchStart.current = {
        distance: getDistance(points),
        midpoint: getMidpoint(points),
        zoom: zoomRef.current,
      };
      touchStart.current = null;
      setIsInteracting(true);
    }
  };

  const handleTouchMove = (event) => {
    const points = readTouchPoints(event.touches);

    if (points.length === 2 && pinchStart.current) {
      event.preventDefault();
      const distance = getDistance(points);
      const midpoint = getMidpoint(points);
      const nextZoom = clamp((distance / pinchStart.current.distance) * pinchStart.current.zoom, MIN_ZOOM, MAX_ZOOM);
      setZoomFromPoint(nextZoom, midpoint);
      return;
    }

    if (points.length === 1 && touchStart.current && zoomRef.current > MIN_ZOOM && containerRef.current) {
      event.preventDefault();
      containerRef.current.scrollLeft = touchStart.current.scrollLeft - (points[0].x - touchStart.current.point.x);
      containerRef.current.scrollTop = touchStart.current.scrollTop - (points[0].y - touchStart.current.point.y);
    }
  };

  const handleTouchEnd = (event) => {
    if (event.touches.length === 1) {
      const point = readTouchPoints(event.touches)[0];
      const container = containerRef.current;
      touchStart.current = container
        ? { point, scrollLeft: container.scrollLeft, scrollTop: container.scrollTop }
        : null;
      pinchStart.current = null;
      return;
    }

    const tap = tapStart.current;
    const changedTouch = event.changedTouches[0];
    const isTap = changedTouch
      && tap
      && Date.now() - tap.time < 260
      && Math.hypot(changedTouch.clientX - tap.x, changedTouch.clientY - tap.y) < 12;

    finishInteraction();

    if (!isTap || !changedTouch) return;

    const now = Date.now();
    const distanceFromLastTap = Math.hypot(changedTouch.clientX - lastTap.current.x, changedTouch.clientY - lastTap.current.y);

    if (now - lastTap.current.time < 320 && distanceFromLastTap < 36) {
      event.preventDefault();
      toggleZoom({ x: changedTouch.clientX, y: changedTouch.clientY });
      lastTap.current = { time: 0, x: 0, y: 0 };
      return;
    }

    lastTap.current = { time: now, x: changedTouch.clientX, y: changedTouch.clientY };
  };

  const handleDoubleClick = (event) => {
    event.preventDefault();
    toggleZoom({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div
        ref={containerRef}
        className="zoom-scroll h-full w-full overflow-auto overscroll-contain"
        style={{ touchAction: zoom > MIN_ZOOM ? 'none' : 'manipulation' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={finishInteraction}
        onDoubleClick={handleDoubleClick}
        onWheel={handleWheel}
      >
        <div
          className="grid place-items-center"
          style={{
            width: `${Math.max(containerSize.width, fitSize.width * zoom)}px`,
            height: `${Math.max(containerSize.height, fitSize.height * zoom)}px`,
          }}
        >
          <img
            ref={imageRef}
            src={src}
            className="select-none"
            style={{
              width: fitSize.width ? `${fitSize.width * zoom}px` : '100%',
              height: fitSize.height ? `${fitSize.height * zoom}px` : '100%',
              maxWidth: 'none',
              maxHeight: 'none',
              visibility: fitSize.width ? 'visible' : 'hidden',
              cursor: zoom > MIN_ZOOM ? (isInteracting ? 'grabbing' : 'grab') : 'default',
            }}
            onLoad={calculateFitSize}
            alt={alt}
            draggable="false"
          />
        </div>
      </div>
      <div className="absolute bottom-3 left-3 z-[206] flex items-center gap-2 rounded-full bg-black/55 p-1.5 backdrop-blur-sm">
        <button
          type="button"
          className="hover-glow grid h-8 w-8 place-items-center rounded-full text-white hover:bg-orange-600 transition"
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onClick={(event) => { event.stopPropagation(); zoomBy(1.25); }}
          aria-label="Ampliar imagen"
          title="Ampliar"
        >
          <ZoomIn size={17} />
        </button>
        <button
          type="button"
          className="hover-glow grid h-8 w-8 place-items-center rounded-full text-white hover:bg-orange-600 transition disabled:opacity-40"
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onClick={(event) => { event.stopPropagation(); zoomBy(0.8); }}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Reducir imagen"
          title="Reducir"
        >
          <ZoomOut size={17} />
        </button>
        <button
          type="button"
          className="hover-glow grid h-8 w-8 place-items-center rounded-full text-white hover:bg-orange-600 transition disabled:opacity-40"
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onClick={(event) => { event.stopPropagation(); resetZoom(); }}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Restablecer zoom"
          title="Restablecer"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
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
        controls autoPlay preload="metadata" loop playsInline
      >Tu navegador no soporta videos.</video>
    );
  }

  return <ZoomableImage key={currentMedia} src={currentMedia} alt={project.titulo[lang]} />;
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
  const isLongDescription = project.desc[lang].length > 520;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-10 animate-fade-in">
      <div className={`glass w-full max-w-[92rem] h-[calc(100dvh-1rem)] sm:h-[90vh] md:h-[82vh] max-h-[calc(100dvh-1rem)] overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] relative flex flex-col md:flex-row shadow-2xl border border-white/10 transition-all duration-300 ${isFullScreen ? 'bg-transparent border-none shadow-none !p-0 !m-0 !max-w-none !h-full !max-h-full !rounded-none' : ''}`}>
        {!isFullScreen && (
          <button onClick={onClose} className="hover-glow absolute top-3 right-3 sm:top-4 sm:right-4 z-[230] bg-black/50 hover:bg-red-500/80 p-2 rounded-full transition text-white backdrop-blur-sm" title="Cerrar">
            <X size={24} />
          </button>
        )}

        <div className={`
            relative bg-stone-900/50 flex items-center justify-center transition-all duration-300
            ${isFullScreen
              ? 'fixed inset-0 z-[200] w-full h-full bg-black'
              : 'w-full md:w-[58%] h-[38%] sm:h-2/5 md:h-full'
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
            w-full md:w-[42%] h-[62%] sm:h-3/5 md:h-full min-h-0 overflow-y-auto custom-scroll p-5 sm:p-6 md:p-7 lg:p-8 bg-[#0c0a09]
            ${isFullScreen ? 'hidden' : 'flex'}
        `}>
          <div className="flex min-h-full flex-col">
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <div className="relative overflow-hidden rounded-xl border border-orange-500/15 bg-orange-500/[0.045] px-2.5 py-2">
                <div className="relative flex items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/15">
                    <CalendarDays size={15} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-500">
                      {lang === 'es' ? 'Año' : 'Year'}
                    </span>
                    <span className="block truncate text-base font-black text-white">
                      {project.meta?.year}
                    </span>
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] px-2.5 py-2">
                <div className="relative flex items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-black/25 text-orange-300 ring-1 ring-white/10">
                    <Clock3 size={15} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-500">
                      {lang === 'es' ? 'Duración' : 'Duration'}
                    </span>
                    <span className="block truncate text-base font-black text-white">
                      {project.meta?.duration?.[lang]}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[2rem] font-black text-white mb-3 leading-tight">{project.titulo[lang]}</h2>

            <p className={`text-stone-400 mb-4 ${isLongDescription ? 'text-[12px] leading-[1.45] sm:text-[13px]' : 'text-sm leading-relaxed'}`}>
              {project.desc[lang]}
            </p>

            <div className="bg-white/5 p-3 rounded-xl border border-white/5 mb-4">
              <h4 className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-2.5 flex items-center gap-2">
                <Cpu size={14} /> {t.modal_tech}
              </h4>
              <ul className="flex flex-wrap gap-2 text-xs text-stone-300">
                {project.tech.map((tc) => (
                  <li key={tc} className="flex min-w-0 items-center gap-2 rounded-lg border border-white/5 bg-black/20 px-2.5 py-1.5">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-orange-500/10 text-orange-300">
                      <TechIcon tech={tc} className="h-4 w-4" />
                    </span>
                    <span className="whitespace-nowrap text-[11px] font-medium">{tc}</span>
                  </li>
                ))}
              </ul>
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
    </div>
  );
};

export default ProjectModal;
