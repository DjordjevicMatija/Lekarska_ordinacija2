"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LekarController = void 0;
const fs_1 = __importDefault(require("fs"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const zahtev_1 = __importDefault(require("../models/zahtev"));
const vrsta_pregleda_1 = __importDefault(require("../models/vrsta-pregleda"));
const zakazani_pregled_1 = __importDefault(require("../models/zakazani-pregled"));
const specijalizacija_1 = __importDefault(require("../models/specijalizacija"));
class LekarController {
    constructor() {
        this.dohvatiLekare = (req, res) => {
            korisnik_1.default.find({ 'tip': 'lekar' }, (err, lekari) => {
                if (err)
                    console.log(err);
                else
                    res.json(lekari);
            });
        };
        this.dohvatiKorisnike = (req, res) => {
            korisnik_1.default.find({ tip: { $ne: 'menadzer' } }, (err, korisnici) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnici);
            });
        };
        this.ulogujSe = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.proveriKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_1.default.findOne({ 'kor_ime': kor_ime }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.proveriKorImeZahtev = (req, res) => {
            let kor_ime = req.body.kor_ime;
            zahtev_1.default.findOne({ 'kor_ime': kor_ime }, (err, zah) => {
                if (err)
                    console.log(err);
                else
                    res.json(zah);
            });
        };
        this.proveriMejlBaza = (req, res) => {
            let imejl = req.body.imejl;
            korisnik_1.default.findOne({ 'imejl': imejl }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.proveriMejlBazaZahtev = (req, res) => {
            let imejl = req.body.imejl;
            zahtev_1.default.findOne({ 'imejl': imejl }, (err, zah) => {
                if (err)
                    console.log(err);
                else
                    res.json(zah);
            });
        };
        this.proveriStaruLoz = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.promeniLozinku = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOneAndUpdate({ 'kor_ime': kor_ime }, { $set: { 'lozinka': lozinka } }, (err, kor) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greska' });
                }
                else
                    res.json({ 'message': 'Lozinka uspešno promenjena' });
            });
        };
        this.obrisiKorisnika = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let tip = req.body.tip;
            const stalniDeo = 'http://localhost:4000/';
            if (tip == 'lekar') {
                korisnik_1.default.findOneAndRemove({ 'kor_ime': kor_ime }, (err, lekar) => {
                    if (err) {
                        console.log(err);
                        res.json({ 'message': 'Greška' });
                    }
                    else {
                        //brisanje slike iz foldera
                        const izdvojeniDeo = lekar.slika.slice(stalniDeo.length);
                        const oldPath = izdvojeniDeo.replace(/\//g, '\\');
                        if (fs_1.default.existsSync(oldPath) && oldPath != 'uploads\\default-profile.jpg') {
                            try {
                                fs_1.default.unlinkSync(oldPath);
                            }
                            catch (err) {
                                console.error(`Greška pri brisanju fajla ${oldPath}:`, err);
                            }
                        }
                        else {
                            console.warn(`Fajl ${oldPath} ne postoji.`);
                        }
                        //brisanje lekara iz pregleda koji obavlja
                        vrsta_pregleda_1.default.updateMany({ 'lekari': lekar.licenca }, { $pull: { 'lekari': lekar.licenca } }, (err, resp) => {
                            if (err) {
                                console.log(err);
                                res.json({ 'message': 'Greška' });
                            }
                            else {
                                res.json({ 'message': 'Uspešno ste obrisali korisnika' });
                            }
                        });
                    }
                });
            }
            else if (tip == 'pacijent') {
                korisnik_1.default.findOneAndRemove({ 'kor_ime': kor_ime }, (err, pacijent) => {
                    if (err) {
                        console.log(err);
                        res.json({ 'message': 'Greška' });
                    }
                    else {
                        //brisanje slike iz foldera
                        const izdvojeniDeo = pacijent.slika.slice(stalniDeo.length);
                        const oldPath = izdvojeniDeo.replace(/\//g, '\\');
                        if (fs_1.default.existsSync(oldPath) && oldPath != 'uploads\\default-profile.jpg') {
                            try {
                                fs_1.default.unlinkSync(oldPath);
                            }
                            catch (err) {
                                console.error(`Greška pri brisanju fajla ${oldPath}:`, err);
                            }
                        }
                        else {
                            console.warn(`Fajl ${oldPath} ne postoji.`);
                        }
                        //brisanje svih zakazanih pregleda za tog pacijenta
                        zakazani_pregled_1.default.deleteMany({ 'pacijent': pacijent.kor_ime }, (err, resp) => {
                            if (err) {
                                console.log(err);
                                res.json({ 'message': 'Greška' });
                            }
                            else {
                                res.json({ 'message': 'Uspešno ste obrisali korisnika' });
                            }
                        });
                    }
                });
            }
        };
        this.proveriLicencu = (req, res) => {
            let licenca = req.body.licenca;
            korisnik_1.default.findOne({ 'licenca': licenca }, (err, kor) => {
                if (err)
                    console.log(err);
                else
                    res.json(kor);
            });
        };
        this.dohvatiSpecijalizacije = (req, res) => {
            specijalizacija_1.default.find({}, (err, spec) => {
                if (err)
                    console.log(err);
                else
                    res.json(spec);
            });
        };
        this.azurirajKorisnika = (req, res) => {
            let filePath = '';
            const stalniDeo = 'http://localhost:4000/';
            if (req.file != null) {
                let pathF = req.file.path;
                const newPath = pathF.replace(/\\/g, '/');
                filePath = stalniDeo + newPath;
            }
            let staroKor_ime = req.body.staroKor_ime;
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let adresa = req.body.adresa;
            let telefon = req.body.telefon;
            let imejl = req.body.imejl;
            let tip = req.body.tip;
            korisnik_1.default.findOne({ 'kor_ime': staroKor_ime }, (err, kor) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (filePath == '') {
                        filePath = kor.slika;
                    }
                    else {
                        const izdvojeniDeo = kor.slika.slice(stalniDeo.length);
                        const oldPath = izdvojeniDeo.replace(/\//g, '\\');
                        if (fs_1.default.existsSync(oldPath) && oldPath != 'uploads\\default-profile.jpg') {
                            try {
                                fs_1.default.unlinkSync(oldPath);
                            }
                            catch (err) {
                                console.error(`Greška pri brisanju fajla ${oldPath}:`, err);
                            }
                        }
                        else {
                            console.warn(`Fajl ${oldPath} ne postoji.`);
                        }
                    }
                    if (tip == 'pacijent') {
                        korisnik_1.default.findOneAndUpdate({ 'kor_ime': staroKor_ime }, {
                            $set: {
                                'kor_ime': kor_ime,
                                'lozinka': lozinka,
                                'adresa': adresa,
                                'ime': ime,
                                'imejl': imejl,
                                'prezime': prezime,
                                'telefon': telefon,
                                'slika': filePath
                            }
                        }, { new: true }, (err, korisnik) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json(korisnik);
                            }
                        });
                    }
                    else if (tip == 'lekar') {
                        let specijalizacija = req.body.specijalizacija;
                        let ogranak = req.body.ogranak;
                        let licenca = req.body.licenca;
                        if (kor.specijalizacija != specijalizacija) {
                            vrsta_pregleda_1.default.updateMany({ 'specijalizacija': kor.specijalizacija }, { $pull: { 'lekari': kor.licenca } }, (err, resp) => {
                                if (err)
                                    console.log(err);
                            });
                        }
                        korisnik_1.default.findOneAndUpdate({ 'kor_ime': staroKor_ime }, {
                            $set: {
                                'kor_ime': kor_ime,
                                'lozinka': lozinka,
                                'adresa': adresa,
                                'ime': ime,
                                'imejl': imejl,
                                'prezime': prezime,
                                'telefon': telefon,
                                'slika': filePath,
                                'licenca': licenca,
                                'ogranak': ogranak,
                                'specijalizacija': specijalizacija
                            }
                        }, { new: true }, (err, korisnik) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.json(korisnik);
                            }
                        });
                    }
                }
            });
        };
        this.dodajLekara = (req, res) => {
            let path;
            if (req.file == null) {
                path = 'uploads/default-profile.jpg';
            }
            else {
                path = req.file.path;
            }
            const newPath = path.replace(/\\/g, '/');
            const filePath = 'http://localhost:4000/' + newPath;
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let adresa = req.body.adresa;
            let telefon = req.body.telefon;
            let imejl = req.body.imejl;
            let tip = req.body.tip;
            let ogranak = req.body.ogranak;
            let specijalizacija = req.body.specijalizacija;
            let licenca = req.body.licenca;
            const lekar = new korisnik_1.default({
                kor_ime: kor_ime,
                lozinka: lozinka,
                ime: ime,
                prezime: prezime,
                adresa: adresa,
                telefon: telefon,
                imejl: imejl,
                tip: tip,
                slika: filePath,
                licenca: licenca,
                specijalizacija: specijalizacija,
                ogranak: ogranak
            });
            lekar.save((err) => {
                if (err)
                    return res.json({ 'message': 'Greška' });
                res.json({ 'message': 'Uspešno dodat lekar' });
            });
        };
    }
}
exports.LekarController = LekarController;
//# sourceMappingURL=lekar.controller.js.map