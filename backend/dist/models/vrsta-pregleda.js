"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let VrstaPregleda = new Schema({
    naziv: {
        type: String
    },
    trajanje_u_min: {
        type: Number
    },
    cena: {
        type: Number
    },
    specijalizacija: {
        type: String
    },
    lekari: [
        { type: String }
    ]
});
exports.default = mongoose_1.default.model('VrstaPregledaModel', VrstaPregleda, 'VrstePregleda');
//# sourceMappingURL=vrsta-pregleda.js.map