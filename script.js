const tokenAddress = "0x8CCAE437408C07A54a1b574894E2C541160Bbfed";
const tokenABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)"
];

let provider, signer, contract;

async function connectWallet() {
  if (!window.ethereum) {
    alert("請先安裝 MetaMask");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  const address = await signer.getAddress();

  contract = new ethers.Contract(tokenAddress, tokenABI, signer);
  const balance = await contract.balanceOf(address);
  const decimals = await contract.decimals();
  const formatted = ethers.utils.formatUnits(balance, decimals);
  document.getElementById("balance").innerText = formatted + " MXN";
}

async function sendToken() {
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;
  const decimals = await contract.decimals();
  const value = ethers.utils.parseUnits(amount, decimals);

  try {
    const tx = await contract.transfer(to, value);
    await tx.wait();
    alert("✅ 傳送成功！");
    addHistory(to, amount);
  } catch (err) {
    alert("❌ 發送失敗: " + err.message);
  }
}

function addHistory(to, amount) {
  const ul = document.getElementById("txHistory");
  const li = document.createElement("li");
  li.innerText = `Sent ${amount} MXN to ${to}`;
  ul.prepend(li);
}

fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=mxn")
  .then((res) => res.json())
  .then((data) => {
    const rate = data.tether.mxn;
    document.getElementById("rate").innerText = `MXN/USDT Rate: ${rate}`;
  });