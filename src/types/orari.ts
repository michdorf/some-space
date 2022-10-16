export default class Orari {
    private data;
    constructor(oraDiInizio: `${number}:${number}`, oraDiFine: `${number}:${number}`) {
        this.data = [oraDiInizio.split(":").map((o) => parseInt(o)),oraDiFine.split(":").map((o) => parseInt(o))];
    }

    get value() {
        return this.data;
    }
}