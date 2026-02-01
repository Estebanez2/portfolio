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
            // 1. El vídeo va primero
            "https://www.youtube.com/shorts/t7bsbFAE464",
            // 2. Generamos las 8 fotos automáticamente.
            ...Array.from({ length: 8 }, (_, i) => `${BASE_PATH}proyectos/BattleClickerRPG/BattleClickerRPG_${i + 1}.png`),
        ],
        links: [
            { type: "web", url: "https://kazukigd2.github.io/BattleClickerRpgWeb/", label: "Jugar Web" },
            { type: "apk", url: `${BASE_PATH}/proyectos/BattleClickerRPG/BattleClickerRPG_V1.apk`, label: "Descargar APK" } 
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
        // Este proyecto es privado, así que NO ponemos botón de GitHub, solo el de Docker por ejemplo
        links: [
            { type: "github", url: "https://github.com/estebanez2/GestorGastos", label: "GitHub Repo" },
            { type: "apk", url: `${BASE_PATH}/proyectos/GestorGastos/GestorGastos_V1.apk`, label: "Descargar APK" }         
        ]
    }
    //{ type: "docker", url: "#", label: "Docker Image" }
];