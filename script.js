document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const transferUI = document.getElementById("transfer-interface");
  const languageSelect = document.getElementById("language-select");

  const translations = {
    en: { start: "Start Transfer" },
    "zh-TW": { start: "開始轉帳" },
    "zh-CN": { start: "开始转账" },
    ja: { start: "送金を開始" },
    ko: { start: "송금 시작" },
    es: { start: "Iniciar transferencia" },
    th: { start: "เริ่มโอน" }
  };

  function updateTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = translations[lang][key] || key;
    });
  }

  languageSelect.addEventListener("change", () => {
    const lang = languageSelect.value;
    updateTranslations(lang);
  });

  startBtn.addEventListener("click", () => {
    const form = document.getElementById("transfer-interface");
    if (form) {
      form.classList.remove("hidden");
      startBtn.style.display = "none";
    }
  });
});