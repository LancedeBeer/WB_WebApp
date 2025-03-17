function handleSubmit(event) {
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById('email').value;
    const formMessage = document.getElementById('form-message');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        formMessage.style.color = '#dc3545'; // Red for error
        formMessage.style.display = 'block';
        return;
    }

    // Simulate form submission (replace with actual backend integration)
    // For now, just show a success message
    formMessage.textContent = 'Thank you for signing up! We’ll keep you updated.';
    formMessage.style.color = '#28a745'; // Green for success
    formMessage.style.display = 'block';
    document.getElementById('email').value = ''; // Clear the input
}