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

// Upgradeak pantailan agertzen dira
function displayUpgrades() {
    let upgradeButtonsDiv = document.getElementById("upgradeButtons");
    upgradeButtonsDiv.innerHTML = '';
    for (let upgrade of upgrades) {
        let button = document.createElement("button");
        button.innerText = `${upgrade.name}: ${upgrade.getCost()} 🍪 lvl: ${upgrade.level}`;
        button.onclick = function() { 
            buyUpgrade(upgrade); 
        };
        button.id = upgrade.name; 
        upgradeButtonsDiv.appendChild(button);
    }    
}

// Powerup erabiltzeko behar diren aldagaiak sortu
let goldenCount = false;  
let goldenActive = false;

let dyamondCount = false;
let dyamondActive = false;

let rubyCount = false;
let rubyActive = false;

// click egitean balioa aldatzeko
function addCookie() {
    if (goldenActive) {
        cookie.cookieCount += 10;  
        updateCookieDisplay();  
    } else if (dyamondActive) {
        cookie.cookieCount += 500;  
        updateCookieDisplay();  
    } else if (rubyActive) {
        cookie.cookieCount += 1000;  
        updateCookieDisplay();  
    } else {
        cookie.addCookie();  
    }

    let soinua = document.getElementById('soinua');
    soinua.play();

    updateCookieDisplay();  
    saveProgress(); 
}

function goldenCoockie() {
    if (cookie.cookieCount >= 1000) {  
        if (!goldenCount) {
            goldenCount = true;
            goldenActive = true;  
            alert("Golden cookie aktibatuta! ");
    
            setTimeout(() => {
                goldenActive = false;  
                console.log("1min bonifikazioa bukatu da");
            }, 100000);
        } else {
            alert("Kontuz, golden coockie behin bakarrik erabili dezakezu!")
        } 
    } else {
        alert("Kontuz, golden cookie-a 1000 coockie baino gehiago dituzunean erabili dezakezu");
    }
}

function dyamondCoockie() {
    if (cookie.cookieCount >= 25000) {  
        if (!dyamondCount) {
            dyamondCount = true;
            dyamondActive = true;  
            alert("Dyamond cookie aktibatuta! ");
    
            setTimeout(() => {
                dyamondActive = false;  
                console.log("30s bonifikazioa bukatu da");
            }, 30000);
        } else {
            alert("Kontuz, Dyamond coockie behin bakarrik erabili dezakezu!")
        } 
    } else {
        alert("Kontuz, Dyamond cookie-a 25000 coockie baino gehiago dituzunean erabili dezakezu");
    }
}

function rubyCoockie() {
    if (cookie.cookieCount >= 50000) {  
        if (!rubyCount) {
            rubyCount = true;
            rubyActive = true;  
            alert("Ruby cookie aktibatuta! ");
    
            setTimeout(() => {
                rubyActive = false;  
                console.log("15s bonifikazioa bukatu da");
            }, 15000);
        } else {
            alert("Kontuz, Ruby coockie behin bakarrik erabili dezakezu!")
        } 
    } else {
        alert("Kontuz, Ruby cookie-a 50000 coockie baino gehiago dituzunean erabili dezakezu");
    }
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

// Segunduro datuak gordetze ditu
setInterval(() => {
    cookie.produceCookies();
    saveProgress();
    updateCookieDisplay();
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
    localStorage.setItem('goldenCoockie', goldenCount); // Golden coockia erabili den gorde
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
    document.getElementById('coockie').innerHTML = "🍪";
    if (cookie.cookieCount >= 1000000) {
        document.getElementById('coockie').style.backgroundImage = "url('../img/sorpresa.png')";
    } else {
        document.getElementById('coockie').style.backgroundImage = "";
        document.getElementById('coockie').innerHTML = "🍪";
    }
}

function clearStorage() {
    localStorage.clear();

    cookie.cookieCount = 0;
    cookie.productionRate = 0;
    goldenCount = false;

    for (let upgrade of upgrades) {
        upgrade.level = 0;
        upgrade.quantity = 0;

        if (upgrade.name === "Kurtsorea") {
            upgrade.cost = 10;
        } else if (upgrade.name === "Amona") {
            upgrade.cost = 100;
        } else if (upgrade.name === "Baserria") {
            upgrade.cost = 1000;
        } else if (upgrade.name === "Meatze") {
            upgrade.cost = 5000;
        }
    }

    console.log("Guztia borratu da");
    alert("Dirudi coockien moustroa, gaileta guztiak lapurtu dituela, kontuz izan!");

    cookie.updateDisplay();
    updateCookieDisplay();
    displayUpgrades();
}

displayUpgrades();