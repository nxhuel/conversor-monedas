const apiUrl = 'https://economia.awesomeapi.com.br/last';

document.getElementById('convertBtn').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    alert('Por favor, introduzca un monto válido.');
    return;
  }

  loading.classList.remove('hidden');
  result.textContent = '';

  fetch(`${apiUrl}/${fromCurrency}-${toCurrency}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const key = `${fromCurrency}${toCurrency}`;
      const rate = data[key]?.high;

      if (rate) {
        const convertedAmount = (amount * parseFloat(rate)).toFixed(2);
        result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } else {
        result.textContent = 'Tasa de conversión no disponible.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Se ha producido un error. Inténtalo de nuevo más tarde.');
    })
    .finally(() => {
      loading.classList.add('hidden');
    });
});