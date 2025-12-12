
document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS with your public key
 emailjs.init({ publicKey: "KssOi34yPiB6w9462" });// <-- replace with your EmailJS public key

  const form = document.querySelector('.php-email-form');
  if (!form) return;

  const loadingEl = form.querySelector('.loading');
  const errorEl   = form.querySelector('.error-message');
  const successEl = form.querySelector('.sent-message');
  const submitBtn = form.querySelector('button[type="submit"]');

  const show = (el) => { if (el) el.style.display = 'block'; };
  const hide = (el) => { if (el) el.style.display = 'none'; };
  const setText = (el, text) => { if (el) el.textContent = text; };

  hide(loadingEl);
  hide(errorEl);
  hide(successEl);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    hide(errorEl);
    hide(successEl);
    setText(errorEl, '');

    const name    = form.querySelector('input[name="name"]').value.trim();
    const email   = form.querySelector('input[name="email"]').value.trim();
    const subject = form.querySelector('input[name="subject"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !subject || !message) {
      setText(errorEl, 'Please fill in all required fields.');
      show(errorEl);
      return;
    }
    if (!isValidEmail(email)) {
      setText(errorEl, 'Please enter a valid email address.');
      show(errorEl);
      return;
    }

    submitBtn.disabled = true;
    show(loadingEl);

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
    };

    try {
      await emailjs.send('service_adt0m1o', 'template_7q3n6m8', templateParams);
      hide(loadingEl);
      setText(successEl, 'Your message has been sent successfully! Thank you.');
      show(successEl);
      form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      hide(loadingEl);
      setText(errorEl, 'There was an error sending your message. Please try again later.');
      show(errorEl);
    } finally {
      submitBtn.disabled = false;
    }
  });
});
