"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VrstaPregledaController = void 0;
const vrsta_pregleda_1 = __importDefault(require("../models/vrsta-pregleda"));
const specijalizacija_1 = __importDefault(require("../models/specijalizacija"));
class VrstaPregledaController {
    constructor() {
        this.dohvatiPreglede = (req, res) => {
            let licenca = req.body.licenca;
            vrsta_pregleda_1.default.find({ 'lekari': licenca }, (err, pregledi) => {
                if (err)
                    console.log(err);
                else {
                    res.json(pregledi);
                }
            });
        };
        this.dohvatiPregledeSpec = (req, res) => {
            let specijalizacija = req.body.specijalizacija;
            vrsta_pregleda_1.default.find({ 'specijalizacija': specijalizacija }, (err, pregledi) => {
                if (err)
                    console.log(err);
                else {
                    res.json(pregledi);
                }
            });
        };
        this.dodajPregled = (req, res) => {
            let naziv = req.body.naziv;
            let lekar = req.body.lekar;
            vrsta_pregleda_1.default.findOneAndUpdate({ 'naziv': naziv }, { $push: { 'lekari': lekar } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    res.json({ 'message': 'Uspešno ste dodali pregled' });
                }
            });
        };
        this.izbaciPregled = (req, res) => {
            let naziv = req.body.naziv;
            let lekar = req.body.lekar;
            vrsta_pregleda_1.default.findOneAndUpdate({ 'naziv': naziv }, { $pull: { 'lekari': lekar } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    res.json({ 'message': 'Uspešno ste izbacili pregled' });
                }
            });
        };
        this.noviPregled = (req, res) => {
            let naziv = req.body.naziv;
            let specijalizacija = req.body.specijalizacija;
            let cena = req.body.cena;
            let trajanje_u_min = req.body.trajanje_u_min;
            //proveri da li pregled postoji
            //ako ne postoji dodaj ga u vrste pregleda i u specijalizacije
            vrsta_pregleda_1.default.findOne({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, preg) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    if (preg != null) {
                        res.json({ 'message': 'Pregled već postoji u sistemu' });
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
                                    trajanje_u_min: trajanje_u_min,
                                    cena: cena
                                });
                                pregled.save((err) => {
                                    if (err)
                                        return res.json({ 'message': 'Greška' });
                                    res.json({ 'message': 'Uspešno dodat pregled' });
                                });
                            }
                        });
                    }
                }
            });
        };
        this.obrisiPregled = (req, res) => {
            let naziv = req.body.naziv;
            let specijalizacija = req.body.specijalizacija;
            //izbrisati iz specijalizacija i iz vrste pregleda
            specijalizacija_1.default.findOneAndUpdate({ 'naziv': specijalizacija }, { $pull: { 'pregledi': naziv } }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    vrsta_pregleda_1.default.findOneAndRemove({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, resp) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'Greška' });
                        }
                        else {
                            res.json({ 'message': 'Uspešno ste izbacili pregled' });
                        }
                    });
                }
            });
        };
        this.azurirajPregled = (req, res) => {
            let stariNaziv = req.body.stariNaziv;
            let naziv = req.body.naziv;
            let specijalizacija = req.body.specijalizacija;
            let cena = req.body.cena;
            let trajanje_u_min = req.body.trajanje_u_min;
            //izmeniti pregled u vrste pregleda
            //ako se menja naziv azurirati specijalizacije
            vrsta_pregleda_1.default.findOneAndUpdate({ 'naziv': stariNaziv, 'specijalizacija': specijalizacija }, {
                $set: {
                    'naziv': naziv,
                    'cena': cena,
                    'trajanje_u_min': trajanje_u_min
                }
            }, { new: true }, (err, preg) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (stariNaziv !== naziv) {
                        specijalizacija_1.default.findOneAndUpdate({ 'naziv': specijalizacija }, { $pull: { 'pregledi': stariNaziv } }, { new: true }, (err, updatedSpecijalizacija) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                specijalizacija_1.default.findOneAndUpdate({ 'naziv': specijalizacija }, { $push: { 'pregledi': naziv } }, { new: true }, (err, updatedSpecijalizacija) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            }
                        });
                    }
                    res.json(preg);
                }
            });
        };
    }
}
exports.VrstaPregledaController = VrstaPregledaController;
//# sourceMappingURL=vrsta-pregleda.controller.js.map