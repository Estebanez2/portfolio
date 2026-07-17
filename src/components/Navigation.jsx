import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LANG_OPTIONS = {
  es: { label: 'Español' },
  en: { label: 'English' },
};

const FlagIcon = ({ code }) => {
  if (code === 'es') {
    return (
      <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-white/20" aria-hidden="true">
        <rect width="24" height="16" fill="#c60b1e" />
        <rect y="4" width="24" height="8" fill="#ffc400" />
        <rect x="6" y="6" width="2.6" height="3.2" rx="0.4" fill="#c60b1e" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className="h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-white/20" aria-hidden="true">
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" strokeWidth="1.6" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5.2" />
      <path d="M12 0v16M0 8h24" stroke="#c8102e" strokeWidth="3" />
    </svg>
  );
};

const Navigation = ({ lang, setLang, t, isLangMenuOpen, setIsLangMenuOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const canUseHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const selectLanguage = (nextLang) => {
    setLang(nextLang);
    setIsLangMenuOpen(false);
    closeMobileMenu();
  };

  return (
    <nav className="fixed w-full z-50 glass py-4 px-4 sm:px-6 md:px-12 border-b border-white/5">
      <div className="flex justify-between items-center gap-4 min-w-0">
        <span className="text-lg sm:text-xl font-black tracking-tighter text-orange-500 shrink-0">DEV.PORTFOLIO</span>

        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest">
            <a href="#inicio" className="text-glow hover:text-orange-400 transition">{t.nav_home}</a>
            <a href="#proyectos" className="text-glow hover:text-orange-400 transition">{t.nav_projects}</a>
            <a href="#contacto" className="text-glow hover:text-orange-400 transition">{t.nav_contact}</a>
          </div>

          <div
            className="relative"
            onMouseEnter={() => { if (canUseHover()) setIsLangMenuOpen(true); }}
            onMouseLeave={() => { if (canUseHover()) setIsLangMenuOpen(false); }}
          >
            <button
              type="button"
              className="text-glow flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition py-2"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              aria-label={`Cambiar idioma. Actual: ${LANG_OPTIONS[lang].label}`}
            >
              <FlagIcon code={lang} />
              <span>{lang.toUpperCase()}</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 top-full pt-1 w-32 z-50">
                <div className="bg-stone-900 border border-orange-500/20 rounded-xl overflow-hidden shadow-xl">
                  {Object.entries(LANG_OPTIONS).map(([code, option]) => (
                    <button
                      key={code}
                      onClick={() => selectLanguage(code)}
                      className="hover-glow flex w-full items-center gap-2 px-4 py-3 text-left text-xs hover:bg-orange-500 hover:text-white transition"
                    >
                      <FlagIcon code={code} />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="text-glow md:hidden text-orange-500 cursor-pointer p-1 -mr-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden pt-4">
          <div className="grid gap-2 text-xs font-bold uppercase tracking-widest">
            <a href="#inicio" onClick={closeMobileMenu} className="hover-glow rounded-xl px-3 py-3 hover:bg-white/5 hover:text-orange-400 transition">{t.nav_home}</a>
            <a href="#proyectos" onClick={closeMobileMenu} className="hover-glow rounded-xl px-3 py-3 hover:bg-white/5 hover:text-orange-400 transition">{t.nav_projects}</a>
            <a href="#contacto" onClick={closeMobileMenu} className="hover-glow rounded-xl px-3 py-3 hover:bg-white/5 hover:text-orange-400 transition">{t.nav_contact}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
