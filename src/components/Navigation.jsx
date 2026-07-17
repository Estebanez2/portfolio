import { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';

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
            <a href="#inicio" className="hover:text-orange-400 transition">{t.nav_home}</a>
            <a href="#proyectos" className="hover:text-orange-400 transition">{t.nav_projects}</a>
            <a href="#contacto" className="hover:text-orange-400 transition">{t.nav_contact}</a>
          </div>

          <div
            className="relative"
            onMouseEnter={() => { if (canUseHover()) setIsLangMenuOpen(true); }}
            onMouseLeave={() => { if (canUseHover()) setIsLangMenuOpen(false); }}
          >
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition py-2"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <Globe size={16} /> <span>{lang.toUpperCase()}</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 top-full pt-1 w-24 z-50">
                <div className="bg-stone-900 border border-orange-500/20 rounded-xl overflow-hidden shadow-xl">
                  <button onClick={() => selectLanguage('es')} className="block w-full text-left px-4 py-3 text-xs hover:bg-orange-500 hover:text-white transition">Español</button>
                  <button onClick={() => selectLanguage('en')} className="block w-full text-left px-4 py-3 text-xs hover:bg-orange-500 hover:text-white transition">English</button>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="md:hidden text-orange-500 cursor-pointer p-1 -mr-1"
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
            <a href="#inicio" onClick={closeMobileMenu} className="rounded-xl px-3 py-3 hover:bg-white/5 hover:text-orange-400 transition">{t.nav_home}</a>
            <a href="#proyectos" onClick={closeMobileMenu} className="rounded-xl px-3 py-3 hover:bg-white/5 hover:text-orange-400 transition">{t.nav_projects}</a>
            <a href="#contacto" onClick={closeMobileMenu} className="rounded-xl px-3 py-3 hover:bg-white/5 hover:text-orange-400 transition">{t.nav_contact}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
