
const tokenAddress = "0x8CCAe437408C07A54a1b574894E2C541160Bbfed";
const tokenABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)"
];

let provider;
let signer;
let contract;

async function init() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById("userAddress").textContent = address;

    contract = new ethers.Contract(tokenAddress, tokenABI, signer);
    updateBalance();
  } else {
    alert("請先安裝 MetaMask！");
  }
}

async function updateBalance() {
  const address = await signer.getAddress();
  const balance = await contract.balanceOf(address);
  document.getElementById("balance").textContent = ethers.utils.formatUnits(balance, 18) + " MXN";
}

async function sendToken() {
  const to = document.getElementById("toAddress").value;
  const amount = document.getElementById("amount").value;

  if (!ethers.utils.isAddress(to)) {
    alert("無效的地址！");
    return;
  }

  try {
    const tx = await contract.transfer(to, ethers.utils.parseUnits(amount, 18));
    await tx.wait();
    alert("轉帳成功！");
    updateBalance();
  } catch (error) {
    alert("錯誤：" + (error.reason || error.message));
  }
}

window.onload = init;
