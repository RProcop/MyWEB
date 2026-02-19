document.addEventListener('DOMContentLoaded', () => {

  const openBtn = document.getElementById('openContacts');
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('closeContacts');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('status');

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    const first = modal.querySelector('input, textarea');
    if (first) first.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    openBtn.focus();
  }

  /* ===== EVENTS ===== */

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  /* ===== FORM SUBMIT ===== */

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    statusEl.className = 'status';
    statusEl.style.display = 'block';
    statusEl.textContent = 'Sending...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        statusEl.className = 'status ok';
        statusEl.textContent = 'Sent! I will reply soon.';
        form.reset();
        setTimeout(closeModal, 900);
      } else {
        statusEl.className = 'status err';
        statusEl.textContent = 'Error. Please try again later.';
      }

    } catch (err) {
      statusEl.className = 'status err';
      statusEl.textContent = 'Network error. Please try again later.';
    }
  });

});
