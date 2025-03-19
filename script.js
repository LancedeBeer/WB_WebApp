function handleClientSubmit(event) {
    event.preventDefault();
    const formMessage = document.getElementById('form-message');
    const clientStatus = document.querySelector('input[name="client-status"]:checked');

    if (!clientStatus) {
        formMessage.textContent = 'Please select an option.';
        formMessage.style.color = '#dc3545';
        formMessage.style.display = 'block';
        return;
    }

    formMessage.textContent = 'Redirecting...';
    formMessage.style.color = '#28a745';
    formMessage.style.display = 'block';

    // Placeholder URLs - replace with your actual Google Form and Doc links
    const existingClientForm = 'https://forms.gle/example-existing-client-form';
    const newClientDoc = 'https://docs.google.com/document/d/example-registration-order-form';

    setTimeout(() => {
        if (clientStatus.value === 'yes') {
            window.open(existingClientForm, '_blank');
        } else {
            window.open(newClientDoc, '_blank');
        }
        formMessage.style.display = 'none'; // Hide message after redirect
    }, 1000); // 1-second delay for user feedback
}