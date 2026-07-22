import { FileText } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import fotoPerfil from '../mi_foto.webp';

const HeroSection = ({ t }) => (
  <section id="inicio" className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-28 md:pt-20 pb-12 md:pb-0">
    <div className="max-w-6xl w-full min-w-0 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <Motion.div
        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="text-center md:text-left order-2 md:order-1 min-w-0"
      >
        <div className="inline-block px-3 py-1 mb-4 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold tracking-widest uppercase">
          {t.hero_status}
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
          CODE.<br />CREATE.<br /><span className="orange-gradient">DEPLOY.</span>
        </h1>
        <p className="text-stone-400 text-base sm:text-lg mb-8 leading-relaxed max-w-full break-words">{t.hero_desc}</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start w-full max-w-sm mx-auto md:max-w-none md:mx-0">
          <a href="#proyectos" className="btn-orange hover-glow px-6 sm:px-8 py-4 rounded-2xl font-bold text-center">{t.btn_projects}</a>
          <a href={`${import.meta.env.BASE_URL}CV_Alejandro_EstebanezMoreno.pdf`} target="_blank" rel="noopener noreferrer" download="CV_Alejandro_EstebanezMoreno.pdf" className="glass hover-glow px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition">
            <FileText size={16} /> {t.btn_cv}
          </a>
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        className="order-1 md:order-2 flex justify-center relative min-w-0"
      >
        <div className="absolute inset-0 bg-orange-500/20 blur-[80px] rounded-full"></div>
        <div className="hover-glow relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[23rem] lg:h-[23rem] xl:w-[24rem] xl:h-[24rem] rounded-[2rem] overflow-hidden border-2 border-orange-500/50 profile-glow rotate-3 hover:rotate-0 transition duration-500 bg-stone-800">
          <img src={fotoPerfil} alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition" />
        </div>
      </Motion.div>
    </div>
  </section>
);

export default HeroSection;
