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

  if (!openBtn || !modal || !closeBtn || !cancelBtn || !form || !statusEl) return;

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
    if (event.target === modal) closeModal();
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
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Form submit failed");

      statusEl.className = "status ok";
      statusEl.textContent = "Sent! I will reply soon.";
      form.reset();

      window.setTimeout(closeModal, 900);
    } catch {
      statusEl.className = "status err";
      statusEl.textContent = "Network error. Please try again.";
    }
  });
}

function initLanguageSwitch() {
  const switcher = document.getElementById("langSwitch");
  const currentBtn = document.getElementById("langCurrent");
  const currentLabel = document.getElementById("currentLangLabel");
  const items = document.querySelectorAll(".lang-item");

  if (!switcher || !currentBtn || !currentLabel || !items.length) return;

  const dictionary = {
    uk: {
      label: "UA",
      heroTitle1: "EMBEDDED",
      heroTitle2: "SOLUTIONS",
      heroSubtitle: "Engineering-driven IoT systems. Reliable hardware & firmware development. 3D-Printing & Modeling.",
      aboutBtn: "About",
      contactBtn: "Contact me",
      modalTitle: "Contact me",
      modalHint: "Send a message — it will be delivered to me.",
      cancelBtn: "Cancel",
      sendBtn: "Send"
    },
    en: {
      label: "EN",
      heroTitle1: "EMBEDDED",
      heroTitle2: "SOLUTIONS",
      heroSubtitle: "Engineering-driven IoT systems. Reliable hardware & firmware development. 3D-Printing & Modeling.",
      aboutBtn: "About",
      contactBtn: "Contact me",
      modalTitle: "Contact me",
      modalHint: "Send a message — it will be delivered to me.",
      cancelBtn: "Cancel",
      sendBtn: "Send"
    }
  };

  function setLanguage(lang) {
    const data = dictionary[lang] || dictionary.uk;

    currentLabel.textContent = data.label;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (data[key]) element.textContent = data[key];
    });

    localStorage.setItem("siteLang", lang);
    switcher.classList.remove("open");
    currentBtn.setAttribute("aria-expanded", "false");
  }

  currentBtn.addEventListener("click", () => {
    const isOpen = switcher.classList.toggle("open");
    currentBtn.setAttribute("aria-expanded", String(isOpen));
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      setLanguage(item.dataset.lang);
    });
  });

  document.addEventListener("click", (event) => {
    if (!switcher.contains(event.target)) {
      switcher.classList.remove("open");
      currentBtn.setAttribute("aria-expanded", "false");
    }
  });

  setLanguage(localStorage.getItem("siteLang") || "uk");
}