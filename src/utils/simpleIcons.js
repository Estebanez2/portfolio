const ICON_SLUGS = {
  'C#': 'csharp',
  'C++': 'cplusplus',
  '.NET': 'dotnet',
  'Material Design': 'materialdesignicons',
  'SQL Server': 'microsoftsqlserver',
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
