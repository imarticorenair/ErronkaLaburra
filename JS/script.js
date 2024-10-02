// COOCKIE HASIERATU
let cookie = new Cookie();
loadProgress();
updateCookieDisplay(); // Check the cookie count immediately after loading progress

// HOBEKUNTZAK HASIERATU
let upgrades = [
    new Upgrade("Kurtsorea", 10, 0.1),
    new Upgrade("Amona", 100, 10),
    new Upgrade("Baserria", 1000, 20),
    new Upgrade("Meatze", 5000, 100)
];

// Gordeta dagoen upgradeak berreskuratu
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
    updateCookieDisplay(); // Update the display each time a cookie is added
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
    updateCookieDisplay(); // Update display regularly
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
        localStorage.setItem(upgrade.name + 'level', upgrade.level);
        localStorage.setItem(upgrade.name + "cost", upgrade.quantity);
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

    console.log(gailetakGorde);
    console.log(produkzioaGorde);
    console.log(izenaGorde);
}

function loadUpgradeProgress() {
    for (let upgrade of upgrades) {
        let mailaGorde = localStorage.getItem(upgrade.name + 'level');
        let kostuaGorde = localStorage.getItem(upgrade.name + 'cost');
        if (mailaGorde !== null) {
            upgrade.level = parseInt(mailaGorde);
            console.log(mailaGorde);
        }
        if (kostuaGorde != null) {
            upgrade.quantity = parseInt(kostuaGorde);
            console.log(kostuaGorde);
        }
    }
}

function updateCookieDisplay() {
    // Check the cookie count and update the display accordingly
    if (cookie.cookieCount >= 100000) {
        document.getElementById('coockie').style.backgroundImage = "url('../img/sorpresa.png')";
    } else {
        document.getElementById('coockie').style.backgroundImage = ""; // Reset background image
        document.getElementById('coockie').innerHTML = "🍪"; // Default display
    }
}


function clearStorage() {
    localStorage.clear(); 

    cookie.cookieCount = 0;
    cookie.productionRate = 0;

    for (let upgrade of upgrades) {
        upgrade.quantity = 0; 
        upgrade.level = 0; 
    }

    console.log("Guztia borratu da");
    alert("Dirudi coockien moustroa, gaileta guztiak lapurtu dituela, kontuz izan!")
    cookie.updateDisplay();
    updateCookieDisplay();
}




displayUpgrades();