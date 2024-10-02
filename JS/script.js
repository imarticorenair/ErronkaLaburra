// COOCKIE HASIERATU
let cookie = new Cookie();
loadProgress();

// HOBEKUNTZAK HASIERATU
let upgrades = [
    new Upgrade("Kurtsorea", 10, 0.1),
    new Upgrade("Amona", 100, 10),
    new Upgrade("Baserria", 1000, 20),
    new Upgrade("Meatze", 5000, 100)
];

// Gordeta zerbaita badago berresuratu
loadUpgradeProgress();

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
    saveProgress();
}

function buyUpgrade(upgrade) {
    let cost = upgrade.getCost();
    if (cookie.cookieCount >= cost) {
        cookie.cookieCount -= cost;
        cookie.productionRate += upgrade.buy();
        upgrade.addLevel();
        cookie.updateDisplay();
        displayUpgrades();
        saveProgress();
        console.log(`${upgrade.name} erosi duzu!`);
    } else {
        console.log("Ez duzu nahikoa gailetarik!");
        alert("Ez duzu nahikoa gailetarik!");
    }
}


setInterval(() => {
    cookie.produceCookies();
    saveProgress();
}, 1000);

function aldatuIzena() {
    let izena = prompt("Sartu zure okindegiaren izena");
    console.log(izena);
    document.getElementById('tituloa').innerHTML = izena + " okindegia";
    localStorage.setItem('okindegiareIzena', izena); // Izena gorde
}

function saveProgress() {
    localStorage.setItem('gailetak', cookie.cookieCount);  // Gaileten zenbakia gorde
    localStorage.setItem('produkzioa', cookie.productionRate);  // Produkzioa gorde
    // Mailak gorde
    for (let upgrade of upgrades) {
        localStorage.setItem(upgrade.name + '_level', upgrade.level);
    }
}

function loadProgress() {
    let gailetakGorde = localStorage.getItem('gailetak');
    let produkzioaGorde = localStorage.getItem('produkzioa');
    let izenaGorde = localStorage.getItem('okindegiareIzena');
    
    if (gailetakGorde !== null) {
        cookie.cookieCount = parseInt(gailetakGorde);
    }
    
    if (produkzioaGorde !== null) {
        cookie.productionRate = parseFloat(produkzioaGorde);
    }

    if (izenaGorde !== null) {
        document.getElementById('tituloa').innerHTML = izenaGorde + " okindegia";
    }
}

function loadUpgradeProgress() {
    for (let upgrade of upgrades) {
        let savedLevel = localStorage.getItem(upgrade.name + '_level');
        if (savedLevel !== null) {
            upgrade.level = parseInt(savedLevel);
        }
    }
}

displayUpgrades();