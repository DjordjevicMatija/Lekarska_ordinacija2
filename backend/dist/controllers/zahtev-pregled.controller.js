"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZahtevPregledController = void 0;
const zahtev_pregled_1 = __importDefault(require("../models/zahtev-pregled"));
const vrsta_pregleda_1 = __importDefault(require("../models/vrsta-pregleda"));
const specijalizacija_1 = __importDefault(require("../models/specijalizacija"));
class ZahtevPregledController {
    constructor() {
        this.posaljiZahtev = (req, res) => {
            let naziv = req.body.naziv;
            let specijalizacija = req.body.specijalizacija;
            let uslov = true;
            //proveri da li dati pregled vec postoji u tabelama vrste pregleda i zahtevi za preglede
            //ako postoji uslov = false
            zahtev_pregled_1.default.findOne({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, preg) => {
                if (err)
                    console.log(err);
                else {
                    if (preg != null) {
                        uslov = false;
                    }
                    vrsta_pregleda_1.default.findOne({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, preg) => {
                        if (err)
                            console.log(err);
                        else {
                            if (preg != null) {
                                uslov = false;
                            }
                            proveriUslov();
                        }
                    });
                }
            });
            function proveriUslov() {
                if (uslov) {
                    const zahtev = new zahtev_pregled_1.default({
                        naziv: naziv,
                        specijalizacija: specijalizacija
                    });
                    zahtev.save((err) => {
                        if (err)
                            return res.json({ 'message': 'Greška' });
                        res.json({ 'message': 'Uspešno poslat zahtev' });
                    });
                }
                else {
                    res.json({ 'message': 'Zahtev za datim pregledom vec postoji' });
                }
            }
        };
        this.dohvatiZahtevPregled = (req, res) => {
            zahtev_pregled_1.default.find({}, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.odbijPregled = (req, res) => {
            let naziv = req.body.naziv;
            let specijalizacija = req.body.specijalizacija;
            zahtev_pregled_1.default.findOneAndRemove({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, zahtevi) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else
                    res.json({ 'message': 'Uspešno odbijen pregled' });
            });
        };
        this.odobriPregled = (req, res) => {
            let naziv = req.body.naziv;
            let specijalizacija = req.body.specijalizacija;
            zahtev_pregled_1.default.findOneAndRemove({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, zahtevi) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    //ubaciti u specijalizacije
                    specijalizacija_1.default.findOneAndUpdate({ 'naziv': specijalizacija }, { $push: { 'pregledi': naziv } }, (err, resp) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'Greška' });
                        }
                        else {
                            //ubaciti u vrste pregleda (napravi novi)
                            const pregled = new vrsta_pregleda_1.default({
                                naziv: naziv,
                                specijalizacija: specijalizacija,
                                trajanje_u_min: 30,
                                cena: null
                            });
                            pregled.save((err) => {
                                if (err)
                                    return res.json({ 'message': 'Greška' });
                                res.json({ 'message': 'Uspešno dodat pregled' });
                            });
                        }
                    });
                }
            });
        };
    }
}
exports.ZahtevPregledController = ZahtevPregledController;
//# sourceMappingURL=zahtev-pregled.controller.js.map