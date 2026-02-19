
function openContact() {
  document.getElementById("contactModal").style.display = "flex";
}

function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}

/* ================= LANGUAGE SWITCH LOGIC ================= */

const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const langOptions = document.querySelectorAll('.lang-option');

langToggle.addEventListener('click', () => {
  langDropdown.classList.toggle('open');
});

document.addEventListener('click', (e)=>{
  if(!e.target.closest('.lang-switch')){
    langDropdown.classList.remove('open');
  }
});

langOptions.forEach(option=>{
  option.addEventListener('click', ()=>{
    const selectedLang = option.dataset.lang;

    // Меняем текст заголовка как пример
    if(selectedLang === "ua"){
      document.querySelector('.hero-left h1').innerHTML =
        "ВБУДОВАНІ<br>IoT<br>R&D<br>3D Друк<br>Моделювання";

      document.querySelector('.subtitle').innerHTML =
        "Інженерні IoT системи.<br>Надійні hardware & firmware рішення.<br>3D Друк та моделювання.";

      langToggle.textContent = "UA ▾";
    }

    if(selectedLang === "en"){
      document.querySelector('.hero-left h1').innerHTML =
        "EMBEDDED<br>IOT<br>R&D<br>3D Printing<br>Modeling";

      document.querySelector('.subtitle').innerHTML =
        "Engineering-driven IoT systems.<br>Reliable hardware & firmware solutions.<br>3D Printing & Modeling.";

      langToggle.textContent = "EN ▾";
    }

    langDropdown.classList.remove('open');
  });
});

