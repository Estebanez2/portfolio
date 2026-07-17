const GithubActivity = ({ t }) => (
  <section className="py-14 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
    <div className="glass p-4 sm:p-8 rounded-3xl inline-flex max-w-full flex-col items-center overflow-x-auto border border-orange-500/10">
      <h3 className="text-xs font-bold text-stone-500 uppercase tracking-[0.3em] mb-6">{t.repo_activity}</h3>
      <img
        src="https://ghchart.rshah.org/ea580c/estebanez2"
        alt="Github Chart"
        className="w-[820px] max-w-none opacity-80 hover:opacity-100 transition-opacity"
      />
    </div>
  </section>
);

export default GithubActivity;
