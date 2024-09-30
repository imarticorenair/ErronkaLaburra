class Ekoizpena {
    constructor(izena, kopurua, ekoizpenOinarria, kostuOinarria, hobekuntzaFuntzionala) {
        this.izena = izena;
        this.kopurua = kopurua;
        this.ekoizpenOinarria = ekoizpenOinarria;
        this.kostuOinarria = kostuOinarria;
        this.hobekuntzaFuntzionala = hobekuntzaFuntzionala;
    }

    // kostua = kostuOinarria x 1,15^n || n = kopurua
    kostuaKalkulatu () {
        return Math.floor(this.kostuOinarria * Math.pow(1.15, this.kopurua));
    }

    // Ekoizpena kalkulatu (segundu)
    kalkulatuEkoizpena() {
        return this.kopurua * this.ekoizpenOinarria;
    }

    // Erosi eta eguneratu kostua
    erosi (gailetaKopurua) {
        let kostua = this.kostuaKalkulatu();
        if (gailetaKopurua >= kostua) {
            this.kopurua++;
            return kostua;
        } else {
            return 0;
        }
    }

    
}