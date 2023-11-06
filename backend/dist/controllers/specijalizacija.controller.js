"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecijalizacijaController = void 0;
const specijalizacija_1 = __importDefault(require("../models/specijalizacija"));
class SpecijalizacijaController {
    constructor() {
        this.dodajSpecijalizaciju = (req, res) => {
            let naziv = req.body.naziv;
            specijalizacija_1.default.findOne({ 'naziv': naziv }, (err, spec) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    if (spec != null) {
                        res.json({ 'message': 'Specijalizacija već postoji u sistemu' });
                    }
                    else {
                        const specijalizacija = new specijalizacija_1.default({
                            naziv: naziv,
                            pregledi: []
                        });
                        specijalizacija.save((err) => {
                            if (err)
                                return res.json({ 'message': 'Greška' });
                            res.json({ 'message': 'Uspešno dodata specijalizacija' });
                        });
                    }
                }
            });
        };
    }
}
exports.SpecijalizacijaController = SpecijalizacijaController;
//# sourceMappingURL=specijalizacija.controller.js.map