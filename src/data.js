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

export const PROJECTS = [
    {
        id: 1,
        titulo: { es: "Gestor Gastos", en: "Expense Tracker" },
        resumen: { es: "App Android de Finanzas Personales", en: "Personal Finance Android App" },
        desc: { 
            es: "Aplicación nativa para Android desarrollada en Android Studio. Permite a los usuarios llevar un control exhaustivo de sus ingresos y gastos diarios. Gráficos estadísticos y base de datos local SQLite.",
            en: "Native Android application developed in Android Studio. Allows users to track daily income and expenses. Features statistical charts and local SQLite database."
        },
        tags: ["Android", "Kotlin", "Mobile"],
        tech: ["Android Studio", "Kotlin", "SQLite", "Material Design"],
        galeria: [
            "https://www.youtube.com/shorts/t7bsbFAE464", 
            "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80",
            "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=800&q=80"
        ],
        repo: "https://github.com/TU_USUARIO/GestorGastos",
        link: "#"
    },
    {
        id: 2,
        titulo: { es: "The Legends of G.", en: "The Legends of G." },
        resumen: { es: "RPG Top-Down Post-Apocalíptico", en: "Post-Apocalyptic Top-Down RPG" },
        desc: {
            es: "RPG en vista Top Down 2D ambientado en un mundo post-apocalíptico. Sistema de combate dinámico e IA enemiga con Máquina de Estados.",
            en: "2D Top-Down RPG set in a post-apocalyptic world. Features dynamic combat system and advanced enemy AI state machines."
        },
        tags: ["Unity", "C#"],
        tech: ["Unity 2022", "C#", "A* Pathfinding", "Cinemachine"],
        galeria: [
            "https://www.youtube.com/watch?v=jNQXAC9IVRw",
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
        ],
        repo: "#",
        link: "#"
    }
];