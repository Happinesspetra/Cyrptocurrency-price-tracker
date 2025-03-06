const apiURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false";

// Fetch crypto prices
async function fetchCryptoData() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        let cards = "";
        data.forEach(coin => {
            cards += `
                <div class="col">
                    <div class="crypto-card">
                        <img src="${coin.image}" alt="${coin.name}" width="50">
                        <h5>${coin.name} (${coin.symbol.toUpperCase()})</h5>
                        <p>Price: $${coin.current_price.toFixed(2)}</p>
                        <p>24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                </div>
            `;
        });
        document.getElementById("cryptoCards").innerHTML = cards;
    } catch (error) {
        console.error("Error fetching crypto data:", error);
    }
}

// Convert BTC to other currencies
async function convertCurrency() {
    const btcAmount = document.getElementById("btcAmount").value;
    const currency = document.getElementById("currency").value;

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`);
        const data = await response.json();

        const converted = (btcAmount * data.bitcoin[currency]).toFixed(2);
        document.getElementById("convertedAmount").innerText = `${converted} ${currency.toUpperCase()}`;
    } catch (error) {
        console.error("Error converting currency:", error);
    }
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save user preference to localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// Apply saved theme on page load
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};

// Portfolio Tracker
document.getElementById("add-portfolio").addEventListener("click", () => {
    const coinSymbol = document.getElementById("portfolio-input").value.toLowerCase();
    if (coinSymbol) {
        const listItem = document.createElement("li");
        listItem.textContent = coinSymbol.toUpperCase();
        listItem.classList.add("list-group-item");
        document.getElementById("portfolio-list").appendChild(listItem);
        document.getElementById("portfolio-input").value = "";
    }
});


// Scroll Up Button
const scrollUpBtn = document.getElementById("scrollUpBtn");
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollUpBtn.style.display = "block";
    } else {
        scrollUpBtn.style.display = "none";
    }
});
scrollUpBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fetch Crypto News with Clickable Links
async function fetchNews() {
    try {
        const response = await fetch("https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=68f65a4e0eaf423ca84f1d37acc082b1");
        const data = await response.json();
        let newsHTML = "";

        data.articles.slice(0, 5).forEach(item => {
            newsHTML += `
                <div class="news-item">
                    <a href="${item.url}" target="_blank">
                        <strong>${item.source.name}</strong>: ${item.title}
                    </a>
                </div>
            `;
        });

        document.getElementById("news").innerHTML = newsHTML;
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

// Load Data
fetchCryptoData();
fetchNews();
