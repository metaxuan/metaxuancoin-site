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