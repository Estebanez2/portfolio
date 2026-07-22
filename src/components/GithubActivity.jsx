const GithubActivity = ({ t }) => (
  <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto text-center">
    <div className="glass w-full p-4 sm:p-10 rounded-3xl flex flex-col items-center overflow-hidden border border-orange-500/10">
      <h3 className="text-sm sm:text-lg font-bold text-stone-500 uppercase tracking-[0.22em] sm:tracking-[0.35em] mb-6 sm:mb-8">{t.repo_activity}</h3>
      <img
        src="https://ghchart.rshah.org/ea580c/estebanez2"
        alt="Github Chart"
        className="w-full max-w-[1050px] h-auto opacity-80 hover:opacity-100 transition-opacity"
      />
    </div>
  </section>
);

export default GithubActivity;
