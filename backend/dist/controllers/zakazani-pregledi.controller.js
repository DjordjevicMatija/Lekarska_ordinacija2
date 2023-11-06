"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZakazaniPregledController = void 0;
const zakazani_pregled_1 = __importDefault(require("../models/zakazani-pregled"));
class ZakazaniPregledController {
    constructor() {
        this.zakaziPregled = (req, res) => {
            let pacijent = req.body.pacijent;
            let lekar = req.body.lekar;
            let ime_lekara = req.body.ime_lekara;
            let prezime_lekara = req.body.prezime_lekara;
            let ogranak = req.body.ogranak;
            let pregled = req.body.pregled;
            let pocetak_pregleda = new Date(req.body.pocetak_pregleda);
            let kraj_pregleda = new Date(req.body.kraj_pregleda);
            let cena = req.body.cena;
            zakazani_pregled_1.default.find({ 'lekar': lekar }, (err, pregledi) => {
                if (err) {
                    console.log(err);
                    return res.json({ 'message': 'Greška' });
                }
                else {
                    let preklop = false;
                    for (let p of pregledi) {
                        if ((p.pocetak_pregleda <= pocetak_pregleda &&
                            p.kraj_pregleda >= pocetak_pregleda) ||
                            (p.pocetak_pregleda <= kraj_pregleda &&
                                p.kraj_pregleda >= kraj_pregleda) ||
                            (p.pocetak_pregleda >= pocetak_pregleda &&
                                p.kraj_pregleda <= kraj_pregleda) ||
                            (p.pocetak_pregleda <= pocetak_pregleda &&
                                p.kraj_pregleda >= kraj_pregleda)) {
                            preklop = true;
                            break;
                        }
                    }
                    if (preklop) {
                        return res.json({ 'message': 'Lekar nije slobodan u terminu koji ste izabrali' });
                    }
                    else {
                        const zakazanPregled = new zakazani_pregled_1.default({
                            pacijent: pacijent,
                            lekar: lekar,
                            ime_lekara: ime_lekara,
                            prezime_lekara: prezime_lekara,
                            ogranak: ogranak,
                            pregled: pregled,
                            pocetak_pregleda: pocetak_pregleda,
                            kraj_pregleda: kraj_pregleda,
                            ima_izvestaj: false,
                            cena: cena
                        });
                        zakazanPregled.save((err) => {
                            if (err)
                                return res.json({ 'message': 'Greška' });
                            res.json({ message: 'Uspešno ste zakazali pregled' });
                        });
                    }
                }
            });
        };
        this.dohvatiPregledePacijent = (req, res) => {
            let pacijent = req.body.pacijent;
            zakazani_pregled_1.default.find({ 'pacijent': pacijent }, (err, pregledi) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(pregledi);
                }
            });
        };
        this.otkaziPregled = (req, res) => {
            let lekar = req.body.lekar;
            let termin = req.body.termin;
            zakazani_pregled_1.default.findOneAndDelete({ 'lekar': lekar, 'pocetak_pregleda': termin }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    res.json({ 'message': 'Uspešno ste otkazali pregled' });
                }
            });
        };
        this.dohvatiPregledeLekar = (req, res) => {
            let licenca = req.body.licenca;
            const trenutnoVreme = new Date();
            zakazani_pregled_1.default.find({
                'lekar': licenca,
                'pocetak_pregleda': { $gte: trenutnoVreme }
            }, (err, pregledi) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(pregledi);
                }
            });
        };
        this.dohvatiPregledeBezIzvestaja = (req, res) => {
            let licenca = req.body.licenca;
            const trenutnoVreme = new Date();
            zakazani_pregled_1.default.find({
                'lekar': licenca,
                'pocetak_pregleda': { $lt: trenutnoVreme },
                'ima_izvestaj': false
            }, (err, pregledi) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(pregledi);
                }
            });
        };
    }
}
exports.ZakazaniPregledController = ZakazaniPregledController;
//# sourceMappingURL=zakazani-pregledi.controller.js.map