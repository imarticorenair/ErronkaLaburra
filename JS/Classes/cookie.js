class Cookie {
    constructor() {
        this.cookieCount = 0;
        this.productionRate = 0;
    }

    addCookie() {
        this.cookieCount++;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById("cookieCount").innerText = this.cookieCount.toFixed(0);
        document.getElementById("productionRate").innerText = this.productionRate.toFixed(1);
    }

    produceCookies() {
        this.cookieCount += this.productionRate;
        this.updateDisplay();
    }
}