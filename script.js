const tokenAddress = "0x8CCAe437408C07A54a1b574894E2C541160Bbfed"; // MXN contract
const tokenABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

let provider, signer, contract;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(tokenAddress, tokenABI, signer);
    updateBalance();
  } else {
    alert("Please install MetaMask!");
  }
}

async function updateBalance() {
  const address = await signer.getAddress();
  const balance = await contract.balanceOf(address);
  const decimals = await contract.decimals();
  document.getElementById("balance").innerText = ethers.utils.formatUnits(balance, decimals);
}

async function sendToken() {
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;
  const decimals = await contract.decimals();
  const value = ethers.utils.parseUnits(amount, decimals);
  const tx = await contract.transfer(to, value);
  await tx.wait();
  updateBalance();
  addTransaction(to, amount);
}

function addTransaction(to, amount) {
  const list = document.getElementById("txHistory");
  const item = document.createElement("li");
  item.textContent = `Sent ${amount} MXN to ${to}`;
  list.prepend(item);
}

fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd")
  .then(res => res.json())
  .then(data => {
    const rate = (1 / 0.427).toFixed(2); // 假設：1 USDT = 0.427 USD
    document.getElementById("rateValue").innerText = rate;
  });