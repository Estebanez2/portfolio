export const TRANSLATIONS = {
    es: {
        nav_home: "Inicio", nav_projects: "Proyectos", nav_contact: "Contacto",
        hero_status: "Disponible para trabajar",
        hero_desc: "Soy desarrollador apasionado por la creación de software interactivo. Me especializo en Desarrollo Móvil (Android) y Videojuegos (Unity). Transformo ideas complejas en código limpio.",
        btn_projects: "VER PROYECTOS", btn_cv: "DESCARGAR CV",
        stack_title: "Tech Stack",
        section_projects_title: "Proyectos", section_projects_subtitle: "Una selección de mis trabajos solitarios o en grupo más destacados hasta el momento.",
        github_link: "Ver todo en GitHub", repo_activity: "Actividad reciente",
        contact_title: "¿Hablamos?", contact_desc: "Cualquier consulta o trabajo, no dudes en contactarme por correo o LinkedIn.",
        form_name_ph: "Nombre", form_email_ph: "Email", form_msg_ph: "¿En qué puedo ayudarte?",
        btn_send: "ENVIAR MENSAJE",
        footer: "© 2025 Dev Portfolio. Creado con React, Vite y TailWind.",
        modal_tech: "Stack Tecnológico", btn_repo: "REPO", btn_download: "APK / DEMO"
    },
    en: {
        nav_home: "Home", nav_projects: "Projects", nav_contact: "Contact",
        hero_status: "Open to work",
        hero_desc: "Passionate developer focused on creating interactive software. Specialized in Mobile Development (Android) and Game Dev (Unity). Turning complex ideas into clean code.",
        btn_projects: "VIEW WORK", btn_cv: "DOWNLOAD CV",
        stack_title: "Tech Stack",
        section_projects_title: "Projects", section_projects_subtitle: "A selection of my most outstanding solo or group work to date.",
        github_link: "See all on GitHub", repo_activity: "Recent Activity",
        contact_title: "Let's Talk", contact_desc: "Any questions or work, feel free to contact me by email or LinkedIn.",
        form_name_ph: "Name", form_email_ph: "Email", form_msg_ph: "How can I help you?",
        btn_send: "SEND MESSAGE",
        footer: "© 2025 Dev Portfolio. Crafted with React, Vite and TailWind.",
        modal_tech: "Tech Stack", btn_repo: "REPO", btn_download: "APK / DEMO"
    }
};

