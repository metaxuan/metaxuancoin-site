
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
    "tokenBalance": "MXN Balance"
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
    "balance": "錢包餘額",
    "connect": "連接錢包",
    "connected": "錢包已連接",
    "network": "網路",
    "ethBalance": "ETH 餘額",
    "tokenBalance": "MXN 餘額"
  }
};

let currentLang = "en";
let selectedAccount = null;
let web3 = null;
const tokenAddress = "0x8CCAe437408C07A54a1b574894E2C541160Bbfed"; // MXN 合約
const tokenABI = [
  { "constant": true, "inputs": [{"name":"_owner","type":"address"}], "name": "balanceOf", "outputs": [{"name":"balance","type":"uint256"}], "type": "function" },
  { "constant": true, "inputs": [], "name": "decimals", "outputs": [{"name":"","type":"uint8"}], "type": "function" }
];

function changeLanguage() {
  const lang = document.getElementById("language").value;
  currentLang = lang;
  const t = translations[lang] || translations["en"];
  const en = translations["en"];

  document.getElementById("startBtn").innerText = t.start;
  document.getElementById("title").innerText = t.title;
  document.getElementById("label-address").innerText = `${t.address} / ${en.address}`;
  document.getElementById("recipient").placeholder = `${t.enterAddress} / ${en.enterAddress}`;
  document.getElementById("label-amount").innerText = `${t.amount} / ${en.amount}`;
  document.getElementById("amount").placeholder = `${t.enterAmount} / ${en.enterAmount}`;
  document.getElementById("send").innerText = `${t.send} / ${en.send}`;
  document.getElementById("back").innerText = `← ${t.back} / ${en.back}`;

  updateWalletDisplay();
}

function showTransferSection() {
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("transferSection").style.display = "block";
  updateWalletDisplay();
}

function goBack() {
  document.getElementById("transferSection").style.display = "none";
  document.getElementById("startBtn").style.display = "block";
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      selectedAccount = accounts[0];
      web3 = new Web3(window.ethereum);
      updateWalletDisplay();
    } catch (err) {
      alert("Wallet connection rejected.");
    }
  } else {
    alert("MetaMask not detected");
  }
}

async function updateWalletDisplay() {
  if (!web3 || !selectedAccount) {
    document.getElementById("wallet-balance").innerText = translations[currentLang].connect;
    return;
  }
  const t = translations[currentLang];

  try {
    const ethBalanceWei = await web3.eth.getBalance(selectedAccount);
    const ethBalance = web3.utils.fromWei(ethBalanceWei, 'ether');

    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
    const decimals = await tokenContract.methods.decimals().call();
    const tokenBalanceRaw = await tokenContract.methods.balanceOf(selectedAccount).call();
    const tokenBalance = tokenBalanceRaw / (10 ** decimals);

    document.getElementById("wallet-balance").innerText =
      `${t.ethBalance}: ${ethBalance} ETH | ${t.tokenBalance}: ${tokenBalance} MXN`;
  } catch (e) {
    console.error("Balance error:", e);
    document.getElementById("wallet-balance").innerText = "Error loading balances";
  }
}

function sendTransaction() {
  const recipient = document.getElementById("recipient").value;
  const amount = document.getElementById("amount").value;

  if (!web3.utils.isAddress(recipient)) {
    alert("地址格式不正確 / Invalid address format");
    return;
  }

  alert(`模擬轉帳成功：\nTo: ${recipient}\nAmount: ${amount} MXN`);
}

window.addEventListener("DOMContentLoaded", () => {
  const userLang = navigator.language || navigator.userLanguage;
  const supportedLangs = Object.keys(translations);
  const defaultLang = supportedLangs.includes(userLang) ? userLang : "en";
  document.getElementById("language").value = defaultLang;
  changeLanguage();

  document.getElementById("wallet-balance").addEventListener("click", connectWallet);
});