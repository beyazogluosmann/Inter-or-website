document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const turkishButton = document.getElementById('turkish');
    const englishButton = document.getElementById('english');
    const projectItems = document.querySelector('.projects');
    const sliderOverlay = document.getElementById('slider-overlay');
    const sliderImages = document.querySelector('.slider-images');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const content = document.getElementById('content');
    const loader = document.getElementById('loader');
    let currentSlide = 0;
    let images = [];
    let startX = 0;
    let endX = 0;

    // Show content when all resources including images are loaded
    window.onload = function () {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden'); // Yumuşak bir şekilde kaybolur
        }
    };

    // Preloading initial assets
    const preloadAssets = () => {
        const links = document.querySelectorAll('picture source[srcset]');
        links.forEach(link => {
            const img = new Image();
            img.src = link.srcset;
        });
    };
    preloadAssets();

    // Optimized scroll event to handle header style changes on scroll
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                isScrolling = false;
            });
        }
        isScrolling = true;
    });

    // Language Switcher functionality
    turkishButton.addEventListener('click', () => switchLanguage('tr'));
    englishButton.addEventListener('click', () => switchLanguage('en'));

    function switchLanguage(lang) {
        navLinks.forEach(link => {
            link.textContent = link.getAttribute(`data-${lang}`);
        });
        alert(lang === 'tr' ? 'Dil Türkçe olarak değiştirildi' : 'Language changed to English');
    }

    // Event delegation for project items
    projectItems.addEventListener('click', event => {
        const item = event.target.closest('a[data-slider]');
        if (item) {
            event.preventDefault();
            const slider = item.getAttribute('data-slider');
            showSlider(slider);
        }
    });

    closeBtn.addEventListener('click', () => {
        sliderOverlay.style.display = 'none';
        sliderImages.innerHTML = ''; // Clear slider images to free memory
    });

    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    function showSlider(slider) {
        sliderImages.innerHTML = ''; // Clear previous images
        images = getImages(slider); // Get images for the selected slider
        sliderOverlay.style.display = 'flex';
        currentSlide = 0;
        loadSlide(currentSlide);
    }

    function getImages(slider) {
        const imagesMap = {
            '1': [
                'damla_hn1/s2-min.jpg', 'damla_hn1/s3-min.jpg', 'damla_hn1/s4-min.jpg', 'damla_hn1/s5-min.jpg',
                'damla_hn1/s6-min.jpg', 'damla_hn1/s7-min.jpg', 'damla_hn1/s8-min.jpg', 'damla_hn1/s9-min.jpg',
                'damla_hn1/s10-min.jpg', 'damla_hn1/s11-min.jpg', 'damla_hn1/s12-min.jpg', 'damla_hn1/s13-min.jpg',
                'damla_hn1/s14-min.jpg', 'damla_hn1/s15-min.jpg', 'damla_hn1/s16-min.jpg', 'damla_hn1/s17-min.jpg',
                'damla_hn1/s18-min.jpg', 'damla_hn1/s19-min.jpg', 'damla_hn1/s20-min.jpg', 'damla_hn1/s21-min.jpg',
                'damla_hn1/s22-min.jpg', 'damla_hn1/s23-min.jpg'
            ],
            '2': [
                'kubist1/1-min.jpg', 'kubist1/2-min.jpg', 'kubist1/3-min.jpg', 'kubist1/4-min.jpg', 'kubist1/5-min.jpg',
                'kubist1/9-min.jpg', 'kubist1/10-min.jpg', 'kubist1/B2-min.jpg', 'kubist1/B3-min.jpg', 'kubist1/s1-min.jpg',
                'kubist1/s2-min.jpg', 'kubist1/s3-min.jpg', 'kubist1/s6-min.jpg', 'kubist1/s7-min.jpg'
            ],
            '3': [
                'demir_country1/m2-min.jpg', 'demir_country1/m3-min.jpg', 'demir_country1/m5-min.jpg', 'demir_country1/m6-min.jpg',
                'demir_country1/s5-min.jpg', 'demir_country1/s7-min.jpg', 'demir_country1/y3-min.jpg', 'demir_country1/y4-min.jpg',
                'demir_country1/y7-min.jpg', 'demir_country1/y8-min.jpg'
            ],
            '4': [
                'bir_bahce1/5837189223797604958_121.jpg', 'bir_bahce1/5837189223797604960_121.jpg',
                'bir_bahce1/5837189223797604963_121.jpg', 'bir_bahce1/5837189223797604965_121.jpg',
                'bir_bahce1/5837189223797604966_121.jpg', 'bir_bahce1/5837189223797604968_121.jpg',
                'bir_bahce1/5837189223797604970_121.jpg', 'bir_bahce1/5837189223797604971_121.jpg'
            ],
            '5': [
                'diktas_evi1/g4_4_11zon.jpg', 'diktas_evi1/m1_5_11zon.jpg', 'diktas_evi1/s1_6_11zon.jpg',
                'diktas_evi1/s2_7_11zon.jpg', 'diktas_evi1/s3_8_11zon.jpg', 'diktas_evi1/s5_9_11zon.jpg',
                'diktas_evi1/y1_10_11zon.jpg', 'diktas_evi1/y2_11_11zon.jpg', 'diktas_evi1/y4_12_11zon.jpg',
                'diktas_evi1/y7_13_11zon.jpg'
            ],
            '6': [
                'silivri1/ebeveyn_banyo1_1_11zon.jpg', 'silivri1/erkek_cocuk odasi1_2_11zon.jpg',
                'silivri1/erkek_cocuk odasi2_3_11zon.jpg', 'silivri1/genel_banyo1_4_11zon.jpg',
                'silivri1/genel_banyo2_5_11zon.jpg', 'silivri1/genel_banyo3_6_11zon.jpg',
                'silivri1/giyinme_odasi1_7_11zon.jpg', 'silivri1/giyinme_odasi2_8_11zon.jpg',
                'silivri1/kız_cocuk_odasi1_9.jpg', 'silivri1/kız_cocuk_odasi2_10.jpg', 'silivri1/salon1_11_11zon.jpg'
            ],
            '7': [
                'loft1/s1_1_11zon.jpg', 'loft1/s2_2_11zon.jpg', 'loft1/s3_3_11zon.jpg',
                'loft1/s4_4_11zon.jpg', 'loft1/s5_5_11zon.jpg'
            ],
            '8': [
                'erden_bey1/1_1_11zon.jpg', 'erden_bey1/2_2_11zon.jpg', 'erden_bey1/4_3_11zon.jpg',
                'erden_bey1/5_4_11zon.jpg', 'erden_bey1/6_5_11zon.jpg', 'erden_bey1/7_6_11zon.jpg',
                'erden_bey1/9_7_11zon.jpg', 'erden_bey1/13_8_11zon.jpg', 'erden_bey1/14_9_11zon.jpg'
            ],
            '9': [
                'cocuk_odasi1/a1.jpg', 'cocuk_odasi1/a3.jpg', 'cocuk_odasi1/a4.jpg', 'cocuk_odasi1/a5.jpg'
            ],
            '10': [
                'kadir_alkan1/1KR.jpg', 'kadir_alkan1/2KR.jpg', 'kadir_alkan1/3KR.jpg', 'kadir_alkan1/5KR.jpg',
                'kadir_alkan1/6KR.jpg', 'kadir_alkan1/7KR.jpg', 'kadir_alkan1/9KR.jpg'
            ],
            '11': [
                'lotus_dis1/1.jpg', 'lotus_dis1/2.jpg', 'lotus_dis1/3.jpg', 'lotus_dis1/5.jpg',
                'lotus_dis1/BA1.jpg', 'lotus_dis1/BA2.jpg', 'lotus_dis1/BA3.jpg'
            ],
            '12': [
                'apel_is1/Apel-is1-min.jpg', 'apel_is1/Apel-is2-min.jpg', 'apel_is1/Apel-is3-min.jpg', 'apel_is1/Apel-is4-min.jpg'
            ],
            '13': [
                'duzce_cam1/1_1_11zon.jpg', 'duzce_cam1/3_2_11zon.jpg', 'duzce_cam1/4_3_11zon.jpg',
                'duzce_cam1/5_4_11zon.jpg', 'duzce_cam1/6_5_11zon.jpg', 'duzce_cam1/7_6_11zon.jpg',
                'duzce_cam1/8_7_11zon.jpg', 'duzce_cam1/9_8_11zon.jpg', 'duzce_cam1/10_9_11zon.jpg',
                'duzce_cam1/12_10_11zon.jpg'
            ],
            '14': [
                'childish1/2-min.jpg', 'childish1/3-min.jpg', 'childish1/7-min.jpg',
                'childish1/13-min.jpg', 'childish1/14-min.jpg', 'childish1/17-min.jpg',
                'childish1/18-min.jpg', 'childish1/a1-min.jpg', 'childish1/a2-min.jpg',
                'childish1/a3-min.jpg', 'childish1/a4-min.jpg', 'childish1/a6-min.jpg',
                'childish1/a7-min.jpg', 'childish1/a8-min.jpg'
            ]
            ,
            '15': [
                'bikelife1/bike1_1_11zon.jpg', 'bikelife1/bike2_2_11zon.jpg', 'bikelife1/bike4_3_11zon.jpg', 'bikelife1/bike5_4_11zon.jpg'
            ],
            '16': [
                'casablu/c1.jpg', 'casablu/c2.jpg', 'casablu/c3.jpg',
                'casablu/c4.jpg', 'casablu/c5.jpg', 'casablu/c6.jpg',
                'casablu/c7.jpg', 'casablu/c8.jpg', 'casablu/c9.jpg',
                'casablu/c10.jpg', 'casablu/c11.jpg', 'casablu/c12.jpg',
                'casablu/c13.jpg', 'casablu/c14.jpg', 'casablu/c15.jpg',
                'casablu/c16.jpg', 'casablu/c17.jpg', 'casablu/c18.jpg',
                'casablu/c19.jpg', 'casablu/c20.jpg', 'casablu/c21.jpg',
                'casablu/c22.jpg', 'casablu/c23.jpg', 'casablu/c24.jpg',
                'casablu/c25.jpg', 'casablu/c26.jpg', 'casablu/c27.jpg',
                'casablu/c28.jpg', 'casablu/c29.jpg', 'casablu/c30.jpg',
                'casablu/c31.jpg', 'casablu/c32.jpg', 'casablu/c33.jpg',
                'casablu/c34.jpg', 'casablu/c35.jpg', 'casablu/c36.jpg'
            ]
            ,
            '17': [
                'deniz istanbul/d1.jpg', 'deniz istanbul/d2.jpg', 'deniz istanbul/d3.jpg',
                'deniz istanbul/d4.jpg', 'deniz istanbul/d5.jpg', 'deniz istanbul/d6.jpg',
                'deniz istanbul/d7.jpg', 'deniz istanbul/d8.jpg', 'deniz istanbul/d9.jpg',
                'deniz istanbul/d10.jpg', 'deniz istanbul/d11.jpg', 'deniz istanbul/d12.jpg',
                'deniz istanbul/d13.jpg', 'deniz istanbul/d14.jpg', 'deniz istanbul/d15.jpg',
                'deniz istanbul/d16.jpg', 'deniz istanbul/d17.jpg', 'deniz istanbul/d18.jpg',
                'deniz istanbul/d19.jpg', 'deniz istanbul/d20.jpg', 'deniz istanbul/d21.jpg',
                'deniz istanbul/d22.jpg', 'deniz istanbul/d23.jpg'
            ]

            ,
            '18': [
                'dubleks silivri1/b1.jpg', 'dubleks silivri1/b2.jpg', 'dubleks silivri1/b3.jpg',
                'dubleks silivri1/b4.jpg', 'dubleks silivri1/b5.jpg', 'dubleks silivri1/b6.jpg',
                'dubleks silivri1/b7.jpg', 'dubleks silivri1/b8.jpg', 'dubleks silivri1/b9.jpg',
                'dubleks silivri1/b10.jpg', 'dubleks silivri1/b11.jpg', 'dubleks silivri1/b12.jpg',
                'dubleks silivri1/b13.jpg', 'dubleks silivri1/b14.jpg', 'dubleks silivri1/b15.jpg',
                'dubleks silivri1/b16.jpg', 'dubleks silivri1/b17.jpg', 'dubleks silivri1/b18.jpg'
            ]




            // Add more sliders as needed...
        };
        return imagesMap[slider] || [];
    }

    function loadSlide(index) {
        const currentImage = new Image();
        currentImage.src = images[index];
        currentImage.alt = "Proje Resmi";
        currentImage.loading = 'eager';  // Disable lazy loading for slider
        sliderImages.innerHTML = '';  // Clear the slider images container
        sliderImages.appendChild(currentImage);

        // Preload the next image
        const nextIndex = (index + 1) % images.length;
        const nextImage = new Image();
        nextImage.src = images[nextIndex];
        nextImage.loading = 'eager';
    }

    function changeSlide(n) {
        currentSlide += n;
        if (currentSlide >= images.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = images.length - 1;
        loadSlide(currentSlide);
    }

    // Combined touch and mouse events for scrolling
    function handleInteractionStart(event) {
        startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    }

    function handleInteractionEnd(event) {
        endX = event.type === 'mouseup' ? event.clientX : event.changedTouches[0].clientX;
        handleGesture();
    }

    function handleGesture() {
        if (startX - endX > 30) {
            changeSlide(1); // Next slide
        } else if (endX - startX > 30) {
            changeSlide(-1); // Previous slide
        }
    }

    sliderImages.addEventListener('touchstart', handleInteractionStart, false);
    sliderImages.addEventListener('touchend', handleInteractionEnd, false);
    sliderImages.addEventListener('mousedown', handleInteractionStart, false);
    sliderImages.addEventListener('mouseup', handleInteractionEnd, false);
});

