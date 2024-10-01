class Cookie {
    constructor() {
        this.cookieCount = 0;
        this.productionRate = 0;
    }

    addCookie() {
        this.cookieCount += 1;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById("cookieCount").innerText = this.cookieCount;
        document.getElementById("productionRate").innerText = this.productionRate;
    }

    produceCookies() {
        this.cookieCount += this.productionRate;
        this.updateDisplay();
    }
}
