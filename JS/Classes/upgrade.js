class Upgrade {
    constructor(name, baseCost, production) {
        this.name = name;
        this.baseCost = baseCost;
        this.production = production;
        this.quantity = 0;
        this.level = 0;
    }

    getCost() {
        return Math.floor(this.baseCost * Math.pow(1.15, this.quantity));
    }

    buy() {
        this.quantity += 1;
        return this.production;
    }

    addLevel() {
        this.level++;
    }
}