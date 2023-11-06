"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Korisnik = new Schema({
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    imejl: {
        type: String
    },
    licenca: {
        type: String
    },
    specijalizacija: {
        type: String
    },
    ogranak: {
        type: String
    },
    tip: {
        type: String
    },
    slika: {
        type: String
    }
});
exports.default = mongoose_1.default.model('KorisnikModel', Korisnik, 'Korisnici');
//# sourceMappingURL=korisnik.js.map