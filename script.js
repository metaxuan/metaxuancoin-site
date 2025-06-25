
const connectBtn = document.getElementById('connect');
const walletAddress = document.getElementById('walletAddress');
const sendBtn = document.getElementById('send');
const recipientInput = document.getElementById('recipient');
const amountInput = document.getElementById('amount');
const balanceText = document.getElementById('balance');
const statusText = document.getElementById('status');
const historyList = document.getElementById('historyList');
const rateText = document.getElementById('rate');

let provider, signer, contract;
const contractAddress = "0x8CCAe437408C07A54a1b574894E2C541160Bbfed";
const abi = [ ... ]; // Replace with your actual ABI here

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        statusText.textContent = "MetaMask not detected.";
        return;
    }
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    walletAddress.textContent = `Connected: ${address}`;
    contract = new ethers.Contract(contractAddress, abi, signer);
    fetchBalance();
}

async function fetchBalance() {
    try {
        const address = await signer.getAddress();
        const balance = await contract.balanceOf(address);
        balanceText.textContent = ethers.utils.formatUnits(balance, 18);
    } catch (error) {
        statusText.textContent = "Unable to fetch balance.";
    }
}

async function sendTokens() {
    try {
        const to = recipientInput.value;
        const amount = ethers.utils.parseUnits(amountInput.value, 18);
        const tx = await contract.transfer(to, amount);
        statusText.textContent = "Transaction sent...";
        await tx.wait();
        statusText.textContent = "Transaction successful!";
        fetchBalance();
        addToHistory(tx.hash, to, amountInput.value);
    } catch (error) {
        statusText.textContent = "Transaction failed.";
    }
}

function addToHistory(txHash, to, amount) {
    const item = document.createElement('li');
    item.textContent = `Sent ${amount} MXN to ${to.slice(0,6)}... Tx: ${txHash.slice(0,10)}...`;
    historyList.prepend(item);
}

async function fetchRate() {
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
        const data = await res.json();
        rateText.textContent = `1 MXN ≈ ${data.tether.usd} USDT`;
    } catch {
        rateText.textContent = "Unavailable";
    }
}

connectBtn.addEventListener('click', connectWallet);
sendBtn.addEventListener('click', sendTokens);
fetchRate();
