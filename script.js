async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      document.getElementById('balance').textContent = '0 MXN'; // simulate balance
    } catch (error) {
      console.error("Connection error:", error);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

document.getElementById('connect').addEventListener('click', connectWallet);

document.getElementById('send').addEventListener('click', function () {
  const recipient = document.getElementById('recipient').value;
  const amount = document.getElementById('amount').value;
  if (recipient && amount) {
    const list = document.getElementById('history');
    const item = document.createElement('li');
    item.textContent = `Sent ${amount} MXN to ${recipient}`;
    list.appendChild(item);
  }
});
