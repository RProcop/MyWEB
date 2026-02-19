document.addEventListener('DOMContentLoaded', () => {

  const openBtn = document.getElementById('openContacts');
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('closeContacts');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('status');

  if (!openBtn || !modal) return;

  /* ================= OPEN ================= */

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    const first = modal.querySelector('input, textarea, button');
    if (first) first.focus();
  }

  /* ================= CLOSE ================= */

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    openBtn.focus();
  }

  /* ================= EVENTS ================= */

  openBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);

  // Закрытие по клику на backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  /* ================= FORM SUBMIT ================= */

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    statusEl.className = 'status';
    statusEl.style.display = 'block';
    statusEl.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusEl.className = 'status ok';
        statusEl.textContent = 'Sent! I will reply soon.';
        form.reset();

        setTimeout(() => {
          closeModal();
          statusEl.style.display = 'none';
        }, 900);

      } else {
        statusEl.className = 'status err';
        statusEl.textContent = 'Error. Please try again later.';
      }

    } catch (error) {
      statusEl.className = 'status err';
      statusEl.textContent = 'Network error. Please try again later.';
    }
  });

});
