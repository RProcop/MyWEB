document.addEventListener("DOMContentLoaded", () => {
  initContactModal();
  initLanguageSwitch();
});

function initContactModal() {
  const openBtn = document.getElementById("openContacts");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("closeContacts");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("status");

  if (!openBtn || !modal || !closeBtn || !cancelBtn || !form || !statusEl) {
    return;
  }

  function openModal() {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const firstField = modal.querySelector("input, textarea, button");
    if (firstField) firstField.focus();
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    openBtn.focus();
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    statusEl.className = "status";
    statusEl.style.display = "block";
    statusEl.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Form submit failed");
      }

      statusEl.className = "status ok";
      statusEl.textContent = "Sent! I will reply soon.";
      form.reset();

      window.setTimeout(closeModal, 900);
    } catch {
      statusEl.className = "status err";
      statusEl.textContent = "Network error. Please try again later.";
    }
  });
}

function initLanguageSwitch() {
  const langSwitch = document.getElementById("langSwitch");
  const langCurrent = document.getElementById("langCurrent");
  const currentLangLabel = document.getElementById("currentLang");
  const langItems = document.querySelectorAll(".lang-item");

  if (!langSwitch || !langCurrent || !currentLangLabel || !langItems.length) {
    return;
  }

  langCurrent.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = langSwitch.classList.toggle("open");
    langCurrent.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".lang-switch")) {
      langSwitch.classList.remove("open");
      langCurrent.setAttribute("aria-expanded", "false");
    }
  });

  langItems.forEach((item) => {
    item.addEventListener("click", () => {
      const lang = item.dataset.lang;

      if (!lang) return;

      localStorage.setItem("site_lang", lang);
      currentLangLabel.textContent = lang.toUpperCase();

      langItems.forEach((button) => {
        button.setAttribute("aria-selected", String(button.dataset.lang === lang));
      });

      langSwitch.classList.remove("open");
      langCurrent.setAttribute("aria-expanded", "false");
    });
  });

  const savedLang = localStorage.getItem("site_lang");

  if (savedLang) {
    currentLangLabel.textContent = savedLang.toUpperCase();

    langItems.forEach((button) => {
      button.setAttribute("aria-selected", String(button.dataset.lang === savedLang));
    });
  }
}