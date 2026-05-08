document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // Video Play Logic
    const heroVideo = document.getElementById('heroVideo');
    const heroPlayBtn = document.getElementById('heroPlayBtn');
    
    if (heroVideo && heroPlayBtn) {
        heroPlayBtn.addEventListener('click', () => {
            if (heroVideo.paused) {
                heroVideo.play();
                heroPlayBtn.style.display = 'none';
                heroVideo.setAttribute('controls', 'true');
            }
        });

        heroVideo.addEventListener('pause', () => {
            heroPlayBtn.style.display = 'flex';
            heroVideo.removeAttribute('controls');
        });
        
        heroVideo.addEventListener('play', () => {
            heroPlayBtn.style.display = 'none';
            heroVideo.setAttribute('controls', 'true');
        });
    }

    // Testimonials Infinite Carousel - clone cards for seamless loop
    const track = document.querySelector('.carousel-track');
    if (track) {
        const cards = track.querySelectorAll('.testimonial-card');
        // Clone all cards and append to create infinite loop
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // ===== i18n — JSON-based Translation System =====
    let currentLang = 'pt';
    let translationsCache = {};

    async function loadTranslations(lang) {
        if (translationsCache[lang]) return translationsCache[lang];
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error(`Could not load locales/${lang}.json`);
            const data = await response.json();
            translationsCache[lang] = data;
            return data;
        } catch (err) {
            console.warn(`Translation load error: ${err.message}`);
            return null;
        }
    }

    function applyTranslations(data) {

    if (!data) return;

    /* textos normais */

    document.querySelectorAll('[data-i18n]').forEach(el => {

        const key = el.getAttribute('data-i18n');

        if (data[key] !== undefined) {
            el.innerHTML = data[key];
        }

    });

    /* placeholders */

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {

        const key = el.getAttribute('data-i18n-placeholder');

        if (data[key] !== undefined) {
            el.placeholder = data[key];
        }

    });

}

    async function setLanguage(lang, flag) {
        const data = await loadTranslations(lang);
        applyTranslations(data);
        currentLang = lang;

        const currentFlag = document.getElementById('current-flag');
        const currentLangText = document.getElementById('current-lang-text');
        if (currentFlag) currentFlag.src = `https://flagcdn.com/w20/${flag}.png`;
        if (currentLangText) currentLangText.textContent = lang.toUpperCase();

        // Persist language choice
        localStorage.setItem('dona-cuca-lang', lang);
        localStorage.setItem('dona-cuca-flag', flag);
    }

    // Language dropdown click handlers
    const langOptions = document.querySelectorAll('.lang-dropdown li');
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            const flag = this.getAttribute('data-flag');
            setLanguage(lang, flag);

            // Close dropdown
            const langDropdown = document.querySelector('.lang-dropdown');
            if (langDropdown) {
                langDropdown.style.display = 'none';
                setTimeout(() => { langDropdown.style.display = ''; }, 100);
            }
        });
    });

    // Load saved language or default to 'pt'
    const savedLang = localStorage.getItem('dona-cuca-lang') || 'pt';
    const savedFlag = localStorage.getItem('dona-cuca-flag') || 'br';
    setLanguage(savedLang, savedFlag);

    // ===== Scroll Animations (Intersection Observer) =====
    const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100)));
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                displayScrollElement(entry.target);
                // observer.unobserve(entry.target); // Descomente para animar apenas uma vez
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // ===== Dynamic Header on Scroll =====
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

});
