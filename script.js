const sports = [
    { text: "futevôlei", icon: "img/bola-fut.png" },
    { text: "beach tennis", icon: "img/bola-tennis.png" },
    { text: "vôlei", icon: "img/bola-volei.png" },
    { text: "tênis", icon: "img/bola-tennis.png" }
];

const rotatingContent = document.getElementById("rotating-content");
const rotatingText = document.getElementById("rotating-text");
const rotatingIcon = document.getElementById("rotating-icon");
let currentIndex = 0;

function rotateText() {
    // Primeiro aplicamos a classe de saída
    rotatingContent.classList.remove("enter");
    rotatingContent.classList.add("exit");

    setTimeout(() => {
        // Atualizamos o conteúdo após a animação de saída
        currentIndex = (currentIndex + 1) % sports.length;
        rotatingText.textContent = sports[currentIndex].text;
        rotatingIcon.src = sports[currentIndex].icon;

        // Resetamos a posição sem transição para o próximo entrar de baixo
        rotatingContent.style.transition = 'none';
        rotatingContent.style.transform = 'translateY(100%)';
        rotatingContent.classList.remove("exit");

        // Forçamos um reflow
        void rotatingContent.offsetWidth;

        // Reativamos a transição e aplicamos a classe de entrada
        rotatingContent.style.transition = '';
        rotatingContent.style.transform = '';
        rotatingContent.classList.add("enter");
    }, 400);
}

// Inicializa a rotação a cada 2 segundos (ciclo mais calmo)
setInterval(rotateText, 2000);

// Esconder indicador de scroll ao descer
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        if (scroll > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '0.7';
            scrollIndicator.style.pointerEvents = 'all';
        }
    }
});

// Efeito de Zoom e Fade no Hero ao scrollar
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroBg && heroContent) {
        // Zoom sutil: escala de 1 a 1.15 baseada no scroll (limite de 500px)
        const zoomScale = 1 + (Math.min(scroll, 500) / 500) * 0.15;
        heroBg.style.transform = `scale(${zoomScale})`;
        
        // Fade out sutil: opacidade de 1 a 0 baseada no scroll (limite de 400px)
        const opacity = 1 - (Math.min(scroll, 400) / 400);
        heroContent.style.opacity = opacity;
        
        // Deslocamento sutil para cima (parallax reverso)
        heroContent.style.transform = `translateY(${-scroll * 0.2}px)`;
    }
});

// Animação de Revelação no Scroll (Galeria)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Uma vez visível, para de observar para economizar recursos
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.reveal-scroll');
    galleryItems.forEach((item, index) => {
        // Remove transition delay for immediate effect if needed, or keep it short
        observer.observe(item);
    });
});

// Lógica da Galeria / Lightbox
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    let currentImgIndex = 0;
    const images = Array.from(galleryItems).map(img => img.src);

    // Abrir Lightbox
    galleryItems.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            currentImgIndex = index;
            updateLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava scroll
        });
    });

    function updateLightbox() {
        lightboxImg.src = images[currentImgIndex];
    }

    // Navegação
    function showNext() {
        currentImgIndex = (currentImgIndex + 1) % images.length;
        updateLightbox();
    }

    function showPrev() {
        currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showNext();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrev();
    });

    // Fechar
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Destrava scroll
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Suporte a Swipe (Mobile)
    let touchstartX = 0;
    let touchendX = 0;

    lightbox.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });

    function handleGesture() {
        if (touchendX < touchstartX - 50) showNext();
        if (touchendX > touchstartX + 50) showPrev();
    }
});

// Lógica do Slider do Catálogo (Estilo Apple)
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('catalog-slider');
    const prevBtn = document.getElementById('catalog-prev');
    const nextBtn = document.getElementById('catalog-next');
    const progressBar = document.getElementById('catalog-progress');

    if (!slider || !prevBtn || !nextBtn || !progressBar) return;

    const updateProgress = () => {
        const scrollPercentage = (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100;
        progressBar.style.width = `${Math.max(0, Math.min(100, scrollPercentage))}%`;
        
        // Desabilitar botões nos limites
        prevBtn.style.opacity = slider.scrollLeft <= 5 ? '0.3' : '1';
        prevBtn.style.pointerEvents = slider.scrollLeft <= 5 ? 'none' : 'auto';
        
        const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5;
        nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    };

    slider.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);

    nextBtn.addEventListener('click', () => {
        const cardWidth = slider.querySelector('.catalog-card').offsetWidth + 30;
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = slider.querySelector('.catalog-card').offsetWidth + 30;
        slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    // Suporte a arraste no desktop
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.scrollBehavior = 'auto'; // Desativa smooth durante o drag
        slider.style.scrollSnapType = 'none'; // Desativa snap durante o drag
    });

    slider.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        slider.style.scrollBehavior = 'smooth';
        slider.style.scrollSnapType = 'x mandatory';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.scrollBehavior = 'smooth';
        slider.style.scrollSnapType = 'x mandatory';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Inicializa progresso
    updateProgress();
});

