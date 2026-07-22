import { FileText, Github, Linkedin } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const ContactSection = ({ t }) => {
  const [state, handleSubmit] = useForm('xkobaqjg');

  return (
    <section id="contacto" className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      <Motion.div
        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="glass p-5 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">{t.contact_title}</h2>
          <p className="text-stone-400">{t.contact_desc}</p>
        </div>

        {state.succeeded ? (
          <div className="text-center py-10 animate-fade-in">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">¡Mensaje Enviado! 🚀</h3>
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

            <button type="submit" disabled={state.submitting} className="btn-orange hover-glow py-4 rounded-xl font-bold tracking-widest hover:scale-[1.02] active:scale-95 transition disabled:opacity-50">
              {state.submitting ? 'ENVIANDO...' : t.btn_send}
            </button>
          </form>
        )}

        <div className="flex justify-center gap-10 mt-10">
          <a href="https://www.linkedin.com/in/alejandro-estebanez-moreno-a2749a3aa/" className="hover-glow grid h-16 w-16 place-items-center rounded-full text-stone-500 hover:text-orange-500 transition" aria-label="LinkedIn">
            <Linkedin size={44} strokeWidth={1.7} />
          </a>
          <a href="https://github.com/estebanez2" className="hover-glow grid h-16 w-16 place-items-center rounded-full text-stone-500 hover:text-orange-500 transition" aria-label="GitHub">
            <Github size={44} strokeWidth={1.7} />
          </a>
        </div>
      </Motion.div>
    </section>
  );
};

export default ContactSection;
