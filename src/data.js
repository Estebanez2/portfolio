export const TRANSLATIONS = {
    es: {
        nav_home: "Inicio", nav_projects: "Proyectos", nav_contact: "Contacto",
        hero_status: "Disponible para trabajar",
        hero_desc: "Soy desarrollador con el título de Ingeniero en Software en la Universidad de Málaga. Me especializo en desarrollo móvil (Android), videojuegos (Unreal) y aplicaciones web. Transformo ideas complejas en código limpio.",
        btn_projects: "VER PROYECTOS", btn_cv: "DESCARGAR CV",
        stack_title: "Tech Stack",
        section_projects_title: "Proyectos", section_projects_subtitle: "Una selección de mis trabajos solitarios o en grupo más destacados hasta el momento.",
        github_link: "Ver todo en GitHub", repo_activity: "Actividad reciente",
        contact_title: "¿Hablamos?", contact_desc: "Cualquier consulta o trabajo, no dudes en contactarme por correo o LinkedIn.",
        form_name_ph: "Nombre", form_email_ph: "Email", form_msg_ph: "¿En qué puedo ayudarte?",
        btn_send: "ENVIAR MENSAJE",
        footer: "© 2025 Dev Portfolio. Creado con React, Vite y TailWind.",
        modal_tech: "Stack Tecnológico", btn_repo: "REPO", btn_download: "APK / DEMO", btn_copied: "Copiado"
    },
    en: {
        nav_home: "Home", nav_projects: "Projects", nav_contact: "Contact",
        hero_status: "Open to work",
        hero_desc: "Software Engineer from the University of Malaga, focused on mobile development (Android), video games (Unreal), and web applications. Turning complex ideas into clean code.",
        btn_projects: "VIEW WORK", btn_cv: "DOWNLOAD CV",
        stack_title: "Tech Stack",
        section_projects_title: "Projects", section_projects_subtitle: "A selection of my most outstanding solo or group work to date.",
        github_link: "See all on GitHub", repo_activity: "Recent Activity",
        contact_title: "Let's Talk", contact_desc: "Any questions or work, feel free to contact me by email or LinkedIn.",
        form_name_ph: "Name", form_email_ph: "Email", form_msg_ph: "How can I help you?",
        btn_send: "SEND MESSAGE",
        footer: "© 2025 Dev Portfolio. Crafted with React, Vite and TailWind.",
        modal_tech: "Tech Stack", btn_repo: "REPO", btn_download: "APK / DEMO", btn_copied: "Copied"
    }
};

const BASE_PATH = import.meta.env.BASE_URL;
const asset = (path) => `${BASE_PATH}${path}`;
const projectAsset = (project, file) => asset(`proyectos/${project}/${file}`);
const SHELL_DOCKER_COMMAND = "docker run --rm -it ghcr.io/estebanez2/shelllinux:latest";
const DOCUNOVA_BACKEND_COMMAND = "cd backend && docker compose up --build";

