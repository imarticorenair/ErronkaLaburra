// COCKIE-A HASIERATU
let cookie = new Cookie();

// HOBEKUNTZAK HASIERATU
let upgrades = [
    new Upgrade("Kurtsorea", 10, 0.1),
    new Upgrade("Amona", 100, 10),
    new Upgrade("Baserria", 1000, 20),
    new Upgrade("Meatze", 5000, 100)
];

function displayUpgrades() {
    let upgradeButtonsDiv = document.getElementById("upgradeButtons");
    upgradeButtonsDiv.innerHTML = '';
    upgrades.forEach(upgrade => {
        let button = document.createElement("button");
        button.innerText = `${upgrade.name} (${upgrade.getCost()} gaileta)`;
        button.onclick = () => buyUpgrade(upgrade);
        upgradeButtonsDiv.appendChild(button);
    });
}

function addCookie() {
    cookie.addCookie();
}

function buyUpgrade(upgrade) {
    let cost = upgrade.getCost();
    if (cookie.cookieCount >= cost) {
        cookie.cookieCount -= cost;
        cookie.productionRate += upgrade.buy();
        cookie.updateDisplay();
        displayUpgrades();
        alert(`${upgrade.name} erosi duzu!`);
    } else {
        alert("Ez duzu nahikoa gailetarik!");
    }
}

setInterval(() => {
    cookie.produceCookies();
}, 1000);

displayUpgrades();