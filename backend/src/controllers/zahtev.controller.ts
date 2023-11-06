import * as express from 'express'
import fs from 'fs'
import multer from 'multer'
import ZahtevModel from '../models/zahtev'
import KorisnikModel from '../models/korisnik'

export class ZahtevController {

    posaljiZahtev = (req: multer.Request, res: express.Response) => {
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

        const zahtev = new ZahtevModel({
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
        })

        zahtev.save((err) => {
            if (err)
                return res.json({ 'message': 'Greška' });
            res.json({ message: 'Uspešno poslat zahtev' });
        })
    }

    dohvatiZahteveReg = (req: express.Request, res: express.Response) => {

        ZahtevModel.find({ 'status': 'u obradi' }, (err, zahtevi) => {
            if (err)
                console.log(err);
            else
                res.json(zahtevi);
        })
    }

    prihvatiZahtev = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        ZahtevModel.findOneAndRemove({ 'kor_ime': kor_ime }, (err, zah) => {
            if (err) {
                console.log(err);
                res.json({ 'message': 'Greška' });
            }
            else {
                const pacijent = new KorisnikModel({
                    kor_ime: zah.kor_ime,
                    lozinka: zah.lozinka,
                    ime: zah.ime,
                    prezime: zah.prezime,
                    adresa: zah.adresa,
                    telefon: zah.telefon,
                    imejl: zah.imejl,
                    tip: zah.tip,
                    slika: zah.slika
                })

                pacijent.save((err) => {
                    if (err)
                        return res.json({ 'message': 'Greška' });
                    res.json({ 'message': 'Uspešno prihvaćen zahtev' });
                })
            }
        })
    }

    odbaciZahtev = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        const stalniDeo = 'http://localhost:4000/';

        ZahtevModel.findOneAndUpdate({ 'kor_ime': kor_ime },
            { $set: { 'status': 'odbijen' } }
            , (err, zahtev) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    const izdvojeniDeo = zahtev.slika.slice(stalniDeo.length);
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
                    
                    res.json({ 'message': 'Uspešno odbijen zahtev' });
                }
            })
    }

}