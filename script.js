const translations = {
  "en": {
    "start": "Start Transfer",
    "title": "MetaXuan Coin",
    "address": "Recipient Address",
    "amount": "Amount",
    "enterAddress": "Enter recipient address",
    "enterAmount": "Enter amount",
    "send": "Send",
    "back": "Back",
    "balance": "Wallet Balance"
  },
  "zh-TW": {
    "start": "開始轉帳",
    "title": "玄元幣 / MetaXuan Coin",
    "address": "接收地址",
    "amount": "轉帳金額",
    "enterAddress": "請輸入接收地址",
    "enterAmount": "請輸入金額",
    "send": "轉帳",
    "back": "返回",
    "balance": "錢包餘額"
  },
  "zh-CN": {
    "start": "开始转账",
    "title": "玄元币 / MetaXuan Coin",
    "address": "接收地址",
    "amount": "转账金额",
    "enterAddress": "请输入接收地址",
    "enterAmount": "请输入金额",
    "send": "转账",
    "back": "返回",
    "balance": "钱包余额"
  },
  "ja": {
    "start": "送金開始",
    "title": "メタシュアンコイン",
    "address": "受取アドレス",
    "amount": "送金額",
    "enterAddress": "アドレスを入力",
    "enterAmount": "金額を入力",
    "send": "送金",
    "back": "戻る",
    "balance": "ウォレット残高"
  },
  "ko": {
    "start": "송금 시작",
    "title": "메타쉬안코인",
    "address": "수신 주소",
    "amount": "송금 금액",
    "enterAddress": "수신 주소 입력",
    "enterAmount": "금액 입력",
    "send": "송금",
    "back": "뒤로가기",
    "balance": "지갑 잔액"
  },
  "es": {
    "start": "Iniciar transferencia",
    "title": "Moneda MetaXuan",
    "address": "Dirección del destinatario",
    "amount": "Monto",
    "enterAddress": "Ingrese la dirección",
    "enterAmount": "Ingrese el monto",
    "send": "Enviar",
    "back": "Atrás",
    "balance": "Saldo de billetera"
  },
  "th": {
    "start": "เริ่มโอน",
    "title": "เหรียญเมตาซวน",
    "address": "ที่อยู่ผู้รับ",
    "amount": "จำนวนเงิน",
    "enterAddress": "กรอกที่อยู่",
    "enterAmount": "กรอกจำนวน",
    "send": "โอน",
    "back": "ย้อนกลับ",
    "balance": "ยอดคงเหลือกระเป๋า"
  }
};
const titleEl = document.getElementById("main-title");

const translations = {
  en: {
    title: "MetaXuan Coin",
    recipient: "Recipient Address",
    amount: "Amount",
    send: "Send",
    back: "← Back",
    start: "Start Transfer"
  },
  zh: {
    title: "玄元幣 ",
    recipient: "接收地址",
    amount: "轉帳金額",
    send: "轉帳",
    back: "← 返回",
    start: "開始轉帳"
  },
  zh_cn: {
    title: "玄元币 ",
    recipient: "接收地址",
    amount: "转账金额",
    send: "转账",
    back: "← 返回",
    start: "开始转账"
  },
  es: {
    title: "MetaXuan Moneda",
    recipient: "Dirección del destinatario",
    amount: "Cantidad",
    send: "Enviar",
    back: "← Atrás",
    start: "Iniciar Transferencia"
  },
  ja: {
    title: "メタシュアンコイン",
    recipient: "受信者アドレス",
    amount: "金額",
    send: "送信",
    back: "← 戻る",
    start: "送金を開始"
  },
  ko: {
    title: "메타쉔 코인",
    recipient: "수신자 주소",
    amount: "금액",
    send: "보내기",
    back: "← 뒤로가기",
    start: "전송 시작"
  },
  th: {
    title: "เมตาเสวียนคอยน์",
    recipient: "ที่อยู่ผู้รับ",
    amount: "จำนวน",
    send: "ส่ง",
    back: "← กลับ",
    start: "เริ่มโอน"
  }
};

document.getElementById("language-select").addEventListener("change", (e) => {
  const lang = e.target.value;
  const t = translations[lang];

  if (t) {
    titleEl.textContent = t.title;
    document.getElementById("recipient-label").textContent = t.recipient;
    document.getElementById("amount-label").textContent = t.amount;
    document.getElementById("send-btn").textContent = `${t.send}`;
    document.getElementById("back-btn").textContent = `${t.back}`;
    document.getElementById("start-btn").textContent = `${t.start}`;
  }
});
function changeLanguage() {
  const lang = document.getElementById("language").value;
  document.getElementById("startBtn").innerText = translations[lang].start;
  document.getElementById("label-address").innerText = translations[lang].address + " / " + translations["en"].address;
  document.getElementById("recipient").placeholder = translations[lang].enterAddress + " / " + translations["en"].enterAddress;
  document.getElementById("label-amount").innerText = translations[lang].amount + " / " + translations["en"].amount;
  document.getElementById("amount").placeholder = translations[lang].enterAmount + " / " + translations["en"].enterAmount;
  document.getElementById("send").innerText = translations[lang].send + " / " + translations["en"].send;
  document.getElementById("back").innerText = "← " + translations[lang].back + " / " + translations["en"].back;
}

function showTransferSection() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("transferSection").style.display = "block";
  getWalletBalance();
}

function goBack() {
  document.getElementById("transferSection").style.display = "none";
  document.getElementById("startBtn").style.display = "block";
}

async function getWalletBalance() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const balance = await web3.eth.getBalance(accounts[0]);
    const ethBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById("wallet-balance").innerText = `Wallet Balance: ${ethBalance} ETH`;
  }
}

function sendTransaction() {
  const recipient = document.getElementById("recipient").value;
  const amount = document.getElementById("amount").value;

  if (!Web3.utils.isAddress(recipient)) {
    alert("地址格式不正確 / Invalid address format");
    return;
  }

  alert(`模擬轉帳成功：\nTo: ${recipient}\nAmount: ${amount} MXN`);
}