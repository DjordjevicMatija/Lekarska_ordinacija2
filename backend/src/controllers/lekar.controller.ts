import * as express from 'express'
import multer from 'multer'
import fs from 'fs'
import KorisnikModel from '../models/korisnik'
import ZahtevModel from '../models/zahtev'
import VrstaPregledaModel from '../models/vrsta-pregleda'
import ZakazaniPregledModel from '../models/zakazani-pregled'
import SpecijalizacijaModel from '../models/specijalizacija'

export class LekarController {
    dohvatiLekare = (req: express.Request, res: express.Response) => {

        KorisnikModel.find({ 'tip': 'lekar' }, (err, lekari) => {
            if (err)
                console.log(err);
            else
                res.json(lekari);
        })
    }

    dohvatiKorisnike = (req: express.Request, res: express.Response) => {

        KorisnikModel.find({ tip: { $ne: 'menadzer' } }, (err, korisnici) => {
            if (err)
                console.log(err);
            else
                res.json(korisnici);
        })
    }

    ulogujSe = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        KorisnikModel.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka }, (err, kor) => {
            if (err)
                console.log(err);
            else
                res.json(kor);
        })
    }

    proveriKorIme = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        KorisnikModel.findOne({ 'kor_ime': kor_ime }, (err, kor) => {
            if (err)
                console.log(err);
            else
                res.json(kor);
        })
    }

    proveriKorImeZahtev = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        ZahtevModel.findOne({ 'kor_ime': kor_ime }, (err, zah) => {
            if (err)
                console.log(err);
            else
                res.json(zah);
        })
    }

    proveriMejlBaza = (req: express.Request, res: express.Response) => {
        let imejl = req.body.imejl;

        KorisnikModel.findOne({ 'imejl': imejl }, (err, kor) => {
            if (err)
                console.log(err);
            else
                res.json(kor);
        })
    }

    proveriMejlBazaZahtev = (req: express.Request, res: express.Response) => {
        let imejl = req.body.imejl;

        ZahtevModel.findOne({ 'imejl': imejl }, (err, zah) => {
            if (err)
                console.log(err);
            else
                res.json(zah);
        })
    }

    proveriStaruLoz = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        KorisnikModel.findOne({ 'kor_ime': kor_ime, 'lozinka': lozinka }, (err, kor) => {
            if (err)
                console.log(err);
            else
                res.json(kor);
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        KorisnikModel.findOneAndUpdate({ 'kor_ime': kor_ime }, { $set: { 'lozinka': lozinka } }, (err, kor) => {
            if (err) {
                console.log(err);
                res.json({ 'message': 'Greska' });
            }
            else
                res.json({ 'message': 'Lozinka uspešno promenjena' });
        })
    }

    obrisiKorisnika = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let tip = req.body.tip;

        const stalniDeo = 'http://localhost:4000/';

        if (tip == 'lekar') {
            KorisnikModel.findOneAndRemove({ 'kor_ime': kor_ime }, (err, lekar) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    //brisanje slike iz foldera
                    const izdvojeniDeo = lekar.slika.slice(stalniDeo.length);
                    const oldPath = izdvojeniDeo.replace(/\//g, '\\');

                    if (fs.existsSync(oldPath) && oldPath != 'uploads\\default-profile.jpg') {
                        try {
                            fs.unlinkSync(oldPath);
                        } catch (err) {
                            console.error(`Greška pri brisanju fajla ${oldPath}:`, err);
                        }
                    } else {
                        console.warn(`Fajl ${oldPath} ne postoji.`);
                    }

                    //brisanje lekara iz pregleda koji obavlja
                    VrstaPregledaModel.updateMany(
                        { 'lekari': lekar.licenca },
                        { $pull: { 'lekari': lekar.licenca } },
                        (err, resp) => {
                            if (err) {
                                console.log(err);
                                res.json({ 'message': 'Greška' });
                            }
                            else {
                                res.json({ 'message': 'Uspešno ste obrisali korisnika' });
                            }
                        }
                    )
                }
            })
        }
        else if (tip == 'pacijent') {
            KorisnikModel.findOneAndRemove({ 'kor_ime': kor_ime }, (err, pacijent) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    //brisanje slike iz foldera
                    const izdvojeniDeo = pacijent.slika.slice(stalniDeo.length);
                    const oldPath = izdvojeniDeo.replace(/\//g, '\\');

                    if (fs.existsSync(oldPath) && oldPath != 'uploads\\default-profile.jpg') {
                        try {
                            fs.unlinkSync(oldPath);
                        } catch (err) {
                            console.error(`Greška pri brisanju fajla ${oldPath}:`, err);
                        }
                    } else {
                        console.warn(`Fajl ${oldPath} ne postoji.`);
                    }

                    //brisanje svih zakazanih pregleda za tog pacijenta
                    ZakazaniPregledModel.deleteMany({ 'pacijent': pacijent.kor_ime }, (err, resp) => {
                        if (err) {
                            console.log(err);
                            res.json({ 'message': 'Greška' });
                        }
                        else {
                            res.json({ 'message': 'Uspešno ste obrisali korisnika' });
                        }
                    })
                }
            })
        }
    }

    proveriLicencu = (req: express.Request, res: express.Response) => {
        let licenca = req.body.licenca;

        KorisnikModel.findOne({ 'licenca': licenca }, (err, kor) => {
            if (err)
                console.log(err);
            else
                res.json(kor);
        })
    }

    dohvatiSpecijalizacije = (req: express.Request, res: express.Response) => {

        SpecijalizacijaModel.find({}, (err, spec) => {
            if (err)
                console.log(err);
            else
                res.json(spec);
        })
    }

    azurirajKorisnika = (req: multer.Request, res: express.Response) => {
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

        KorisnikModel.findOne({ 'kor_ime': staroKor_ime }, (err, kor) => {
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

                    if (fs.existsSync(oldPath) && oldPath != 'uploads\\default-profile.jpg') {
                        try {
                            fs.unlinkSync(oldPath);
                        } catch (err) {
                            console.error(`Greška pri brisanju fajla ${oldPath}:`, err);
                        }
                    } else {
                        console.warn(`Fajl ${oldPath} ne postoji.`);
                    }
                }
                if (tip == 'pacijent') {
                    KorisnikModel.findOneAndUpdate({ 'kor_ime': staroKor_ime }, {
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
                    })
                }
                else if (tip == 'lekar') {
                    let specijalizacija = req.body.specijalizacija;
                    let ogranak = req.body.ogranak;
                    let licenca = req.body.licenca;

                    if (kor.specijalizacija != specijalizacija) {
                        VrstaPregledaModel.updateMany(
                            { 'specijalizacija': kor.specijalizacija },
                            { $pull: { 'lekari': kor.licenca } },
                            (err, resp) => {
                                if (err)
                                    console.log(err);
                            })
                    }

                    KorisnikModel.findOneAndUpdate({ 'kor_ime': staroKor_ime }, {
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
                    })
                }
            }
        })


    }

    dodajLekara = (req: multer.Request, res: express.Response) => {
        let path;
        if (req.file == null) {
            path = 'uploads/default-profile.jpg'
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

        const lekar = new KorisnikModel({
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
        })

        lekar.save((err) => {
            if (err)
                return res.json({ 'message': 'Greška' });
            res.json({ 'message': 'Uspešno dodat lekar' });
        })
    }

}