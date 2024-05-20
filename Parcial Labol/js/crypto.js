import {CryptoBase} from "/cryptoBase.js";

class Crypto extends CryptoBase {
    constructor(id, nombre, simbolo, fechaCreacion, precioActual, tipoConsenso, algoritmo) {
        super(id, nombre, simbolo, fechaCreacion, precioActual);
        this.tipoConsenso = tipoConsenso;
        this.algoritmo = algoritmo;
    }
}

export{Crypto};
