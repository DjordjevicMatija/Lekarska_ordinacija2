"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Izvestaj = new Schema({
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
    specijalizacija: {
        type: String
    },
    razlog_dolaska: {
        type: String
    },
    dijagnoza: {
        type: String
    },
    terapija: {
        type: String
    },
    datum_pregleda: {
        type: Date
    },
    datum_narednog_pregleda: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('IzvestajModel', Izvestaj, 'Izvestaji');
//# sourceMappingURL=izvestaj.js.map