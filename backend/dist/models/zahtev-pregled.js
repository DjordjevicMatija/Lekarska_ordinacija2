"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ZahtevPregled = new Schema({
    naziv: {
        type: String
    },
    specijalizacija: {
        type: String
    }
});
exports.default = mongoose_1.default.model('ZahtevPregledModel', ZahtevPregled, 'ZahteviZaPreglede');
//# sourceMappingURL=zahtev-pregled.js.map