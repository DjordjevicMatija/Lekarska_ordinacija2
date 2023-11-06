"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZahtevController = void 0;
const fs_1 = __importDefault(require("fs"));
const zahtev_1 = __importDefault(require("../models/zahtev"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
class ZahtevController {
    constructor() {
        this.posaljiZahtev = (req, res) => {
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
            const zahtev = new zahtev_1.default({
                kor_ime: kor_ime,
                lozinka: lozinka,
                ime: ime,
                prezime: prezime,
                adresa: adresa,
                telefon: telefon,
                imejl: imejl,
                tip: tip,
                slika: filePath,
                status: 'u obradi'
            });
            zahtev.save((err) => {
                if (err)
                    return res.json({ 'message': 'Greška' });
                res.json({ message: 'Uspešno poslat zahtev' });
            });
        };
        this.dohvatiZahteveReg = (req, res) => {
            zahtev_1.default.find({ 'status': 'u obradi' }, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.prihvatiZahtev = (req, res) => {
            let kor_ime = req.body.kor_ime;
            zahtev_1.default.findOneAndRemove({ 'kor_ime': kor_ime }, (err, zah) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    const pacijent = new korisnik_1.default({
                        kor_ime: zah.kor_ime,
                        lozinka: zah.lozinka,
                        ime: zah.ime,
                        prezime: zah.prezime,
                        adresa: zah.adresa,
                        telefon: zah.telefon,
                        imejl: zah.imejl,
                        tip: zah.tip,
                        slika: zah.slika
                    });
                    pacijent.save((err) => {
                        if (err)
                            return res.json({ 'message': 'Greška' });
                        res.json({ 'message': 'Uspešno prihvaćen zahtev' });
                    });
                }
            });
        };
        this.odbaciZahtev = (req, res) => {
            let kor_ime = req.body.kor_ime;
            const stalniDeo = 'http://localhost:4000/';
            zahtev_1.default.findOneAndUpdate({ 'kor_ime': kor_ime }, { $set: { 'status': 'odbijen' } }, (err, zahtev) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    const izdvojeniDeo = zahtev.slika.slice(stalniDeo.length);
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
                    res.json({ 'message': 'Uspešno odbijen zahtev' });
                }
            });
        };
    }
}
exports.ZahtevController = ZahtevController;
//# sourceMappingURL=zahtev.controller.js.map