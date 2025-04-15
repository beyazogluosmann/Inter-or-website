document.addEventListener('DOMContentLoaded', () => {
    // Hero section slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero .slide');
    const totalSlides = slides.length;
    const nextButton = document.querySelector('.hero .next');
    const prevButton = document.querySelector('.hero .prev');
    let autoSlideInterval;

    // Hero slide değiştirici
    function changeHeroSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        preloadSlideImage((currentSlide + 1) % totalSlides);
        preloadSlideImage((currentSlide - 1 + totalSlides) % totalSlides);
    }

    window.onload = function () {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden'); // Yumuşak bir şekilde kaybolur
        }
    };

    // Görselleri önceden yükleme
    function preloadSlideImage(index) {
        const slide = slides[index];
        const img = slide.querySelector('img');
        if (!img.complete && !img.srcset) {
            img.src = img.dataset.src || img.src;
        }
    }

    // Auto slide işlevi için requestAnimationFrame kullanımı
    function autoSlide() {
        changeHeroSlide(currentSlide + 1);
        autoSlideInterval = requestAnimationFrame(() => setTimeout(autoSlide, 3000));
    }

    function resetAutoSlide() {
        cancelAnimationFrame(autoSlideInterval);
        autoSlideInterval = requestAnimationFrame(() => setTimeout(autoSlide, 3000));
    }

    // Slider butonları
    nextButton.addEventListener('click', () => {
        changeHeroSlide(currentSlide + 1);
        resetAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        changeHeroSlide(currentSlide - 1);
        resetAutoSlide();
    });

    // Lazy loading for images with IntersectionObserver
    const lazySlides = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const lazySlideObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImg = entry.target;
                    lazyImg.src = lazyImg.dataset.src; // Gerçek resmi yükle
                    lazySlideObserver.unobserve(lazyImg);
                }
            });
        });

        lazySlides.forEach(slide => lazySlideObserver.observe(slide));
    }

    // Language Switcher
    const navLinks = document.querySelectorAll('.nav-link');
    const turkishButton = document.getElementById('turkish');
    const englishButton = document.getElementById('english');

    function switchLanguage(lang) {
        navLinks.forEach(link => link.textContent = link.getAttribute(`data-${lang}`));
    }

    turkishButton?.addEventListener('click', () => switchLanguage('tr'));
    englishButton?.addEventListener('click', () => switchLanguage('en'));

    // Highlight active navigation link
    const currentLocation = window.location.pathname;
    navLinks.forEach(link => {
        if (link.href.includes(currentLocation)) {
            link.classList.add('active');
        }
    });

    // Scroll event to change header background color with throttle
    const header = document.querySelector('header');
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100)); // 100ms throttle ile optimize edildi

    // Project modal slider
    const projectItems = document.querySelectorAll('.project-item a');
    const modal = document.getElementById('slider-overlay');
    const modalImagesContainer = document.querySelector('.slider-images');
    const closeModalButton = document.querySelector('.close');
    const modalNextButton = modal.querySelector('.next');
    const modalPrevButton = modal.querySelector('.prev');
    let currentModalSlideIndex = 0;

    function populateModalImages(projectIndex) {
        const imagesMap = [
            // Damla HN Projesi Resimleri
            [
                'damla_hn1/s3-min.jpg', 'damla_hn1/s4-min.jpg', 'damla_hn1/s5-min.jpg',
                'damla_hn1/s6-min.jpg', 'damla_hn1/s7-min.jpg', 'damla_hn1/s8-min.jpg',
                'damla_hn1/s9-min.jpg', 'damla_hn1/s10-min.jpg', 'damla_hn1/s11-min.jpg',
                'damla_hn1/s12-min.jpg', 'damla_hn1/s13-min.jpg', 'damla_hn1/s14-min.jpg',
                'damla_hn1/s15-min.jpg', 'damla_hn1/s16-min.jpg', 'damla_hn1/s17-min.jpg',
                'damla_hn1/s18-min.jpg', 'damla_hn1/s19-min.jpg', 'damla_hn1/s20-min.jpg', 'damla_hn1/s21-min.jpg'
            ],
            // Kubist Projesi Resimleri
            [
                'kubist1/1-min.jpg', 'kubist1/2-min.jpg', 'kubist1/3-min.jpg', 'kubist1/4-min.jpg',
                'kubist1/5-min.jpg', 'kubist1/9-min.jpg', 'kubist1/10-min.jpg', 'kubist1/B2-min.jpg',
                'kubist1/B3-min.jpg', 'kubist1/s1-min.jpg', 'kubist1/s2-min.jpg', 'kubist1/s3-min.jpg',
                'kubist1/s6-min.jpg', 'kubist1/s7-min.jpg'
            ],
            // Demir Country Projesi Resimleri
            [
                'demir_country1/m2-min.jpg', 'demir_country1/m3-min.jpg', 'demir_country1/m5-min.jpg',
                'demir_country1/m6-min.jpg', 'demir_country1/s5-min.jpg', 'demir_country1/s7-min.jpg',
                'demir_country1/y3-min.jpg', 'demir_country1/y4-min.jpg', 'demir_country1/y7-min.jpg', 'demir_country1/y8-min.jpg'
            ],
            // Bir Bahçe Projesi Resimleri
            [
                'bir_bahce1/5837189223797604958_121.jpg', 'bir_bahce1/5837189223797604960_121.jpg',
                'bir_bahce1/5837189223797604963_121.jpg', 'bir_bahce1/5837189223797604965_121.jpg',
                'bir_bahce1/5837189223797604966_121.jpg', 'bir_bahce1/5837189223797604968_121.jpg',
                'bir_bahce1/5837189223797604970_121.jpg', 'bir_bahce1/5837189223797604971_121.jpg'
            ],
            // Diktaş Evi Projesi Resimleri
            [
                'diktas_evi1/g4_4_11zon.jpg', 'diktas_evi1/m1_5_11zon.jpg', 'diktas_evi1/s1_6_11zon.jpg',
                'diktas_evi1/s2_7_11zon.jpg', 'diktas_evi1/s3_8_11zon.jpg', 'diktas_evi1/s5_9_11zon.jpg',
                'diktas_evi1/y1_10_11zon.jpg', 'diktas_evi1/y2_11_11zon.jpg', 'diktas_evi1/y4_12_11zon.jpg', 'diktas_evi1/y7_13_11zon.jpg'
            ],
            // Silivri Projesi Resimleri
            [
                'silivri1/ebeveyn_banyo1_1_11zon.jpg',
                'silivri1/erkek_cocuk odasi1_2_11zon.jpg',
                'silivri1/erkek_cocuk odasi2_3_11zon.jpg',
                'silivri1/genel_banyo1_4_11zon.jpg',
                'silivri1/genel_banyo2_5_11zon.jpg',
                'silivri1/genel_banyo3_6_11zon.jpg',
                'silivri1/giyinme_odasi1_7_11zon.jpg',
                'silivri1/giyinme_odasi2_8_11zon.jpg',
                'silivri1/kız_cocuk_odasi1_9.jpg',
                'silivri1/kız_cocuk_odasi2_10.jpg',
                'silivri1/salon1_11_11zon.jpg'
            ]
        ];

        const images = imagesMap[projectIndex] || [];
        modalImagesContainer.innerHTML = ''; // Clear previous images

        images.forEach((src) => {
            const imgElement = document.createElement('img');
            imgElement.dataset.src = src; // Lazy yükleme için
            imgElement.style.width = '100%';
            imgElement.style.height = 'auto';
            modalImagesContainer.appendChild(imgElement);
        });

        currentModalSlideIndex = 0; // Reset the slider index
        showModalSlide(currentModalSlideIndex); // Show the first image
        preloadNextModalSlide(1); // Preload the next image
    }

    function showModalSlide(index) {
        const slides = modalImagesContainer.getElementsByTagName('img');
        Array.from(slides).forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
                slide.style.transition = 'opacity 0.3s ease-in-out'; // Geçiş süresini kısalttık
                slide.style.opacity = 1; // Görünürlüğü artırıyoruz
                if (!slide.src) {
                    slide.src = slide.dataset.src; // Lazy yükleme
                }
            } else {
                slide.style.transition = 'opacity 0.3s ease-in-out'; // Geçiş süresini kısalttık
                slide.style.opacity = 0; // Görünürlüğü sıfırlıyoruz
                setTimeout(() => {
                    slide.style.display = 'none'; // Geçişten sonra tamamen gizle
                }, 300); // 0.3 saniye sonra gizleniyor
            }
        });
    }

    function changeModalSlide(step) {
        const slides = modalImagesContainer.getElementsByTagName('img');
        currentModalSlideIndex = (currentModalSlideIndex + step + slides.length) % slides.length;
        showModalSlide(currentModalSlideIndex);
        preloadNextModalSlide(step);
    }

    function preloadNextModalSlide(step) {
        const slides = modalImagesContainer.getElementsByTagName('img');
        const nextSlideIndex = (currentModalSlideIndex + step + slides.length) % slides.length;
        const img = slides[nextSlideIndex];
        
        if (!img.src) {
            const preloadImg = new Image();
            preloadImg.src = img.dataset.src;
            preloadImg.onload = () => {
                img.src = preloadImg.src;
            };
        }
    }

    projectItems.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            populateModalImages(index);
            modal.style.display = 'flex'; // Show the modal
        });
    });

    closeModalButton.addEventListener('click', () => modal.style.display = 'none');
    modalNextButton.addEventListener('click', () => changeModalSlide(1));
    modalPrevButton.addEventListener('click', () => changeModalSlide(-1));

    // Hide the loading overlay once the page is fully loaded
  
});

// Debounce and throttle functions for optimization
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Set WhatsApp link based on the device
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLink = document.getElementById('whatsapp-link');
    const phoneNumber = '905318443474'; // Replace this with your WhatsApp phone number

    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        whatsappLink.href = 'https://api.whatsapp.com/send?phone=' + phoneNumber;
    } else {
        whatsappLink.href = 'https://web.whatsapp.com/send?phone=' + phoneNumber;
    }
});



