function handleSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const formMessage = document.getElementById('form-message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = '#dc3545';
        formMessage.style.display = 'block';
        return;
    }

    formMessage.textContent = 'Thank you for signing up! We’ll keep you updated.';
    formMessage.style.color = '#28a745';
    formMessage.style.display = 'block';
    document.getElementById('email').value = '';
}

particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: '#007bff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 1, direction: 'top', random: true, straight: false, out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
    },
    retina_detect: true
});