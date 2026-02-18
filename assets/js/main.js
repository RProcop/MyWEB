// Open modal
function openContact() {
  const modal = document.getElementById("contactModal");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // блокируем скролл
}

// Close modal
function closeContact() {
  const modal = document.getElementById("contactModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // возвращаем скролл
}

// Close when clicking outside modal content
window.addEventListener("click", function (event) {
  const modal = document.getElementById("contactModal");
  if (event.target === modal) {
    closeContact();
  }
});

// Close on ESC key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeContact();
  }
});
