document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitch();
  initContactModal();
  initCarousels();
});

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact me",

    "home.eyebrow": "Embedded Engineering · IoT · Rapid Prototyping",
    "home.titleTop": "Embedded IoT",
    "home.titleBottom": "solutions for real hardware.",
    "home.subtitle": "Development of reliable hardware, firmware, connected devices, 3D-printing and engineering prototypes.",
    "home.metricOne": "Hardware + Firmware",
    "home.metricTwo": "Prototype to product",

    "about.eyebrow": "Engineering profile",
    "about.title": "About me",
    "about.textOne": "I am an Embedded Systems Engineer specializing in IoT development, custom hardware design and high-performance firmware engineering.",
    "about.textTwo": "I design and develop reliable embedded solutions based on STM32, ESP32 and Atmel platforms — from PCB schematics and hardware architecture to optimized C/C++ firmware, real-time systems and cross-platform mobile applications.",
    "about.textThree": "My expertise covers full-cycle IoT product development including wireless connectivity, low-power optimization, industrial device prototyping and scalable system integration.",

    "projects.eyebrow": "Selected engineering work",
    "projects.title": "Selected Work",
    "projects.cardOneTitle": "IoT Energy System",
    "projects.cardOneText": "Firmware architecture, wireless sensors, telemetry, cloud integration and device monitoring.",
    "projects.cardTwoTitle": "LoRa Embedded Module",
    "projects.cardTwoText": "Custom PCB, driver optimization, low-power firmware and RF testing for long-range communication.",
    "projects.cardThreeTitle": "Custom Control Board",
    "projects.cardThreeText": "Hardware architecture, schematic design, prototyping and firmware for industrial control tasks.",
    "projects.cardFourTitle": "3D Printed Prototypes",
    "projects.cardFourText": "Rapid enclosure modeling, mechanical fit testing and prototype iteration for electronic devices.",

    "contact.title": "Contact me",
    "contact.hint": "Send a message — it will be delivered to me.",
    "contact.name": "Your name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.cancel": "Cancel",
    "contact.send": "Send",
    "contact.sending": "Sending...",
    "contact.success": "Sent! I will reply soon.",
    "contact.error": "Error. Please try again later.",
    "contact.network": "Network error. Please try again later."
  },

  uk: {
    "nav.home": "Головна",
    "nav.about": "Про мене",
    "nav.projects": "Проєкти",
    "nav.contact": "Звʼязатися",

    "home.eyebrow": "Embedded Engineering · IoT · Швидке прототипування",
    "home.titleTop": "Embedded IoT",
    "home.titleBottom": "рішення для реального заліза.",
    "home.subtitle": "Розробка надійного hardware, firmware, підключених пристроїв, 3D-друку та інженерних прототипів.",
    "home.metricOne": "Hardware + Firmware",
    "home.metricTwo": "Від прототипу до продукту",

    "about.eyebrow": "Інженерний профіль",
    "about.title": "Про мене",
    "about.textOne": "Я Embedded Systems Engineer, який спеціалізується на IoT-розробці, кастомному hardware-дизайні та продуктивній firmware-інженерії.",
    "about.textTwo": "Я проєктую та розробляю надійні embedded-рішення на базі STM32, ESP32 та Atmel — від схемотехніки й архітектури пристрою до оптимізованої C/C++ firmware, real-time систем і кросплатформних застосунків.",
    "about.textThree": "Моя експертиза охоплює повний цикл IoT-розробки: бездротовий звʼязок, low-power оптимізацію, промислове прототипування та масштабовану системну інтеграцію.",

    "projects.eyebrow": "Вибрані інженерні роботи",
    "projects.title": "Вибрані проєкти",
    "projects.cardOneTitle": "IoT Energy System",
    "projects.cardOneText": "Архітектура firmware, бездротові сенсори, телеметрія, cloud-інтеграція та моніторинг пристроїв.",
    "projects.cardTwoTitle": "LoRa Embedded Module",
    "projects.cardTwoText": "Кастомна PCB, оптимізація драйверів, low-power firmware та RF-тестування для далекого звʼязку.",
    "projects.cardThreeTitle": "Custom Control Board",
    "projects.cardThreeText": "Апаратна архітектура, схемотехніка, прототипування та firmware для промислових задач керування.",
    "projects.cardFourTitle": "3D Printed Prototypes",
    "projects.cardFourText": "Швидке моделювання корпусів, перевірка механічної посадки та ітерації прототипів для електроніки.",

    "contact.title": "Звʼязатися",
    "contact.hint": "Надішли повідомлення — воно буде доставлено мені.",
    "contact.name": "Ваше імʼя",
    "contact.email": "Email",
    "contact.message": "Повідомлення",
    "contact.cancel": "Скасувати",
    "contact.send": "Надіслати",
    "contact.sending": "Надсилання...",
    "contact.success": "Надіслано! Я відповім найближчим часом.",
    "contact.error": "Помилка. Спробуйте ще раз пізніше.",
    "contact.network": "Помилка мережі. Спробуйте ще раз пізніше."
  }
};

function initLanguageSwitch() {
  const langSwitch = document.getElementById("langSwitch");
  const langCurrent = document.getElementById("langCurrent");
  const currentLangLabel = document.getElementById("currentLang");
  const langItems = document.querySelectorAll(".lang-item");

  if (!langSwitch || !langCurrent || !currentLangLabel || !langItems.length) {
    applyLanguage(getInitialLanguage());
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

      if (!translations[lang]) return;

      localStorage.setItem("site_lang", lang);
      applyLanguage(lang);

      langSwitch.classList.remove("open");
      langCurrent.setAttribute("aria-expanded", "false");
    });
  });

  applyLanguage(getInitialLanguage());
}

function getInitialLanguage() {
  const savedLang = localStorage.getItem("site_lang");
  const htmlLang = document.documentElement.lang;

  if (translations[savedLang]) return savedLang;
  if (translations[htmlLang]) return htmlLang;

  return "en";
}

function applyLanguage(lang) {
  const dictionary = translations[lang] || translations.en;
  const currentLangLabel = document.getElementById("currentLang");
  const langItems = document.querySelectorAll(".lang-item");

  document.documentElement.lang = lang;

  if (currentLangLabel) {
    currentLangLabel.textContent = lang.toUpperCase();
  }

  langItems.forEach((item) => {
    item.setAttribute("aria-selected", String(item.dataset.lang === lang));
  });

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = dictionary[key];

    if (value) {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    const value = dictionary[key];

    if (value) {
      element.setAttribute("placeholder", value);
    }
  });
}

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

  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const firstField = modal.querySelector("input, textarea, button");
    firstField?.focus();
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    openBtn.focus();
  };

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

    const lang = getInitialLanguage();
    const dictionary = translations[lang] || translations.en;

    statusEl.className = "status";
    statusEl.style.display = "block";
    statusEl.textContent = dictionary["contact.sending"];

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
      statusEl.textContent = dictionary["contact.success"];
      form.reset();

      window.setTimeout(closeModal, 900);
    } catch {
      statusEl.className = "status err";
      statusEl.textContent = dictionary["contact.network"];
    }
  });
}

function initCarousels() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel-item");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");

    if (!items.length || !nextBtn || !prevBtn) {
      return;
    }

    let current = 0;

    const updateCarousel = () => {
      items.forEach((item, index) => {
        item.classList.toggle("active", index === current);
      });
    };

    nextBtn.addEventListener("click", () => {
      current = (current + 1) % items.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      current = (current - 1 + items.length) % items.length;
      updateCarousel();
    });
  });
}