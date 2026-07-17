import { useState } from 'react';
import {
  Bluetooth,
  Box,
  Code2,
  Cpu,
  Database,
  FileSpreadsheet,
  Film,
  MonitorCog,
  Palette,
  Route,
  ServerCog,
  Workflow,
} from 'lucide-react';
import { getIconSlug } from '../utils/simpleIcons';

const TECH_FALLBACKS = {
  '2D Modeling': Palette,
  '3D Modeling': Box,
  'A* Pathfinding': Route,
  'Bluetooth Protocol': Bluetooth,
  'C Language': Code2,
  Cinemachine: Film,
  'CSV Export': FileSpreadsheet,
  'Linux Kernel': ServerCog,
  MPAndroidChart: Workflow,
  'Process Management': Cpu,
  'Windows Forms': MonitorCog,
};

const SIMPLE_ICON_TECHS = new Set([
  '.NET',
  'Android Studio',
  'App Inventor',
  'AutoCAD 2023',
  'Bootstrap',
  'C#',
  'Firebase',
  'Java',
  'JavaScript',
  'Kotlin',
  'Material Design',
  'MySQL',
  'React',
  'Spring Boot',
  'SQL Server',
  'SQLite',
  'Tailwind CSS',
  'Unity 2D',
]);

const TECH_COLORS = {
  '.NET': '512bd4',
  'Android Studio': '3ddc84',
  'App Inventor': 'f88c1f',
  'AutoCAD 2023': 'e51050',
  Bootstrap: '7952b3',
  'C#': '9b4f96',
  Firebase: 'ffca28',
  Java: 'f89820',
  JavaScript: 'f7df1e',
  Kotlin: '7f52ff',
  'Material Design': '7b61ff',
  MySQL: '4479a1',
  React: '61dafb',
  'Spring Boot': '6db33f',
  'SQL Server': 'cc2927',
  SQLite: '003b57',
  'Tailwind CSS': '38bdf8',
  'Unity 2D': 'ffffff',
};

const TechIcon = ({ tech, active = false, className = 'h-4 w-4' }) => {
  const [useFallback, setUseFallback] = useState(!SIMPLE_ICON_TECHS.has(tech));
  const FallbackIcon = TECH_FALLBACKS[tech] || (tech.includes('Modeling') ? Palette : Database);
  const color = active ? 'ffffff' : TECH_COLORS[tech] || 'd6d3d1';

  if (useFallback) {
    return <FallbackIcon className={`${className} ${active ? 'text-white' : 'text-orange-300'}`} strokeWidth={2} />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${getIconSlug(tech)}/${color}`}
      className={className}
      onError={() => setUseFallback(true)}
      alt=""
      aria-hidden="true"
    />
  );
};

export default TechIcon;
