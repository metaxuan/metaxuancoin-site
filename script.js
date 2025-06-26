document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const transferBox = document.getElementById("transfer-interface");
  const backBtn = document.getElementById("back-btn");
  const languageSelect = document.getElementById("language-select");

  startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    transferBox.classList.remove("hidden");
  });

  backBtn.addEventListener("click", () => {
    transferBox.classList.add("hidden");
    startBtn.classList.remove("hidden");
  });

  languageSelect.addEventListener("change", () => {
    const lang = languageSelect.value;
    const translations = {
      "en": {
        "start": "Start Transfer",
        "title": "Transfer Interface",
        "recipient": "Recipient Address",
        "amount": "Amount",
        "inputAddr": "Enter address",
        "inputAmt": "Enter amount",
        "send": "Send",
        "back": "Back"
      },
      "zh-TW": {
        "start": "開始轉帳",
        "title": "轉帳介面",
        "recipient": "接收地址",
        "amount": "轉帳金額",
        "inputAddr": "請輸入地址",
        "inputAmt": "請輸入金額",
        "send": "轉帳",
        "back": "返回"
      },
      "zh-CN": {
        "start": "开始转账",
        "title": "转账界面",
        "recipient": "接收地址",
        "amount": "转账金额",
        "inputAddr": "请输入地址",
        "inputAmt": "请输入金额",
        "send": "转账",
        "back": "返回"
      },
      "es": {
        "start": "Iniciar Transferencia",
        "title": "Interfaz de Transferencia",
        "recipient": "Dirección de destino",
        "amount": "Cantidad",
        "inputAddr": "Introducir dirección",
        "inputAmt": "Introducir cantidad",
        "send": "Enviar",
        "back": "Atrás"
      },
      "ja": {
        "start": "送金を開始",
        "title": "送金インターフェース",
        "recipient": "受取アドレス",
        "amount": "金額",
        "inputAddr": "アドレスを入力",
        "inputAmt": "金額を入力",
        "send": "送金",
        "back": "戻る"
      },
      "ko": {
        "start": "송금 시작",
        "title": "송금 인터페이스",
        "recipient": "수신 주소",
        "amount": "금액",
        "inputAddr": "주소 입력",
        "inputAmt": "금액 입력",
        "send": "보내기",
        "back": "뒤로가기"
      },
      "th": {
        "start": "เริ่มโอนเงิน",
        "title": "หน้าต่างโอนเงิน",
        "recipient": "ที่อยู่ผู้รับ",
        "amount": "จำนวน",
        "inputAddr": "กรอกที่อยู่",
        "inputAmt": "กรอกจำนวน",
        "send": "ส่ง",
        "back": "ย้อนกลับ"
      }
    };

    const t = translations[lang];
    document.getElementById("start-btn").innerText = `${t.start}`;
    document.getElementById("transfer-title").innerText = `${t.title}`;
    document.getElementById("recipient-label").innerText = `${t.recipient}`;
    document.getElementById("recipient").placeholder = `${t.inputAddr}`;
    document.getElementById("amount-label").innerText = `${t.amount}`;
    document.getElementById("amount").placeholder = `${t.inputAmt}`;
    document.getElementById("send-btn").innerText = `${t.send}`;
    document.getElementById("back-btn").innerText = `${t.back}`;
  });
});