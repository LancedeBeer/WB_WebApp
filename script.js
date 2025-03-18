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