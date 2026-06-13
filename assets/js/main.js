document.addEventListener("DOMContentLoaded", () => {
  initContactModal();
});

function initContactModal() {
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("closeContacts");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("status");
  const openButtons = [
    document.getElementById("openContacts"),
    document.getElementById("openContactsBottom")
  ].filter(Boolean);

  if (!modal || !closeBtn || !cancelBtn || !form || !statusEl || !openButtons.length) return;

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
  }

  openButtons.forEach((button) => button.addEventListener("click", openModal));
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusEl.className = "status";
    statusEl.style.display = "block";
    statusEl.textContent = "Надсилання...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Form submit failed");
      statusEl.className = "status ok";
      statusEl.textContent = "Надіслано. Ми відповімо найближчим часом.";
      form.reset();
      window.setTimeout(closeModal, 1000);
    } catch {
      statusEl.className = "status err";
      statusEl.textContent = "Помилка мережі. Спробуйте ще раз або напишіть напряму.";
    }
  });
}
