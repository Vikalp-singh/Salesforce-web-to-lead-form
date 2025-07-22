async function submitWithResume() {
  const form = document.getElementById('webToLeadForm');
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = '';

  const fileInput = document.getElementById('resume');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please upload a resume');
    return;
  }

  const reader = new FileReader();
  reader.onload = async function () {
    const base64 = reader.result.split(',')[1];

    const payload = {
      firstName: document.getElementById('first_name').value,
      lastName: document.getElementById('last_name').value,
      email: document.getElementById('email').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      fileName: file.name,
      base64Data: base64
    };

    try {
      const response = await fetch('https://vikalpcompany-dev-ed.develop.my.site.com/services/apexrest/LeadResumeUpload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        messageDiv.textContent = 'Application submitted successfully!';
        form.reset();
      } else {
        messageDiv.textContent = 'Failed to submit application.';
      }
    } catch (err) {
      console.error(err);
      messageDiv.textContent = 'Something went wrong.';
    }
  };

  reader.readAsDataURL(file);
}
