export const TRANSLATIONS = {
    es: {
        nav_home: "Inicio", nav_projects: "Proyectos", nav_contact: "Contacto",
        hero_status: "🚀 Disponible para trabajar",
        hero_desc: "Soy desarrollador apasionado por la creación de software interactivo. Me especializo en Desarrollo Móvil (Android) y Videojuegos (Unity). Transformo ideas complejas en código limpio.",
        btn_projects: "VER PROYECTOS", btn_cv: "DESCARGAR CV",
        stack_title: "Tech Stack",
        section_projects_title: "Proyectos", section_projects_subtitle: "Una selección de mis trabajos en desarrollo móvil y videojuegos.",
        github_link: "Ver todo en GitHub", repo_activity: "Actividad reciente",
        contact_title: "¿Hablamos?", contact_desc: "Si tienes una idea o proyecto en mente, envíame un mensaje.",
        form_name_ph: "Nombre", form_email_ph: "Email", form_msg_ph: "¿En qué puedo ayudarte?",
        btn_send: "ENVIAR MENSAJE",
        footer: "© 2024 Dev Portfolio. Creado con pasión.",
        modal_tech: "Stack Tecnológico", btn_repo: "REPO", btn_download: "APK / DEMO"
    },
    en: {
        nav_home: "Home", nav_projects: "Projects", nav_contact: "Contact",
        hero_status: "🚀 Open to work",
        hero_desc: "Passionate developer focused on creating interactive software. Specialized in Mobile Development (Android) and Game Dev (Unity). Turning complex ideas into clean code.",
        btn_projects: "VIEW WORK", btn_cv: "DOWNLOAD CV",
        stack_title: "Tech Stack",
        section_projects_title: "Projects", section_projects_subtitle: "A selection of my work in mobile development and video games.",
        github_link: "See all on GitHub", repo_activity: "Recent Activity",
        contact_title: "Let's Talk", contact_desc: "If you have an idea or project in mind, send me a message.",
        form_name_ph: "Name", form_email_ph: "Email", form_msg_ph: "How can I help you?",
        btn_send: "SEND MESSAGE",
        footer: "© 2024 Dev Portfolio. Crafted with passion.",
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
        tags: ["Android", "Java", "Mobile"],
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
        tags: ["Android", "Kotlin", "Mobile"],
        tech: ["Android Studio", "Kotlin", "SQLite", "Material Design"],
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
        resumen: { es: "Juego en Unity RPG Top Down 2D con combate dinámico", en: "Dynamic Top Down 2D RPG Game in Unity" },
        desc: {
            es: "The Legends Of G es un juego RPG Top Down 2D desarrollado en Unity que ofrece una experiencia de combate dinámica y fluida. Explora un mundo post-apocalíptico con enemigos variados. Usa los distintos objetos y el inventario para completar las misiones principales y secundarias.",
            en: "The Legends Of G is a Top Down 2D RPG game developed in Unity that offers a dynamic and fluid combat experience. Explore a post-apocalyptic world with varied enemies. Use different items and the inventory to complete main and side quests."
        },
        tags: ["Unity", "C#"],
        tech: ["Unity", "C#"],
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
        resumen: { es: "Juego Escape Room multijugador online", en: "Online Multiplayer Escape Room Game" },
        desc: {
            es: "X-It es un juego Escape Room multijugador online desarrollado en React donde te enfrentarás a otra persona para ver quién sale primero de la habitación. Para que puedas escapar, deberás resolver una serie de acertijos y enigmas en un tiempo limitado. Y para hacerlo más interesante, ¡podrás sabotear a tu oponente!",
            en: "X-It is an online multiplayer Escape Room game developed in React where you will face another person to see who escapes the room first. To escape, you must solve a series of puzzles and riddles within a limited time. And to make it more interesting, you can sabotage your opponent!"
        },
        tags: ["React", "JavaScript", "Web"],
        tech: ["React", "JavaScript", "CSS", "Firebase"],
        portada: `${BASE_PATH}proyectos/X-it/iconoX-it.png`,
        galeria: [
            `${BASE_PATH}proyectos/X-it/demoX-it.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/X-it/X-it_${i + 1}.png`)
        ],
        links: [
            { type: "web", url: "https://x-it-nine.vercel.app/", label: { es: "Jugar en línea", en: "Play Online" } },
        ]
    },
    {
        id: 5,
        titulo: { es: "MiniPIM", en: "MiniPIM" },
        resumen: { es: "Aplicación de escritorio en C# con Windows Forms para la gestión integral de tiendas", en: "Desktop application in C# with Windows Forms for comprehensive store management" },
        desc: {
            es: "Aplicación de escritorio en C# (Windows Forms) orientada a la gestión de información de productos (PIM). Ofrece gestión de productos, categorías y atributos, relaciones entre productos, operaciones CRUD y exportación de datos a CSV compatible con Amazon, con posibilidad de ampliar la integración a otros marketplaces.",
            en: "Desktop application in C# (Windows Forms) focused on product information management (PIM). It offers management of products, categories, and attributes, relationships between products, CRUD operations, and data export to Amazon-compatible CSV, with the possibility of expanding integration to other marketplaces."
        },
        tags: ["C#", "Desktop", "MicrosoftSQL"],
        tech: ["C#", "MicrosoftSQL", ".NET", "Windows Forms", "CSV", "Docker"],
        portada: `${BASE_PATH}proyectos/MiniPIM/iconoMiniPIM.png`,
        galeria: [
            `${BASE_PATH}proyectos/MiniPIM/demoMiniPIM.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/MiniPIM/MiniPIM_${i + 1}.png`)
        ],
        links: [
            { type: "web", url: "https://x-it-nine.vercel.app/", label: { es: "Jugar en línea", en: "Play Online" } },
        ]
    },
    {
        id: 6,
        titulo: { es: "SceneIt", en: "SceneIt" },
        resumen: { es: "Aplicación web desarrollada con Spring Boot y JSP para gestionar películas al estilo IMDb", en: "Web application developed with Spring Boot and JSP to manage movies in the style of IMDb" },
        desc: {
            es: "Proyecto de aplicación web construida con arquitectura MVC segura con JSP, Spring Boot y base de datos MySQL, que implementa un sistema de gestión de películas. Cuenta con roles diferenciados (administrador y usuario), funcionalidades de CRUD, sistema de valoraciones y comentarios, control de usuarios y panel de estadísticas para administradores.",
            en: "Web application project built with secure MVC architecture using JSP, Spring Boot, and MySQL database, implementing a movie management system. It features differentiated roles (administrator and user), CRUD functionalities, a rating and commenting system, user control, and a statistics panel for administrators."
        },
        tags: ["Java", "Web", "MySQL"],
        tech: ["Java", "MySQL", "Spring Boot", "JSP", "Html5", "Docker", "JavaScript", "Booststrap"],
        portada: `${BASE_PATH}proyectos/SceneIt/iconoSceneIt.png`,
        galeria: [
            `${BASE_PATH}proyectos/SceneIt/demoSceneIt.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/SceneIt/SceneIt_${i + 1}.png`)
        ],
        links: [
            { type: "web", url: "https://x-it-nine.vercel.app/", label: { es: "Jugar en línea", en: "Play Online" } },
        ]
    },
    {
        id: 7,
        titulo: { es: "Chat Bluetooth", en: "Bluetooth Chat" },
        resumen: { es: "Aplicación de móvil que simula un chat mediante Bluetooth", en: "Mobile application simulating a chat via Bluetooth" },
        desc: {
            es: "Aplicación desarrollada con Scratch que implementa un sistema de mensajería básica mediante comunicación Bluetooth. El proyecto explora conceptos fundamentales como el intercambio de mensajes en tiempo real, la gestión de eventos y la interacción entre dispositivos de forma inalámbrica. Sujeta a mejoras como el envio de archivos multimedia o la creación de grupos de chat.",
            en: "Application developed with Scratch that implements a basic messaging system via Bluetooth communication. The project explores fundamental concepts such as real-time message exchange, event management, and interaction between devices wirelessly. Subject to improvements like sending multimedia files or creating chat groups."
        },
        tags: ["Scratch", "Mobile", "Bluetooth"],
        tech: ["Scratch", "Bluetooth"],
        portada: `${BASE_PATH}proyectos/ChatBluetooth/iconoChatBluetooth.png`,
        galeria: [
            `${BASE_PATH}proyectos/ChatBluetooth/demoChatBluetooth.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/ChatBluetooth/ChatBluetooth_${i + 1}.png`)
        ],
        links: [
            { type: "web", url: "https://x-it-nine.vercel.app/", label: { es: "Jugar en línea", en: "Play Online" } },
        ]
    },
    {
        id: 8,
        titulo: { es: "Modelado 2D y 3D con AutoCAD", en: "2D and 3D Modeling with AutoCAD" },
        resumen: { es: "Modelado e infografías de figuras en 2D y 3D utilizando AutoCAD", en: "Modeling and infographics of 2D and 3D figures using AutoCAD" },
        desc: {
            es: "Proyecto de diseño técnico realizado con AutoCAD, enfocado en la creación de figuras e infografías en 2D y 3D. Incluye el uso de herramientas de acotación, organización por capas, escalado y documentación técnica, aplicando buenas prácticas de dibujo asistido por ordenador.",
            en: "Technical design project carried out with AutoCAD, focused on creating 2D and 3D figures and infographics. It includes the use of dimensioning tools, layer organization, scaling, and technical documentation, applying good computer-aided drawing practices."
        },
        tags: ["AutoCAD", "Design", "Modeling"],
        tech: ["AutoCAD"],
        portada: `${BASE_PATH}proyectos/AutoCAD/iconoAutoCAD.png`,
        galeria: [
            `${BASE_PATH}proyectos/AutoCAD/demoAutoCAD.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/AutoCAD/AutoCAD_${i + 1}.png`)
        ],
        links: [
            { type: "web", url: "https://x-it-nine.vercel.app/", label: { es: "Jugar en línea", en: "Play Online" } },
        ]
    },
    {
        id: 8,
        titulo: { es: "Shell en Linux", en: "Shell in Linux" },
        resumen: { es: "Cmd básico creado desde 0 en Linux", en: "Basic cmd created from scratch in Linux" },
        desc: {
            es: "Implementación de un shell básico de Linux desarrollado desde cero, que permite la ejecución de comandos del sistema y la gestión de procesos. El proyecto aborda conceptos clave como creación de procesos, manejo de entradas y salidas, y control básico del entorno de ejecución.",
            en: "Implementation of a basic Linux shell developed from scratch, enabling the execution of system commands and process management. The project addresses key concepts such as process creation, input/output handling, and basic runtime environment control."
        },
        tags: ["Linux", "C", "Shell"],
        tech: ["C", "Linux"],
        portada: `${BASE_PATH}proyectos/ShellLinux/iconoShellLinux.png`,
        galeria: [
            `${BASE_PATH}proyectos/ShellLinux/demoShellLinux.mp4`,
            ...Array.from({ length: 6 }, (_, i) => `${BASE_PATH}proyectos/ShellLinux/ShellLinux_${i + 1}.png`)
        ],
        links: [
            { type: "web", url: "https://x-it-nine.vercel.app/", label: { es: "Jugar en línea", en: "Play Online" } },
        ]
    }
    //{ type: "docker", url: "#", label: "Docker Image" }
];