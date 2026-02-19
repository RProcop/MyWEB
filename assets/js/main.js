const modal = document.getElementById("contactModal");

function openContact() {
  modal.classList.add("open");
  document.body.style.overflow = "hidden"; // блокируем скролл
}

function closeContact() {
  modal.classList.remove("open");
  document.body.style.overflow = ""; // возвращаем скролл
}

/* Закрытие по клику вне модального окна */
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeContact();
  }
});

/* Закрытие по ESC */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeContact();
  }
});
