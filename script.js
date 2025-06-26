document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    en: {
      start: "Start Transfer",
      "interface-title": "Transfer Interface",
      "address-label": "Recipient Address",
      "amount-label": "Amount",
      send: "Send",
      back: "Back",
    },
    "zh-TW": {
      start: "開始轉帳",
      "interface-title": "轉帳介面",
      "address-label": "接收地址",
      "amount-label": "轉帳金額",
      send: "轉帳",
      back: "返回",
    },
    "zh-CN": {
      start: "开始转账",
      "interface-title": "转账界面",
      "address-label": "接收地址",
      "amount-label": "转账金额",
      send: "转账",
      back: "返回",
    },
    es: {
      start: "Iniciar transferencia",
      "interface-title": "Interfaz de transferencia",
      "address-label": "Dirección del receptor",
      "amount-label": "Cantidad",
      send: "Enviar",
      back: "Regresar",
    },
    ja: {
      start: "送金開始",
      "interface-title": "送金インターフェース",
      "address-label": "受信者アドレス",
      "amount-label": "金額",
      send: "送金",
      back: "戻る",
    },
    ko: {
      start: "송금 시작",
      "interface-title": "송금 인터페이스",
      "address-label": "수신자 주소",
      "amount-label": "금액",
      send: "보내기",
      back: "뒤로가기",
    },
    th: {
      start: "เริ่มโอน",
      "interface-title": "หน้าต่างโอนเงิน",
      "address-label": "ที่อยู่ผู้รับ",
      "amount-label": "จำนวนเงิน",
      send: "ส่ง",
      back: "กลับ",
    }
  };

  const langSelect = document.getElementById("language-select");
  langSelect.addEventListener("change", () => {
    const lang = langSelect.value;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  });

  const startBtn = document.getElementById("start-btn");
  const transferUI = document.getElementById("transfer-interface");
  const backBtn = document.getElementById("back-btn");

  startBtn.addEventListener("click", () => {
    transferUI.classList.remove("hidden");
    startBtn.classList.add("hidden");
  });

  backBtn.addEventListener("click", () => {
    transferUI.classList.add("hidden");
    startBtn.classList.remove("hidden");
  });
});