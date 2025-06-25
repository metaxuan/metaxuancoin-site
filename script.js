let provider, signer, contract;

const tokenAddress = "0x8CCAe437408C07A54a1b574894E2C541160Bbfed";
const tokenABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(tokenAddress, tokenABI, signer);
  updateBalance();
}

async function updateBalance() {
  const address = await signer.getAddress();
  const balance = await contract.balanceOf(address);
  const decimals = await contract.decimals();
  const formatted = ethers.utils.formatUnits(balance, decimals);
  document.getElementById("balance").innerText = formatted;
}

async function sendToken() {
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;
  const decimals = await contract.decimals();
  const value = ethers.utils.parseUnits(amount, decimals);
  try {
    const tx = await contract.transfer(to, value);
    await tx.wait();
    logTransaction(tx.hash);
    updateBalance();
  } catch (err) {
    alert("Transfer failed: " + err.message);
  }
}

function logTransaction(hash) {
  const li = document.createElement("li");
  li.innerHTML = `<a href="https://testnet.bscscan.com/tx/${hash}" target="_blank">${hash}</a>`;
  document.getElementById("txHistory").appendChild(li);
}

fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether,mx-token&vs_currencies=usd")
  .then(res => res.json())
  .then(data => {
    const mxnRate = data["mx-token"]?.usd || "N/A";
    document.getElementById("mxnRate").innerText = mxnRate;
  });
