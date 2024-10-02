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
    for (let upgrade of upgrades) {
        let button = document.createElement("button");
        button.innerText = `${upgrade.name}: ${upgrade.getCost()} 🍪 lvl: ${upgrade.level}`;
        button.onclick = () => buyUpgrade(upgrade);
        button.id = upgrade.name; 
        upgradeButtonsDiv.appendChild(button);
    }    
}


function addCookie() {
    cookie.addCookie();
}

function buyUpgrade(upgrade) {
    let cost = upgrade.getCost();
    if (cookie.cookieCount >= cost) {
        cookie.cookieCount -= cost;
        cookie.productionRate += upgrade.buy();
        upgrade.addLevel();
        cookie.updateDisplay();
        displayUpgrades();
        console.log(`${upgrade.name} erosi duzu!`);
    } else {
        console.log("Ez duzu nahikoa gailetarik!");
        alert("Ez duzu nahikoa gailetarik!");
    }
}


setInterval(() => {
    cookie.produceCookies();
}, 1000);

function aldatuIzena() {
    let izena = prompt("Sartu zure okindegiaren izena");
    console.log(izena);

    document.getElementById('tituloa').innerHTML = izena + " okindegia";

    
}

displayUpgrades();