// Scroll event to change header background color and keep it fixed
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) { // 50px aşağı kaydırıldığında
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Language Switcher
const navLinks = document.querySelectorAll('.nav-link');
const turkishButton = document.getElementById('turkish');
const englishButton = document.getElementById('english');

turkishButton.addEventListener('click', () => {
    navLinks.forEach(link => {
        link.textContent = link.getAttribute('data-tr');
    });
    alert('Dil Türkçe olarak değiştirildi');
});

englishButton.addEventListener('click', () => {
    navLinks.forEach(link => {
        link.textContent = link.getAttribute('data-en');
    });
    alert('Language changed to English');
});



// Counter animation for statistics
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Speed of the animation

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
});

// Function to detect if the user is on mobile
function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Set WhatsApp link based on the device
document.addEventListener('DOMContentLoaded', function() {
    var whatsappLink = document.getElementById('whatsapp-link');
    var phoneNumber = '905318443474'; // Replace this with your WhatsApp phone number

    if (isMobile()) {
        whatsappLink.href = 'https://api.whatsapp.com/send?phone=' + phoneNumber;
    } else {
        whatsappLink.href = 'https://web.whatsapp.com/send?phone=' + phoneNumber;
    }
});
