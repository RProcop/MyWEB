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

document.addEventListener("DOMContentLoaded", () => {
  const langSwitch = document.getElementById("langSwitch");
  const langCurrent = document.getElementById("langCurrent");
  const currentLangLabel = document.getElementById("currentLang");
  const langItems = document.querySelectorAll(".lang-item");

  if (!langSwitch || !langCurrent || !currentLangLabel) return;

  // Open/close
  langCurrent.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = langSwitch.classList.toggle("open");
    langCurrent.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".lang-switch")) {
      langSwitch.classList.remove("open");
      langCurrent.setAttribute("aria-expanded", "false");
    }
  });

  // Select language
  langItems.forEach((item) => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang; // "ua" | "uk"
      currentLangLabel.textContent = lang.toUpperCase();

      // aria-selected toggle
      langItems.forEach((i) => i.setAttribute("aria-selected", "false"));
      item.setAttribute("aria-selected", "true");

      // Close menu
      langSwitch.classList.remove("open");
      langCurrent.setAttribute("aria-expanded", "false");

      // TODO: тут подключишь реальную смену языка:
      // localStorage.setItem("site_lang", lang);
      // applyLanguage(lang);
    });
  });

  // Optional: restore saved language
  const saved = localStorage.getItem("site_lang");
  if (saved === "ua" || saved === "uk") {
    currentLangLabel.textContent = saved.toUpperCase();
    langItems.forEach((i) => i.setAttribute("aria-selected", String(i.dataset.lang === saved)));
  }
});

