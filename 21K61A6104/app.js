function convert() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    // Perform currency conversion logic here (you can use an API or predefined rates)

    // For simplicity, just displaying the converted amount in the result paragraph
    const result = `Converted Amount: ${amount} ${fromCurrency} = ${amount} ${toCurrency}`;
    document.getElementById('result').innerText = result;

    // Sending data to the server for storage
    fetch('http://localhost:3000/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            amount: amount,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            convertedAmount: result,
        }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}
