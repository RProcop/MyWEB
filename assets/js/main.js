
function openContact() {
  document.getElementById("contactModal").style.display = "flex";
}

function closeContact() {
  document.getElementById("contactModal").style.display = "none";
}

/* ================= LANGUAGE SWITCH (PRO) ================= */

const langSwitch = document.getElementById("langSwitch");
const langCurrent = document.getElementById("langCurrent");
const currentLangLabel = document.getElementById("currentLang");
const langItems = document.querySelectorAll(".lang-item");

langCurrent.addEventListener("click", () => {
  langSwitch.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".lang-switch")) {
    langSwitch.classList.remove("open");
  }
});

langItems.forEach(item => {
  item.addEventListener("click", () => {
    const lang = item.dataset.lang;

    if (lang === "ua") {
      document.querySelector(".hero-left h1").innerHTML =
        "ВБУДОВАНІ<br>IoT<br>R&D<br>3D Друк<br>Моделювання";

      document.querySelector(".subtitle").innerHTML =
        "Інженерні IoT системи.<br>Надійні hardware & firmware рішення.<br>3D Друк та моделювання.";

      currentLangLabel.textContent = "UA";
    }

    if (lang === "en") {
      document.querySelector(".hero-left h1").innerHTML =
        "EMBEDDED<br>IOT<br>R&D<br>3D Printing<br>Modeling";

      document.querySelector(".subtitle").innerHTML =
        "Engineering-driven IoT systems.<br>Reliable hardware & firmware solutions.<br>3D Printing & Modeling.";

      currentLangLabel.textContent = "EN";
    }

    langSwitch.classList.remove("open");
  });
});