const BASE_PATH = import.meta.env.BASE_URL;

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
        tech: ["Android Studio", "Java", "SQLite", "Material Design"],
        portada: `${BASE_PATH}proyectos/BattleClickerRPG/iconoBattleClickerRPG.png`,
        galeria: [
            `${BASE_PATH}proyectos/BattleClickerRPG/demoBattleClickerRPG.mp4`,
            ...Array.from({ length: 8 }, (_, i) => `${BASE_PATH}proyectos/BattleClickerRPG/BattleClickerRPG_${i + 1}.png`),
        ],
        links: [
            { type: "web", url: "https://kazukigd2.github.io/BattleClickerRpgWeb/", label: { es: "Web de la App", en: "App Website" } },
            { type: "apk", url: `${BASE_PATH}/proyectos/BattleClickerRPG/BattleClickerRPG_V1.apk`, label: { es: "Descargar APK", en: "Download APK" } } 
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
        tech: ["Android Studio", "Kotlin", "SQLite", "MPAndroidChart"],
        portada: `${BASE_PATH}proyectos/GestorGastos/iconoGestorGastos.png`,
        galeria: [
            `${BASE_PATH}proyectos/GestorGastos/demoGestorGastos.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/GestorGastos/GestorGastos_${i + 1}.png`)
        ],
        links: [
            { type: "github", url: "https://github.com/estebanez2/GestorGastos", label: { es: "Repo GitHub", en: "GitHub Repo" } },
            { type: "apk", url: `${BASE_PATH}/proyectos/GestorGastos/GestorGastos_V1.apk`, label: { es: "Descargar APK", en: "Download APK" } }         
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
        tech: ["Unity 2D", "C#", "Cinemachine", "A* Pathfinding"],
        portada: `${BASE_PATH}proyectos/TheLegendsOfG/iconoTheLegendsOfG.png`,
        galeria: [
            `${BASE_PATH}proyectos/TheLegendsOfG/demoTheLegendsOfG.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/TheLegendsOfG/TheLegendsOfG_${i + 1}.png`)
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
        tech: ["React", "JavaScript", "Tailwind CSS", "Firebase"],
        portada: `${BASE_PATH}proyectos/X-it/iconoX-it.png`,
        galeria: [
            `${BASE_PATH}proyectos/X-it/demoX-it.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/X-it/X-it_${i + 1}.png`)
        ],
        links: [
            { type: "web", url: "https://x-it-nine.vercel.app/", label: { es: "Jugar en la Web", en: "Play on the Web   " } },
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
        tech: ["C#", "Windows Forms", ".NET", "SQL Server", "CSV Export"],
        portada: `${BASE_PATH}proyectos/MiniPIM/iconoMiniPIM.png`,
        galeria: [
            `${BASE_PATH}proyectos/MiniPIM/demoMiniPIM.mp4`,
            ...Array.from({ length: 8 }, (_, i) => `${BASE_PATH}proyectos/MiniPIM/MiniPIM_${i + 1}.png`)
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
        tech: ["Java", "Spring Boot", "MySQL", "JSP", "Bootstrap"],
        portada: `${BASE_PATH}proyectos/SceneIt/iconoSceneIt.png`,
        galeria: [
            `${BASE_PATH}proyectos/SceneIt/demoSceneIt.mp4`,
            ...Array.from({ length: 9 }, (_, i) => `${BASE_PATH}proyectos/SceneIt/SceneIt_${i + 1}.png`)
        ],
        links: [
            { type: "github", url: "https://github.com/Estebanez2/SceneIt", label: { es: "Ver GitHub + ReadMe.md para probar", en: "View GitHub + ReadMe.md to test" } },
        ]
    },
    {
        id: 7,
        titulo: { es: "Chat Bluetooth", en: "Bluetooth Chat" },
        resumen: { es: "Chat móvil mediante Bluetooth", en: "Bluetooth Mobile Chat" },
        desc: {
            es: "Aplicación desarrollada con Scratch que implementa un sistema de mensajería básica mediante comunicación Bluetooth. Pese a que Scratch no está diseñado para este tipo de aplicaciones, si no más para entornos educativos, el proyecto explora conceptos fundamentales como el intercambio de mensajes en tiempo real.",
            en: "Application developed with Scratch that implements a basic messaging system using Bluetooth communication. Although Scratch is not designed for this type of application, but rather for educational environments, the project explores fundamental concepts such as real-time message exchange."
        },
        tags: ["Java", "App Inventor"],
        tech: ["App Inventor", "Bluetooth Protocol", "Java"],
        portada: `${BASE_PATH}proyectos/ChatBluetooth/iconoChatBluetooth.png`,
        galeria: [
            `${BASE_PATH}proyectos/ChatBluetooth/demoChatBluetooth.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/ChatBluetooth/ChatBluetooth_${i + 1}.png`)
        ],
        links: [
            { type: "github", url: "https://github.com/Estebanez2/ChatBluetooth", label: { es: "Ver GitHub + ReadMe.md para probar", en: "View GitHub + ReadMe.md to test" } },
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
        tech: ["AutoCAD 2023", "2D Modeling", "3D Modeling"],
        portada: `${BASE_PATH}proyectos/AutoCAD/iconoAutoCAD.png`,
        galeria: [
            `${BASE_PATH}proyectos/AutoCAD/demoAutoCAD.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/AutoCAD/AutoCAD_${i + 1}.png`)
        ],
        links: [
             { type: "download", url: "#", label: { es: "Ver Planos (PDF)", en: "View Blueprints (PDF)" } },
        ]
    },
    {
        id: 9,
        titulo: { es: "Shell en Linux", en: "Shell in Linux" },
        resumen: { es: "Terminal básica creada en C", en: "Basic Terminal created in C" },
        desc: {
            es: "Implementación de un shell básico de Linux desarrollado desde cero en lenguaje C, que permite la ejecución de comandos del sistema y la gestión de procesos.",
            en: "Implementation of a basic Linux shell developed from scratch in C language, enabling the execution of system commands and process management."
        },
        tags: ["Linux", "C"],
        tech: ["C Language", "Linux Kernel", "Process Management"],
        portada: `${BASE_PATH}proyectos/ShellLinux/iconoShellLinux.png`,
        galeria: [
            `${BASE_PATH}proyectos/ShellLinux/demoShellLinux.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/ShellLinux/ShellLinux_${i + 1}.png`)
        ],
        links: [
            { type: "github", url: "#", label: { es: "Ver Código", en: "View Code" } },
        ]
    }
];