export const PROJECTS = [
    {
        id: 1,
        titulo: { es: "BattleClickerRPG", en: "BattleClickerRPG" },
        resumen: { es: "Juego en Android estilo Clicker RPG", en: "Clicker RPG Style Android Game" },
        desc: { 
            es: "Battle Clicker RPG combina la mecánica clásica de los clickers con la progresión de un RPG. Lucha contra jefes, desbloquea habilidades, usa objetos, registra tus estadísticas y descubre contenido oculto.",
            en: "Battle Clicker RPG combines classic clicker mechanics with RPG progression. Fight bosses, unlock skills, use items, track your stats and discover hidden content."
        },
        tags: ["Android", "Game"],
        meta: { year: "2026", duration: { es: "2 meses", en: "2 months" } },
        tech: ["Android Studio", "Java", "SQLite", "Material Design"],
        portada: projectAsset("BattleClickerRPG", "iconoBattleClickerRPG.webp"),
        galeria: [
            projectAsset("BattleClickerRPG", "demoBattleClickerRPG.webm"),
            ...Array.from({ length: 8 }, (_, i) => projectAsset("BattleClickerRPG", `BattleClickerRPG_${i + 1}.webp`)),
        ],
        links: [
            { type: "web", url: "https://kazukigd2.github.io/BattleClickerRpgWeb/", label: { es: "Web de la App", en: "App Website" } },
            { type: "apk", url: "https://play.google.com/store/apps/details?id=com.kazukidev.battleclickerrpg", label: { es: "Ver en Play Store", en: "View on Play Store" } }
       ]
    },
    {
        id: 2,
        titulo: { es: "Gestor Gastos", en: "Expense Manager" },
        resumen: { es: "Aplicación para gestionar gastos personales", en: "Personal Expense Management App" },
        desc: {
            es: "Intuitiva aplicación para gestionar gastos personales mensuales de manera eficiente mediante categorías y reportes visuales pudiendo incluir fotos. Para poder visualizar mejor tus gastos tiene 4 vistas distintas: Lista, Calendario, Gráficos y Categorías.",
            en: "Intuitive application to efficiently manage personal monthly expenses with categories and visual reports, including photos. To better visualize your expenses, it has 4 different views: List, Calendar, Charts, and Categories."
        },
        tags: ["Android", "App"],
        meta: { year: "2026", duration: { es: "2 semanas", en: "2 weeks" } },
        tech: ["Android Studio", "Kotlin", "SQLite", "MPAndroidChart"],
        portada: projectAsset("GestorGastos", "iconoGestorGastos.webp"),
        galeria: [
            projectAsset("GestorGastos", "demoGestorGastos.webm"),
            ...Array.from({ length: 6 }, (_, i) => projectAsset("GestorGastos", `GestorGastos_${i + 1}.webp`))
        ],
        links: [
            { type: "github", url: "https://github.com/estebanez2/GestorGastos", label: { es: "Repo GitHub", en: "GitHub Repo" } },
            { type: "apk", url: projectAsset("GestorGastos", "GestorGastos_V1.apk"), label: { es: "Descargar APK", en: "Download APK" } }         
        ]
    },
    {
        id: 3,
        titulo: { es: "The Legends Of G", en: "The Legends Of G" },
        resumen: { es: "Juego RPG Top Down 2D", en: "Dynamic Top Down 2D RPG" },
        desc: {
            es: "The Legends Of G es un juego RPG Top Down 2D desarrollado en Unity que ofrece una experiencia de combate dinámica y fluida. Explora un mundo post-apocalíptico con enemigos variados. Usa los distintos objetos y el inventario para completar las misiones principales y secundarias.",
            en: "The Legends Of G is a Top Down 2D RPG game developed in Unity that offers a dynamic and fluid combat experience. Explore a post-apocalyptic world with varied enemies. Use different items and the inventory to complete main and side quests."
        },
        tags: ["Unity", "C#"],
        meta: { year: "2024", duration: { es: "3 meses", en: "3 months" } },
        tech: ["Unity 2D", "C#", "Cinemachine", "A* Pathfinding"],
        portada: projectAsset("TheLegendsOfG", "iconoTheLegendsOfG.webp"),
        galeria: [
            projectAsset("TheLegendsOfG", "demoTheLegendsOfG.webm"),
            ...Array.from({ length: 6 }, (_, i) => projectAsset("TheLegendsOfG", `TheLegendsOfG_${i + 1}.webp`))
        ],
        links: [
            { type: "download", url: "https://drive.google.com/file/d/1v6rJMRDNA_Fe8vXu7vr6hqcSNHqXPKPI/view?usp=sharing", label: { es: "Descargar Juego (.zip)", en: "Download Game (.zip)" } }
        ]
    },
    {
        id: 4,
        titulo: { es: "X-It", en: "X-It" },
        resumen: { es: "Escape Room multijugador online", en: "Online Multiplayer Escape Room" },
        desc: {
            es: "X-It es un juego Escape Room multijugador online desarrollado en React donde te enfrentarás a otra persona para ver quién sale primero de la habitación. Para que puedas escapar, deberás resolver una serie de acertijos y enigmas en un tiempo limitado.",
            en: "X-It is an online multiplayer Escape Room game developed in React where you will face another person to see who escapes the room first. To escape, you must solve a series of puzzles and riddles within a limited time."
        },
        tags: ["React", "Web"],
        meta: { year: "2025", duration: { es: "2 meses", en: "2 months" } },
        tech: ["React", "JavaScript", "Tailwind CSS", "Firebase"],
        portada: projectAsset("X-it", "iconoX-it.webp"),
        galeria: [
            projectAsset("X-it", "demoX-it.webm"),
            ...Array.from({ length: 5 }, (_, i) => projectAsset("X-it", `X-it_${i + 1}.webp`))
        ],
        links: [
            { type: "web", url: "https://x-it-nine.vercel.app/", label: { es: "Jugar en la Web", en: "Play on the Web" } },
        ]
    },
    {
        id: 5,
        titulo: { es: "MiniPIM", en: "MiniPIM" },
        resumen: { es: "Gestión de productos para tiendas (PIM)", en: "Product Information Management (PIM)" },
        desc: {
            es: "Aplicación de escritorio en C# (Windows Forms) orientada a la gestión de información de productos (PIM). Ofrece gestión de productos, categorías y atributos, relaciones entre productos, operaciones CRUD y exportación de datos a CSV compatible con Amazon.",
            en: "Desktop application in C# (Windows Forms) focused on product information management (PIM). It offers management of products, categories, and attributes, relationships between products, CRUD operations, and data export."
        },
        tags: ["Desktop", "C#"],
        meta: { year: "2024", duration: { es: "3 meses", en: "3 months" } },
        tech: ["C#", "Windows Forms", ".NET", "SQL Server", "CSV Export"],
        portada: projectAsset("MiniPIM", "iconoMiniPIM.webp"),
        galeria: [
            projectAsset("MiniPIM", "demoMiniPIM.webm"),
            ...Array.from({ length: 8 }, (_, i) => projectAsset("MiniPIM", `MiniPIM_${i + 1}.webp`))
        ],
        links: [
            { type: "github", url: "https://github.com/Estebanez2/MiniPIM", label: { es: "Ver GitHub + ReadMe.md para probar", en: "View GitHub + ReadMe.md to test" } },
        ]
    },
    {
        id: 6,
        titulo: { es: "SceneIt", en: "SceneIt" },
        resumen: { es: "Gestor de películas estilo IMDb", en: "IMDb-style Movie Manager" },
        desc: {
            es: "Proyecto de aplicación web construida con arquitectura MVC segura con JSP, Spring Boot y base de datos MySQL, que implementa un sistema de gestión de películas. Cuenta con roles diferenciados (administrador y usuario).",
            en: "Web application project built with secure MVC architecture using JSP, Spring Boot, and MySQL database, implementing a movie management system with differentiated roles."
        },
        tags: ["Java", "Web", "Spring"],
        meta: { year: "2025", duration: { es: "3 meses", en: "3 months" } },
        tech: ["Java", "Spring Boot", "MySQL", "JSP", "Bootstrap"],
        portada: projectAsset("SceneIt", "iconoSceneIt.webp"),
        galeria: [
            projectAsset("SceneIt", "demoSceneIt.webm"),
            ...Array.from({ length: 9 }, (_, i) => projectAsset("SceneIt", `SceneIt_${i + 1}.webp`))
        ],
        links: [
            { type: "github", url: "https://github.com/Estebanez2/SceneIt", label: { es: "Ver GitHub + ReadMe.md para probar", en: "View GitHub + ReadMe.md to test" } },
        ]
    },
    {
        id: 7,
        titulo: { es: "Chat Bluetooth", en: "Bluetooth Chat" },
        resumen: { es: "Chat Java y Android mediante Bluetooth", en: "Java and Android Bluetooth chat" },
        desc: {
            es: "Aplicación de comunicación Bluetooth con dos versiones: una app Android creada en MIT App Inventor y una aplicación de escritorio Java Swing. La versión Java unifica pruebas locales del adaptador, búsqueda de dispositivos, búsqueda de servicios RFCOMM, modo servidor, modo cliente y una demo local para validar el envío de mensajes sin necesitar dos equipos. Para el chat real, los dispositivos deben estar previamente emparejados por Bluetooth.",
            en: "Bluetooth communication project with two versions: an Android app built in MIT App Inventor and a Java Swing desktop application. The Java version brings together local adapter tests, device discovery, RFCOMM service discovery, server mode, client mode, and a local demo to validate message sending without needing two machines. For the real chat flow, devices must be paired through Bluetooth first."
        },
        tags: ["Java", "Android", "Bluetooth"],
        meta: { year: "2026", duration: { es: "2 semanas", en: "2 weeks" } },
        tech: ["Java", "App Inventor", "Bluetooth Protocol", "Android", "Maven"],
        portada: projectAsset("ChatBluetooth", "logoChatBluetooth.webp"),
        galeria: [
            projectAsset("ChatBluetooth", "demoChatBluetooth.webm"),
            ...Array.from({ length: 5 }, (_, i) => projectAsset("ChatBluetooth", `ChatBluetooth_${i + 1}.webp`))
        ],
        command: "java -jar chat-bluetooth-java-1.0.0.jar",
        links: [
            { type: "github", url: "https://github.com/Estebanez2/ChatBluetooth", label: { es: "Ver GitHub + README.md", en: "View GitHub + README.md" } },
            { type: "download", url: "https://github.com/Estebanez2/ChatBluetooth/releases/latest/download/chat-bluetooth-java-1.0.0-release.zip", label: { es: "Descargar Java App", en: "Download Java App" } },
            { type: "apk", url: "https://github.com/Estebanez2/ChatBluetooth/releases/latest/download/ChatBluetooth.apk", label: { es: "Descargar APK", en: "Download APK" } },
        ]
    },
    {
        id: 8,
        titulo: { es: "Modelado 2D y 3D", en: "2D & 3D Modeling" },
        resumen: { es: "Diseño técnico con AutoCAD", en: "Technical Design with AutoCAD" },
        desc: {
            es: "Proyecto de diseño técnico realizado con AutoCAD, enfocado en la creación de figuras e infografías en 2D y 3D. Incluye el uso de herramientas de acotación, organización por capas y escalado.",
            en: "Technical design project carried out with AutoCAD, focused on creating 2D and 3D figures and infographics. It includes the use of dimensioning tools, layer organization, and scaling."
        },
        tags: ["Design", "AutoCAD"],
        meta: { year: "2022", duration: { es: "5 meses", en: "5 months" } },
        tech: ["AutoCAD 2023", "2D Modeling", "3D Modeling"],
        portada: projectAsset("AutoCad", "iconoAutoCad.webp"),
        galeria: [
            ...Array.from({ length: 11 }, (_, i) => projectAsset("AutoCad", `AutoCad_${i + 1}.webp`))
        ],
        links: [
             { type: "github", url: "https://github.com/Estebanez2/AutoCad_2D-3D", label: { es: "Ver GitHub + ReadMe.md para probar", en: "View GitHub + ReadMe.md to test" } },
        ]
    },
    {
        id: 9,
        titulo: { es: "Shell Linux", en: "Linux Shell" },
        resumen: { es: "Shell interactiva en C lista para probar con Docker", en: "Interactive C shell ready to run with Docker" },
        desc: {
            es: "Shell interactiva desarrollada en C para Linux. Permite ejecutar comandos del sistema, gestionar procesos en foreground y background, usar redirecciones, controlar jobs, trabajar con señales POSIX y probar ampliaciones como trabajos respawnables, alarmas y ejecución diferida. El proyecto está empaquetado con Docker y publicado en GitHub Container Registry para poder probarlo sin configurar una máquina virtual.",
            en: "Interactive Linux shell developed in C. It can run system commands, manage foreground and background processes, use redirections, control jobs, work with POSIX signals, and test extensions such as respawnable jobs, alarms, and delayed execution. The project is packaged with Docker and published on GitHub Container Registry so it can be tested without setting up a virtual machine."
        },
        tags: ["Linux", "C", "Docker"],
        meta: { year: "2024", duration: { es: "2 meses", en: "2 months" } },
        tech: ["C Language", "Linux Kernel", "Process Management", "Docker", "GitHub Actions"],
        command: SHELL_DOCKER_COMMAND,
        galeria: [
            projectAsset("ShellLinux", "demoShellLinux.webm"),
            ...Array.from({ length: 3 }, (_, i) => projectAsset("ShellLinux", `ShellLinux_${i + 1}.webp`)),
        ],
        links: [
            { type: "github", url: "https://github.com/Estebanez2/ShellLinux", label: { es: "Ver GitHub + ReadMe.md", en: "View GitHub + ReadMe.md" } },
            { type: "command", command: SHELL_DOCKER_COMMAND, label: { es: "Copiar comando Docker", en: "Copy Docker command" } },
        ]
    },
    {
        id: 10,
        titulo: { es: "Portfolio Alejandro Biedma", en: "Alejandro Biedma Portfolio" },
        resumen: { es: "Portfolio React para Ingeniero Industrial", en: "React portfolio for an Industrial Engineer" },
        desc: {
            es: "Portfolio profesional desarrollado con React y Vite para Alejandro Biedma Carrasco, estudiante de Ingeniería en Diseño Industrial y Desarrollo del Producto. La web presenta proyectos de diseño industrial con navegación por rutas hash, cambio de idioma, páginas de detalle, galerías optimizadas, documentos técnicos y visualización de modelos 3D con Three.js. El objetivo fue crear una experiencia responsive, visualmente cuidada y ligera para mostrar renders, planos, memorias y branding de cada proyecto.",
            en: "Professional portfolio built with React and Vite for Alejandro Biedma Carrasco, an Industrial Design and Product Development Engineering student. The site presents industrial design projects through hash routing, language switching, detail pages, optimized galleries, technical documents, and 3D model visualization with Three.js. The goal was to create a responsive, polished, lightweight experience for renders, drawings, reports, and project branding."
        },
        tags: ["React", "Web"],
        meta: { year: "2026", duration: { es: "1 semana", en: "1 week" } },
        tech: ["React", "Vite", "Three.js", "JavaScript", "CSS3", "Responsive Design"],
        portada: projectAsset("PortfolioBiedma", "logo.webp"),
        coverOverlay: false,
        galeria: [
            projectAsset("PortfolioBiedma", "demoPortfolioBiedma.webm"),
            ...Array.from({ length: 7 }, (_, i) => projectAsset("PortfolioBiedma", `PortfolioBiedma_${i + 1}.webp`)),
        ],
        links: [
            { type: "github", url: "https://github.com/Estebanez2/portfolioAlejandroBiedmaCarrasco", label: { es: "Ver GitHub", en: "View GitHub" } },
        ]
    },
    {
        id: 11,
        titulo: { es: "Kalendas", en: "Kalendas" },
        resumen: { es: "Calendario full stack con microservicios", en: "Full-stack calendar with microservices" },
        desc: {
            es: "Aplicación full stack de calendarios desarrollada en equipo e inspirada en Google Calendar. Permite gestionar calendarios propios, públicos y suscritos, crear subcalendarios, administrar eventos con etiquetas, importar y exportar calendarios en JSON, importar calendarios desde Google Calendar, añadir comentarios, notificaciones y multimedia. La arquitectura separa frontend React/TypeScript, API Gateway con FastAPI, microservicios independientes, MongoDB y un servicio Node/Express para Cloudinary y Brevo, todo preparado para ejecutarse con Docker Compose.",
            en: "Team-built full-stack calendar application inspired by Google Calendar. It supports personal, public and subscribed calendars, nested subcalendars, event management with tags, JSON import/export, Google Calendar imports, comments, notifications and multimedia. The architecture separates a React/TypeScript frontend, a FastAPI API Gateway, independent microservices, MongoDB and a Node/Express service for Cloudinary and Brevo, all ready to run with Docker Compose."
        },
        tags: ["React", "Web"],
        meta: { year: "2025", duration: { es: "3 meses", en: "3 months" } },
        tech: ["React", "TypeScript", "FastAPI", "MongoDB", "Docker", "Firebase", "FullCalendar", "Google Calendar API"],
        portada: projectAsset("Kalendas", "logo.webp"),
        coverOverlay: false,
        galeria: [
            projectAsset("Kalendas", "demoKalendas.webm"),
            ...Array.from({ length: 6 }, (_, i) => projectAsset("Kalendas", `Kalendas_${i + 1}.webp`)),
        ],
        links: [
            { type: "github", url: "https://github.com/Estebanez2/KalendasWeb", label: { es: "Ver GitHub + ReadMe.md", en: "View GitHub + ReadMe.md" } },
        ]
    },
    {
        id: 12,
        titulo: { es: "Docunova", en: "Docunova" },
        resumen: { es: "Plataforma web y móvil para gestión de obras", en: "Web and mobile platform for construction management" },
        desc: {
            es: "Plataforma full stack desarrollada durante mis prácticas de empresa para gestionar proyectos de obra, empleados y partes de trabajo. El sistema conecta un backend FastAPI con PostgreSQL, un backoffice web en Next.js/React y una app Android en Kotlin con Jetpack Compose. Incluye autenticación con JWT, roles de administrador y empleado, CRUD de proyectos y empleados, partes con fechas, horas, notas e imágenes, migraciones con Alembic y ejecución local preparada con Docker.",
            en: "Full-stack platform developed during my company internship to manage construction projects, employees and work records. The system connects a FastAPI backend with PostgreSQL, a Next.js/React web backoffice and a Kotlin Android app built with Jetpack Compose. It includes JWT authentication, admin and employee roles, CRUD flows for projects and employees, work records with dates, hours, notes and images, Alembic migrations and a Docker-ready local setup."
        },
        tags: ["Full Stack", "Android", "Web"],
        meta: { year: "2026", duration: { es: "2 meses", en: "2 months" } },
        tech: ["Kotlin", "Jetpack Compose", "Next.js", "React", "TypeScript", "FastAPI", "PostgreSQL", "SQLAlchemy", "Docker"],
        portada: projectAsset("Docunova", "logo.webp"),
        coverOverlay: false,
        command: DOCUNOVA_BACKEND_COMMAND,
        galeria: [
            projectAsset("Docunova", "demoDocunova.webm"),
            ...Array.from({ length: 11 }, (_, i) => projectAsset("Docunova", `Docunova_${i + 1}.webp`)),
        ],
        links: [
            { type: "github", url: "https://github.com/Estebanez2/Docunova", label: { es: "Ver GitHub + ReadMe.md", en: "View GitHub + ReadMe.md" } },
        ]
    },
    {
        id: 13,
        titulo: { es: "BoardGameVerse", en: "BoardGameVerse" },
        resumen: { es: "Hub multijugador de juegos de mesa en Unreal Engine", en: "Multiplayer board game hub built with Unreal Engine" },
        desc: {
            es: "Trabajo de Fin de Grado desarrollado en Unreal Engine 5 como una plataforma multijugador de juegos de mesa virtuales en 3D. Permite a jugadores remotos autenticarse con Epic Online Services, crear o buscar salas, reunirse en un lobby sincronizado, consultar instrucciones y jugar partidas online en tiempo real. El hub integra dos juegos de cartas, Pelusas Revolution y Power Hungry Pets, cada uno con reglas, turnos, cartas, efectos e interfaces propias. La arquitectura combina C++, Blueprints, UMG y replicación de red de Unreal con lógica autoritativa en servidor y un diseño preparado para añadir nuevos juegos reutilizando el sistema común de sesiones y lobby.",
            en: "Final Degree Project developed in Unreal Engine 5 as a multiplayer 3D virtual board game platform. Remote players can authenticate with Epic Online Services, create or find rooms, meet in a synchronized lobby, check in-game instructions and play online matches in real time. The hub includes two card games, Pelusas Revolution and Power Hungry Pets, each with its own rules, turns, cards, effects and interfaces. The architecture combines C++, Blueprints, UMG and Unreal network replication with server-authoritative logic and a design prepared to add new games by reusing the shared session and lobby systems."
        },
        tags: ["Unreal", "Multiplayer", "TFG"],
        meta: { year: "2026", duration: { es: "3 meses", en: "3 months" } },
        tech: ["Unreal Engine", "C++", "Blueprints", "Epic Online Services", "Multiplayer", "Game Networking", "UMG"],
        portada: projectAsset("TFG", "logo.webp"),
        coverOverlay: false,
        galeria: [
            projectAsset("TFG", "demoTFG.webm"),
            ...Array.from({ length: 10 }, (_, i) => projectAsset("TFG", `TFG_${i + 1}.webp`)),
        ],
        links: [
            { type: "github", url: "https://github.com/Estebanez2/TFG", label: { es: "Ver GitHub + ReadMe.md", en: "View GitHub + ReadMe.md" } },
            { type: "download", url: "https://drive.google.com/file/d/1Ti2BTempSw0KhsuUCp4DlJ8ngR43M6DE/view?usp=sharing", label: { es: "Descargar Juego", en: "Download Game" } },
            { type: "download", url: projectAsset("TFG", "MemoriaTFG_AlejandroEstebanezMoreno_2026.pdf"), label: { es: "Ver Memoria TFG", en: "View TFG Report" } },
        ]
    },
    {
        id: 14,
        titulo: { es: "EverGuard", en: "EverGuard" },
        resumen: { es: "Roguelike de acción multijugador en Unreal Engine", en: "Multiplayer action roguelike built with Unreal Engine" },
        desc: {
            es: "Videojuego desarrollado en equipo de cuatro personas como un roguelike de acción y fantasía oscura con vista isométrica. Cuatro guardianes con roles diferenciados protegen una reliquia sagrada mientras avanzan por una mazmorra con enemigos, oleadas, jefes, loot, experiencia, subida de nivel y pasivas desbloqueables al completar runs. El proyecto integra multijugador online con Epic Online Services, ranking global top 10 mediante PlayFab y soporte de NVIDIA DLSS para mejorar rendimiento y calidad visual.",
            en: "Video game built by a four-person team as an isometric dark fantasy action roguelike. Four guardians with distinct roles protect a sacred relic while exploring a dungeon with enemies, waves, bosses, loot, experience, leveling and passive upgrades unlocked after completed runs. The project integrates online multiplayer with Epic Online Services, a global top 10 ranking through PlayFab and NVIDIA DLSS support to improve performance and visual quality."
        },
        tags: ["Unreal", "Multiplayer", "Roguelike"],
        meta: { year: "2026", duration: { es: "2 meses", en: "2 months" } },
        tech: ["Unreal Engine", "C++", "Blueprints", "Epic Online Services", "PlayFab", "NVIDIA DLSS", "Multiplayer"],
        portada: projectAsset("EverGuard", "logo.webp"),
        coverOverlay: false,
        galeria: [
            projectAsset("EverGuard", "demoEverGuard.webm"),
            ...Array.from({ length: 9 }, (_, i) => projectAsset("EverGuard", `EverGuard_${i + 1}.webp`)),
        ],
        links: [
            { type: "web", url: "https://www.ever-guard.net/", label: { es: "Web oficial", en: "Official Website" } },
            { type: "download", url: "https://drive.google.com/file/d/1CKLkU6hw-uWIhW_SI5t1tNecE7h2SCyi/view?usp=sharing", label: { es: "Descargar Juego", en: "Download Game" } },
        ]
    }
];
