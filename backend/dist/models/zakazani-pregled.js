"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ZakazaniPregled = new Schema({
    pacijent: {
        type: String
    },
    lekar: {
        type: String
    },
    ime_lekara: {
        type: String
    },
    prezime_lekara: {
        type: String
    },
    ogranak: {
        type: String
    },
    pregled: {
        type: String
    },
    pocetak_pregleda: {
        type: Date
    },
    kraj_pregleda: {
        type: Date
    },
    ima_izvestaj: {
        type: Boolean
    },
    cena: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('ZakazaniPregledModel', ZakazaniPregled, 'ZakazaniPregledi');
//# sourceMappingURL=zakazani-pregled.js.map