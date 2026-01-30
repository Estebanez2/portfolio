/* --- CONFIGURACIÓN DE IDIOMAS --- */
        let currentLang = localStorage.getItem('lang') || 'es';

        const TRANSLATIONS = {
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

        /* --- TUS PROYECTOS (Texto en ES y EN) --- */
        const PROYECTOS = [
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
                    "https://www.youtube.com/shorts/t7bsbFAE464", // SHORT
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
                    "https://www.youtube.com/watch?v=jNQXAC9IVRw", // VIDEO NORMAL
                    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
                ],
                repo: "#",
                link: "#"
            }
        ];

        /* --- LÓGICA DE IDIOMA Y RENDERIZADO --- */
        function setLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('lang', lang);
            document.getElementById('current-lang-label').innerText = lang.toUpperCase();

            // Actualizar textos fijos
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                if (TRANSLATIONS[lang][key]) el.innerText = TRANSLATIONS[lang][key];
            });

            // Actualizar placeholders
            document.querySelector('input[name="name"]').placeholder = TRANSLATIONS[lang].form_name_ph;
            document.querySelector('input[name="email"]').placeholder = TRANSLATIONS[lang].form_email_ph;
            document.querySelector('textarea[name="message"]').placeholder = TRANSLATIONS[lang].form_msg_ph;

            render(); // Re-renderizar proyectos con el idioma nuevo
        }

        // Regex mejorado para soportar SHORTS, videos normales y youtu.be
        function getYoutubeId(url) {
            // Esta expresión captura ID de: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        }

        function render() {
            const grid = document.getElementById('grid-proyectos');
            grid.innerHTML = PROYECTOS.map(p => {
                // Buscamos imagen portada (evitando videos)
                let coverImg = p.galeria.find(item => !getYoutubeId(item)) || "https://images.unsplash.com/photo-1550745165-9bc0b252726f";
                
                // Si el primero es video, sacamos miniatura youtube
                const firstIsVideo = getYoutubeId(p.galeria[0]);
                if(firstIsVideo) {
                    coverImg = `https://img.youtube.com/vi/${firstIsVideo}/hqdefault.jpg`;
                }

                return `
                <div onclick="openModal(${p.id})" class="glass p-5 rounded-[2rem] cursor-pointer group hover:border-orange-500/50 hover:bg-stone-900/80 transition-all duration-300">
                    <div class="overflow-hidden rounded-[1.5rem] mb-5 h-48 relative">
                        <div class="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition z-10"></div>
                        ${firstIsVideo ? '<div class="absolute inset-0 flex items-center justify-center z-20"><div class="bg-black/50 p-3 rounded-full backdrop-blur-sm"><i data-lucide="play" class="text-white fill-white"></i></div></div>' : ''}
                        <img src="${coverImg}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                    </div>
                    <div class="flex gap-2 mb-3">
                        ${p.tags.slice(0, 2).map(t => `<span class="text-[10px] font-bold bg-white/5 border border-white/10 px-2 py-1 rounded-md text-stone-300">${t}</span>`).join('')}
                    </div>
                    <h3 class="text-xl font-bold mb-2 group-hover:text-orange-500 transition">${p.titulo[currentLang]}</h3>
                    <p class="text-stone-500 text-sm line-clamp-2">${p.resumen[currentLang]}</p>
                </div>
            `}).join('');
            lucide.createIcons();
        }

        /* --- MODAL Y CARRUSEL --- */
        let slideIdx = 0;
        let slideMax = 0;

        function openModal(id) {
            const p = PROYECTOS.find(x => x.id === id);
            slideIdx = 0;
            slideMax = p.galeria.length;
            
            document.getElementById('modal-titulo').innerText = p.titulo[currentLang];
            document.getElementById('modal-desc').innerText = p.desc[currentLang];
            document.querySelector('[data-translate="modal_tech"]').innerText = TRANSLATIONS[currentLang].modal_tech;
            
            const btnRepo = document.getElementById('modal-repo');
            const btnDown = document.getElementById('modal-download');
            
            btnRepo.querySelector('span').innerText = TRANSLATIONS[currentLang].btn_repo;
            btnDown.querySelector('span').innerText = TRANSLATIONS[currentLang].btn_download;

            if(p.repo === "#") btnRepo.classList.add('opacity-50', 'pointer-events-none');
            else { btnRepo.classList.remove('opacity-50', 'pointer-events-none'); btnRepo.href = p.repo; }
            btnDown.href = p.link;

            document.getElementById('modal-tags').innerHTML = p.tags.map(t => 
                `<span class="text-[10px] font-bold border border-orange-500/30 text-orange-400 bg-orange-500/5 px-2 py-1 rounded-full uppercase tracking-wider">${t}</span>`
            ).join('');
            
            document.getElementById('modal-tech-list').innerHTML = p.tech.map(t => 
                `<li class="flex items-center gap-2"><div class="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>${t}</li>`
            ).join('');
            
            renderCarousel(p);
            
            const modal = document.getElementById('modal');
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
            lucide.createIcons();
        }

        function renderCarousel(p) {
            const container = document.getElementById('carousel-container');
            container.innerHTML = p.galeria.map((item, i) => {
                const ytId = getYoutubeId(item);
                let content = '';

                if (ytId) {
                    content = `
                    <iframe class="w-full h-full absolute inset-0" 
                        src="https://www.youtube.com/embed/${ytId}?enablejsapi=1&rel=0" 
                        title="YouTube video player" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>`;
                } else {
                    content = `<img src="${item}" class="w-full h-full object-cover">`;
                }

                return `<div class="carousel-item w-full h-full absolute top-0 left-0 transition-opacity duration-500 ${i===0?'active opacity-100 z-10':'opacity-0 z-0'}">${content}</div>`;
            }).join('');
        }

        function changeSlide(n) {
            const items = document.querySelectorAll('.carousel-item');
            // Pausar video anterior
            const currentItem = items[slideIdx];
            const iframe = currentItem.querySelector('iframe');
            if(iframe) iframe.src = iframe.src; 

            items[slideIdx].classList.remove('active', 'opacity-100', 'z-10');
            items[slideIdx].classList.add('opacity-0', 'z-0');
            
            slideIdx = (slideIdx + n + slideMax) % slideMax;
            
            items[slideIdx].classList.remove('opacity-0', 'z-0');
            items[slideIdx].classList.add('active', 'opacity-100', 'z-10');
        }

        function closeModal() { 
            const modal = document.getElementById('modal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.classList.add('hidden');
                document.getElementById('carousel-container').innerHTML = ''; 
            }, 300);
            document.body.style.overflow = 'auto'; 
        }
        
        window.onclick = (e) => { if(e.target == document.getElementById('modal')) closeModal(); }
        window.onscroll = function() {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            document.getElementById("progress-bar").style.width = scrolled + "%";
        };

        // INICIAR
        setLanguage(currentLang);