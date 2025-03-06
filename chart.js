const ctx = document.getElementById('priceChart').getContext('2d');

async function fetchChartData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7");
    const data = await response.json();

    const labels = data.prices.map(item => new Date(item[0]).toLocaleDateString());
    const prices = data.prices.map(item => item[1]);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'BTC Price (Last 7 Days)',
                data: prices,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        }
    });
}

fetchChartData();
