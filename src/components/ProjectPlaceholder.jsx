import { Terminal } from 'lucide-react';

const ProjectPlaceholder = ({ title, command, compact = false }) => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0b0a09] p-4">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(249,115,22,0.22),transparent_34%),linear-gradient(135deg,rgba(28,25,23,0.9),rgba(0,0,0,0.95))]" />
    <div className="absolute inset-x-0 top-0 h-8 border-b border-white/10 bg-white/[0.03]">
      <div className="ml-3 mt-3 flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-red-500/80" />
        <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
        <span className="h-2 w-2 rounded-full bg-green-500/80" />
      </div>
    </div>

    <div className="relative z-10 w-full max-w-sm pt-6 font-mono">
      <div className="mb-3 flex items-center gap-2 text-orange-400">
        <Terminal className={compact ? 'h-5 w-5' : 'h-7 w-7'} strokeWidth={2.4} />
        <span className={`${compact ? 'text-[10px]' : 'text-xs'} font-bold uppercase tracking-widest`}>
          {title}
        </span>
      </div>
      <div className={`${compact ? 'text-[10px]' : 'text-sm'} leading-relaxed text-stone-200`}>
        <span className="text-orange-400">COMMAND-&gt;</span>
        <span className="ml-2 break-all">{command || './shell'}</span>
      </div>
    </div>
  </div>
);

export default ProjectPlaceholder;
