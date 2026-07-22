import { useState } from 'react';
import {
  Bluetooth,
  Box,
  CalendarDays,
  Code2,
  Cpu,
  Database,
  FileSpreadsheet,
  Film,
  MonitorCog,
  Palette,
  PanelsTopLeft,
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
  Blueprints: Workflow,
  'C Language': Code2,
  Cinemachine: Film,
  'CSV Export': FileSpreadsheet,
  FullCalendar: CalendarDays,
  'Game Networking': ServerCog,
  'Linux Kernel': ServerCog,
  Multiplayer: Workflow,
  MPAndroidChart: Workflow,
  PlayFab: ServerCog,
  'Process Management': Cpu,
  'Responsive Design': PanelsTopLeft,
  UMG: PanelsTopLeft,
  'Windows Forms': MonitorCog,
};

const SIMPLE_ICON_TECHS = new Set([
  '.NET',
  'Android Studio',
  'App Inventor',
  'AutoCAD 2023',
  'Bootstrap',
  'C#',
  'C++',
  'CSS3',
  'Docker',
  'Epic Online Services',
  'FastAPI',
  'Firebase',
  'GitHub Actions',
  'Google Calendar API',
  'Java',
  'JavaScript',
  'Jetpack Compose',
  'Kotlin',
  'Material Design',
  'MongoDB',
  'MySQL',
  'NVIDIA DLSS',
  'Next.js',
  'PostgreSQL',
  'React',
  'Three.js',
  'Spring Boot',
  'SQL Server',
  'SQLAlchemy',
  'SQLite',
  'Tailwind CSS',
  'TypeScript',
  'Unreal Engine',
  'Unity 2D',
  'Vite',
]);

const TECH_COLORS = {
  '.NET': '512bd4',
  'Android Studio': '3ddc84',
  'App Inventor': 'f88c1f',
  'AutoCAD 2023': 'e51050',
  Bootstrap: '7952b3',
  'C#': '9b4f96',
  'C++': '00599c',
  CSS3: '1572b6',
  Docker: '2496ed',
  'Epic Online Services': 'ffffff',
  FastAPI: '009688',
  Firebase: 'ffca28',
  'GitHub Actions': '2088ff',
  'Google Calendar API': '4285f4',
  Java: 'f89820',
  JavaScript: 'f7df1e',
  'Jetpack Compose': '4285f4',
  Kotlin: '7f52ff',
  'Material Design': '7b61ff',
  MongoDB: '47a248',
  MySQL: '4479a1',
  'NVIDIA DLSS': '76b900',
  'Next.js': 'ffffff',
  PostgreSQL: '4169e1',
  React: '61dafb',
  'Three.js': 'ffffff',
  'Spring Boot': '6db33f',
  'SQL Server': 'cc2927',
  SQLAlchemy: 'd71f00',
  SQLite: '003b57',
  'Tailwind CSS': '38bdf8',
  TypeScript: '3178c6',
  'Unreal Engine': 'ffffff',
  'Unity 2D': 'ffffff',
  Vite: '646cff',
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
