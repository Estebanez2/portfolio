const ICON_SLUGS = {
  'C#': 'csharp',
  'C Language': 'c',
  'C++': 'cplusplus',
  '.NET': 'dotnet',
  'Android Studio': 'androidstudio',
  'App Inventor': 'appinventor',
  'AutoCAD 2023': 'autodesk',
  Bootstrap: 'bootstrap',
  Firebase: 'firebase',
  Java: 'openjdk',
  JavaScript: 'javascript',
  Kotlin: 'kotlin',
  MySQL: 'mysql',
  'Material Design': 'materialdesignicons',
  React: 'react',
  'Spring Boot': 'springboot',
  'SQL Server': 'microsoftsqlserver',
  SQLite: 'sqlite',
  'Tailwind CSS': 'tailwindcss',
  'Unity 2D': 'unity',
  HTML5: 'html5',
  CSS3: 'css3',
  'React Native': 'react',
  'Express.js': 'express',
  'Node.js': 'nodedotjs',
};

export const getIconSlug = (techName) => {
  if (ICON_SLUGS[techName]) return ICON_SLUGS[techName];
  return techName.toLowerCase().replace(/\s+/g, '').replace(/\./g, '');
};
