const startBtn = document.getElementById("start-btn");
const transferUI = document.getElementById("transfer-interface");
const backBtn = document.getElementById("backBtn");
const sendBtn = document.getElementById("sendBtn");
const toAddress = document.getElementById("toAddress");
const amount = document.getElementById("amount");
const languageSelect = document.getElementById("language-select");
const themeToggle = document.getElementById("theme-toggle");
const walletAddress = document.getElementById("wallet-address");
const walletBalance = document.getElementById("wallet-balance");

let translations = {
  en: {
    recipient: "Recipient Address",
    amount: "Amount",
    send: "Send"
  },
  "zh-TW": {
    recipient: "接收地址",
    amount: "轉帳金額",
    send: "轉帳"
  },
  "zh-CN": {
    recipient: "接收地址",
    amount: "转账金额",
    send: "转账"
  },
  ja: {
    recipient: "受信者アドレス",
    amount: "金額",
    send: "送金"
  },
  ko: {
    recipient: "수신자 주소",
    amount: "보낼 금액",
    send: "보내기"
  },
  es: {
    recipient: "Dirección del destinatario",
    amount: "Cantidad",
    send: "Enviar"
  },
  th: {
    recipient: "ที่อยู่ผู้รับ",
    amount: "จำนวนเงิน",
    send: "โอน"
  }
};

function updateTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    let key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key] || key;
  });
}

languageSelect.addEventListener("change", () => {
  updateTranslations(languageSelect.value);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  transferUI.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
  transferUI.classList.add("hidden");
  startBtn.style.display = "block";
});

sendBtn.addEventListener("click", async () => {
  const to = toAddress.value.trim();
  const value = amount.value.trim();
  if (!/^0x[a-fA-F0-9]{40}$/.test(to)) {
    alert("地址格式錯誤 / Invalid address format");
    return;
  }
  if (!window.ethereum) {
    alert("請安裝 MetaMask");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  try {
    const tx = await signer.sendTransaction({
      to,
      value: ethers.utils.parseEther(value)
    });
    alert("已發送交易: " + tx.hash);
  } catch (e) {
    alert("錯誤: " + e.message);
  }
});

async function updateWallet() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    walletAddress.textContent = address;
    walletBalance.textContent = `${ethers.utils.formatEther(balance)} MXN`;
  }
}

window.addEventListener("load", updateWallet);