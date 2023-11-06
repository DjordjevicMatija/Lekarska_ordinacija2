"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzvestajController = void 0;
const izvestaj_1 = __importDefault(require("../models/izvestaj"));
const zakazani_pregled_1 = __importDefault(require("../models/zakazani-pregled"));
class IzvestajController {
    constructor() {
        this.dohvatiIzvestaje = (req, res) => {
            let pacijent = req.body.pacijent;
            izvestaj_1.default.find({ 'pacijent': pacijent }, (err, izvestaji) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(izvestaji);
                }
            });
        };
        this.unesiIzvestaj = (req, res) => {
            let razlog_dolaska = req.body.razlog_dolaska;
            let dijagnoza = req.body.dijagnoza;
            let datum_narednog_pregleda = req.body.datum_narednog_pregleda;
            let datum_pregleda = req.body.datum_pregleda;
            let specijalizacija = req.body.specijalizacija;
            let terapija = req.body.terapija;
            let pacijent = req.body.pacijent;
            let lekar = req.body.lekar;
            let ime_lekara = req.body.ime_lekara;
            let prezime_lekara = req.body.prezime_lekara;
            const izvestaj = new izvestaj_1.default({
                razlog_dolaska: razlog_dolaska,
                dijagnoza: dijagnoza,
                datum_narednog_pregleda: datum_narednog_pregleda,
                datum_pregleda: datum_pregleda,
                specijalizacija: specijalizacija,
                terapija: terapija,
                pacijent: pacijent,
                lekar: lekar,
                ime_lekara: ime_lekara,
                prezime_lekara: prezime_lekara
            });
            izvestaj.save((err) => {
                if (err)
                    return res.json({ 'message': 'Greška' });
                else {
                    zakazani_pregled_1.default.findOneAndUpdate({ 'lekar': lekar, 'pocetak_pregleda': datum_pregleda }, { $set: { 'ima_izvestaj': true } }, (err, pregled) => {
                        if (err) {
                            console.log(err);
                            return res.json({ 'message': 'Greška' });
                        }
                        else {
                            return res.json({ 'message': 'Uspešno ste uneli izveštaj' });
                        }
                    });
                }
            });
        };
    }
}
exports.IzvestajController = IzvestajController;
//# sourceMappingURL=izvestaj.controller.js.map