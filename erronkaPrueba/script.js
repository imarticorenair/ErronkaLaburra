const cookie = new Cookie();
const upgrades = [
    new Upgrade("Kurtsore automatikoa", 10, 1),
    new Upgrade("Amasadorea", 50, 5),
    new Upgrade("Fabrika", 100, 20),
    new Upgrade("Amona", 500, 100)
];

function displayUpgrades() {
    const upgradeButtonsDiv = document.getElementById("upgradeButtons");
    upgradeButtonsDiv.innerHTML = ''; // Clear previous buttons
    upgrades.forEach(upgrade => {
        const button = document.createElement("button");
        button.innerText = `${upgrade.name} (${upgrade.getCost()} gaileta)`;
        button.onclick = () => buyUpgrade(upgrade);
        upgradeButtonsDiv.appendChild(button);
    });
}

function addCookie() {
    cookie.addCookie(); // Call addCookie on cookie object
}

function buyUpgrade(upgrade) {
    const cost = upgrade.getCost();
    if (cookie.cookieCount >= cost) {
        cookie.cookieCount -= cost; // Deduct cost from cookie count
        cookie.productionRate += upgrade.buy(); // Update production rate
        cookie.updateDisplay(); // Update display
        displayUpgrades(); // Refresh upgrade buttons
        alert(`${upgrade.name} erosi duzu!`);
    } else {
        alert("Ez duzu nahikoa gailetarik!"); // Not enough cookies alert
    }
}

setInterval(() => {
    cookie.produceCookies(); // Call produceCookies every second
}, 1000);

displayUpgrades(); // Initialize upgrade buttons
