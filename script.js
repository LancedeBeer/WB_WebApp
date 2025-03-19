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

    // Placeholder URLs - replace with your actual Google Form links
    const existingClientForm = 'https://forms.gle/example-existing-client-form';
    const newClientDoc = 'https://forms.gle/example-new-client-form';

    setTimeout(() => {
        if (clientStatus.value === 'yes') {
            window.open(existingClientForm, '_blank');
        } else {
            window.open(newClientDoc, '_blank');
        }
        formMessage.style.display = 'none';
    }, 1000);
}