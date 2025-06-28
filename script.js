
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
    "balance": "Wallet Balance",
    "connect": "Connect Wallet",
    "connected": "Wallet Connected",
    "network": "Network",
    "ethBalance": "ETH Balance",
    "tokenBalance": "MXN Balance",
    "visionBtn": "🌍 View Vision",
    "visionBack": "🔙 Back",
    "visionShort": "Listening to the world's voices with compassion and wisdom.",
    "visionMedium": "MetaXuan Coin is a light that connects hearts, allowing goodwill to flow across borders. We believe that every act of kindness can make a difference in the world.",
    "visionLong": "MetaXuan Coin is a global decentralized asset inspired by the mantra 'ॐ मणि पद्मे हूं'. We aim to promote fair distribution of resources and transparent charity, using blockchain technology to empower sustained support for vulnerable communities."
  },
  "zh-TW": {
    "start": "開始轉帳",
    "title": "玄元幣",
    "address": "接收地址",
    "amount": "轉帳金額",
    "enterAddress": "請輸入接收地址",
    "enterAmount": "請輸入金額",
    "send": "轉帳",
    "back": "返回",
    "balance": "錢包餘額",
    "connect": "連接錢包",
    "connected": "錢包已連接",
    "network": "網路",
    "ethBalance": "ETH 餘額",
    "tokenBalance": "MXN 餘額",
    "visionBtn": "🌍 觀看願景",
    "visionBack": "🔙 返回",
    "visionShort": "傾聽世間的聲音，並以慈悲與智慧，回應每一份需要。",
    "visionMedium": "玄元幣是一道連接人心的光，讓全球的善意無國界地流動。我們相信，每一份溫柔的力量，都能改變世界的角落。",
    "visionLong": "玄元幣（MetaXuan Coin）是一項全球性去中心化資產，致力於促進公平的資源分配與慈善透明。我們以六字大明咒「ॐ मणि पद्मे हूं」的精神為靈感，結合區塊鏈技術，讓每一筆善意都被看見、被記錄、被放大，為全球弱勢族群建立可持續支持的能量網絡。"
  }
  // ...省略其他語言以節省篇幅，可根據需要擴充
};

let currentLang = "en";
let selectedAccount = null;
let web3 = null;
const tokenAddress = "0x8CCAe437408C07A54a1b574894E2C541160Bbfed";
const tokenABI = [
  { "constant": true, "inputs": [{"name":"_owner","type":"address"}], "name": "balanceOf", "outputs": [{"name":"balance","type":"uint256"}], "type": "function" },
  { "constant": true, "inputs": [], "name": "decimals", "outputs": [{"name":"","type":"uint8"}], "type": "function" }
];

function changeLanguage() {
  const lang = document.getElementById("language").value;
  currentLang = lang;
  const t = translations[lang] || translations["en"];

  document.getElementById("startBtn").innerText = t.start;
  document.getElementById("title").innerText = t.title;
  document.getElementById("label-address").innerText = t.address;
  document.getElementById("recipient").placeholder = t.enterAddress;
  document.getElementById("label-amount").innerText = t.amount;
  document.getElementById("amount").placeholder = t.enterAmount;
  document.getElementById("send").innerText = t.send;
  document.getElementById("back").innerText = `← ${t.back}`;
  document.getElementById("showVisionBtn").innerText = t.visionBtn;
  updateVisionText(t);
  updateWalletDisplay();
}

function updateVisionText(t) {
  document.querySelector(".vision-short p").innerText = t.visionShort;
  document.querySelector(".vision-medium p").innerText = t.visionMedium;
  document.querySelector(".vision-long p").innerText = t.visionLong;
}

function showVision() {
  const vision = document.getElementById("vision");
  const btn = document.getElementById("showVisionBtn");
  const t = translations[currentLang];

  if (vision.style.display === "none" || vision.style.display === "") {
    vision.style.display = "block";
    document.getElementById('startBtn').classList.add('btn-lower');
    btn.innerText = t.visionBack;
    vision.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    vision.style.display = "none";
    document.getElementById('startBtn').classList.remove('btn-lower');
    btn.innerText = t.visionBtn;
  }
}

// 其餘功能保持不變，如 updateWalletDisplay、connectWallet、sendTransaction 等