// Alternância suave de imagens nos cards do catálogo
document.addEventListener('DOMContentLoaded', () => {
    const rotatingContainers = document.querySelectorAll('.rotating-images');
    
    rotatingContainers.forEach(container => {
        const images = container.querySelectorAll('.card-img');
        if (images.length < 2) return;

        let currentImgIndex = 0;

        setInterval(() => {
            images[currentImgIndex].classList.remove('active');
            currentImgIndex = (currentImgIndex + 1) % images.length;
            images[currentImgIndex].classList.add('active');
        }, 3500); // Troca a cada 3.5 segundos para ser suave
    });
});

// Lógica do FAQ (Accordion)
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Fecha outros itens abertos (opcional, mas recomendado para UX limpa)
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Se o item clicado não estava ativo, abre ele
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Lógica do Slider do Catálogo
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('catalog-slider');
    const prevBtn = document.getElementById('catalog-prev');
    const nextBtn = document.getElementById('catalog-next');
    const progressBar = document.getElementById('catalog-progress');

    if (!slider || !prevBtn || !nextBtn || !progressBar) return;

    const scrollAmount = 480; // Largura do card (450) + gap (30)

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    // Atualiza a barra de progresso e o estado dos botões
    slider.addEventListener('scroll', () => {
        const scrollPercentage = (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100;
        progressBar.style.width = `${scrollPercentage}%`;

        // Opcional: Desativar botões nos limites
        prevBtn.style.opacity = slider.scrollLeft <= 0 ? '0.3' : '1';
        prevBtn.style.pointerEvents = slider.scrollLeft <= 0 ? 'none' : 'auto';
        
        const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5;
        nextBtn.style.opacity = atEnd ? '0.3' : '1';
        nextBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
    });

    // Inicializa o estado dos botões
    prevBtn.style.opacity = '0.3';
    prevBtn.style.pointerEvents = 'none';
});

// Animação de Contagem dos Números
 document.addEventListener('DOMContentLoaded', () => {
     const numbersSection = document.getElementById('numeros');
     if (!numbersSection) return;

     const animateNumbers = (entries, observer) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 const counters = entry.target.querySelectorAll('.stat-value[data-goal]');
                 
                 counters.forEach(counter => {
                     const goal = parseInt(counter.getAttribute('data-goal'));
                     const originalText = counter.textContent;
                     let current = 0;
                     const increment = goal / 100;

                     const updateCounter = () => {
                         current += increment;
                         if (current < goal) {
                             // Substitui o número no texto original preservando prefixos e sufixos
                             counter.textContent = originalText.replace(/\d+/, Math.ceil(current));
                             
                             if (originalText.includes('%')) {
                                 // Atualiza o círculo de progresso se existir
                                 const circle = counter.parentElement.querySelector('#circle-satisfaction');
                                 if (circle) {
                                     const circumference = 2 * Math.PI * 45;
                                     const offset = circumference - (current / 100) * circumference;
                                     circle.style.strokeDashoffset = offset;
                                 }
                             }
                             requestAnimationFrame(updateCounter);
                         } else {
                             counter.textContent = originalText.replace(/\d+/, goal);
                             
                             if (originalText.includes('%')) {
                                 const circle = counter.parentElement.querySelector('#circle-satisfaction');
                                 if (circle) {
                                     const circumference = 2 * Math.PI * 45;
                                     const offset = circumference - (goal / 100) * circumference;
                                     circle.style.strokeDashoffset = offset;
                                 }
                             }
                         }
                     };
                     updateCounter();
                 });
                 observer.unobserve(entry.target); // Anima apenas uma vez
             }
         });
     };

     const numberObserver = new IntersectionObserver(animateNumbers, {
         threshold: 0.5 // Inicia quando 50% da seção estiver visível
     });

     numberObserver.observe(numbersSection);
 });

 // Efeito de Tilt 3D e Mouse Glow nos Cards de Estatística
 document.addEventListener('DOMContentLoaded', () => {
     const cards = document.querySelectorAll('.stat-card.glass');
     
     cards.forEach(card => {
         card.addEventListener('mousemove', e => {
             const rect = card.getBoundingClientRect();
             const x = e.clientX - rect.left;
             const y = e.clientY - rect.top;
             
             // Atualiza as variáveis CSS para o Mouse Glow
             card.style.setProperty('--mouse-x', `${x}px`);
             card.style.setProperty('--mouse-y', `${y}px`);
             
             // Calcula a rotação para o Tilt 3D
             const centerX = rect.width / 2;
             const centerY = rect.height / 2;
             const rotateX = (y - centerY) / 10;
             const rotateY = (centerX - x) / 10;
             
             card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.03)`;
         });
         
         card.addEventListener('mouseleave', () => {
             card.style.transform = '';
         });
     });
 });
