import { useState } from 'react';
import { Database } from 'lucide-react';
import { getIconSlug } from '../utils/simpleIcons';

const DEVICON_SOURCES = {
  'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  'PlayFab': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  'SQL Server': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
  'Windows Forms': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg',
};

const SIMPLE_ICON_TECHS = new Set([
  '2D Modeling',
  '3D Modeling',
  '.NET',
  'A* Pathfinding',
  'Android Studio',
  'App Inventor',
  'AutoCAD 2023',
  'Bluetooth Protocol',
  'Blueprints',
  'Bootstrap',
  'C#',
  'C++',
  'C Language',
  'Cinemachine',
  'CSV Export',
  'CSS3',
  'Docker',
  'Epic Online Services',
  'FastAPI',
  'Firebase',
  'FullCalendar',
  'Game Networking',
  'GitHub Actions',
  'Google Calendar API',
  'Java',
  'JavaScript',
  'JSP',
  'Jetpack Compose',
  'Kotlin',
  'Linux Kernel',
  'Maven',
  'Material Design',
  'MPAndroidChart',
  'MongoDB',
  'Multiplayer',
  'MySQL',
  'Next.js',
  'NVIDIA DLSS',
  'PlayFab',
  'PostgreSQL',
  'Process Management',
  'React',
  'Responsive Design',
  'Spring Boot',
  'SQL Server',
  'SQLAlchemy',
  'SQLite',
  'Tailwind CSS',
  'Three.js',
  'TypeScript',
  'UMG',
  'Unreal Engine',
  'Unity 2D',
  'Vite',
  'Windows Forms',
]);

const TECH_COLORS = {
  '2D Modeling': 'e51050',
  '3D Modeling': 'e51050',
  '.NET': '512bd4',
  'A* Pathfinding': 'ffffff',
  'Android Studio': '3ddc84',
  'App Inventor': 'f88c1f',
  'AutoCAD 2023': 'e51050',
  'Bluetooth Protocol': '0082fc',
  Blueprints: 'ffffff',
  Bootstrap: '7952b3',
  'C#': '9b4f96',
  'C++': '00599c',
  'C Language': 'a8b9cc',
  Cinemachine: 'ffffff',
  'CSV Export': '217346',
  CSS3: '1572b6',
  Docker: '2496ed',
  'Epic Online Services': 'ffffff',
  FastAPI: '009688',
  Firebase: 'ffca28',
  FullCalendar: '3788d8',
  'Game Networking': 'ffffff',
  'GitHub Actions': '2088ff',
  'Google Calendar API': '4285f4',
  Java: 'f89820',
  JavaScript: 'f7df1e',
  JSP: 'f89820',
  'Jetpack Compose': '4285f4',
  Kotlin: '7f52ff',
  'Linux Kernel': 'fcc624',
  Maven: 'c71a36',
  'Material Design': '7b61ff',
  MPAndroidChart: '3ddc84',
  MongoDB: '47a248',
  Multiplayer: 'ffffff',
  MySQL: '4479a1',
  'NVIDIA DLSS': '76b900',
  'Next.js': 'ffffff',
  PlayFab: '0078d4',
  PostgreSQL: '4169e1',
  'Process Management': 'fcc624',
  React: '61dafb',
  'Responsive Design': '1572b6',
  'Three.js': 'ffffff',
  'Spring Boot': '6db33f',
  'SQL Server': 'cc2927',
  SQLAlchemy: 'd71f00',
  SQLite: '003b57',
  'Tailwind CSS': '38bdf8',
  TypeScript: '3178c6',
  UMG: 'ffffff',
  'Unreal Engine': 'ffffff',
  'Unity 2D': 'ffffff',
  Vite: '646cff',
  'Windows Forms': '0078d4',
};

const TechIcon = ({ tech, active = false, className = 'h-4 w-4' }) => {
  const iconSource = DEVICON_SOURCES[tech] || `https://cdn.simpleicons.org/${getIconSlug(tech)}/${active ? 'ffffff' : TECH_COLORS[tech] || 'd6d3d1'}`;
  const [useFallback, setUseFallback] = useState(!DEVICON_SOURCES[tech] && !SIMPLE_ICON_TECHS.has(tech));

  if (useFallback) {
    return <Database className={`${className} ${active ? 'text-white' : 'text-orange-300'}`} strokeWidth={2} />;
  }

  return (
    <img
      src={iconSource}
      className={className}
      onError={() => setUseFallback(true)}
      alt=""
      aria-hidden="true"
    />
  );
};

export default TechIcon;