// Function to detect if the user is on mobile
function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Set WhatsApp link based on the device
document.addEventListener('DOMContentLoaded', function () {
    var whatsappLink = document.getElementById('whatsapp-link');
    var phoneNumber = '905318443474'; // Replace this with your WhatsApp phone number

    if (isMobile()) {
        whatsappLink.href = 'https://api.whatsapp.com/send?phone=' + phoneNumber;
    } else {
        whatsappLink.href = 'https://web.whatsapp.com/send?phone=' + phoneNumber;
    }
});


// Kaydırma özelligi

function handleInteractionStart(event) {
    event.preventDefault(); // Varsayılan davranışı engelle
    startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    isDragging = true;
}

function handleInteractionEnd(event) {
    if (!isDragging) return;
    endX = event.type === 'mouseup' ? event.clientX : event.changedTouches[0].clientX;
    isDragging = false;
    handleGesture();
}

function handleGesture() {
    const swipeDistance = startX - endX;
    if (swipeDistance > 50) {
        changeSlide(1); // Sonraki slayt
    } else if (swipeDistance < -50) {
        changeSlide(-1); // Önceki slayt
    }
}

// Sürükleme sırasında kaydırma hissiyatı için mousemove ve touchmove olayları ekleyelim
sliderImages.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
});

sliderImages.addEventListener('touchmove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
});

sliderImages.addEventListener('touchstart', handleInteractionStart, false);
sliderImages.addEventListener('touchend', handleInteractionEnd, false);
sliderImages.addEventListener('mousedown', handleInteractionStart, false);
sliderImages.addEventListener('mouseup', handleInteractionEnd, false);

