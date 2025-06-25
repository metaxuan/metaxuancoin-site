
function sendTokens() {
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;
    document.getElementById('status').textContent = `Sending ${amount} tokens to ${recipient}...`;
}
