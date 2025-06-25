
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected account:', accounts[0]);
      document.getElementById('balance').innerText = '100 MXN';  // 模擬餘額
    } catch (error) {
      console.error('User denied account access');
    }
  } else {
    alert('Please install MetaMask!');
  }
}

function sendTokens() {
  const recipient = document.getElementById('recipient').value;
  const amount = document.getElementById('amount').value;
  alert(`Sending ${amount} MXN to ${recipient}`);
}
