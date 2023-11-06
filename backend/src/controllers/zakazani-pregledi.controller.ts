import * as express from 'express'
import ZakazaniPregledModel from '../models/zakazani-pregled'

export class ZakazaniPregledController {
    zakaziPregled = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;
        let lekar = req.body.lekar;
        let ime_lekara = req.body.ime_lekara;
        let prezime_lekara = req.body.prezime_lekara;
        let ogranak = req.body.ogranak;
        let pregled = req.body.pregled;
        let pocetak_pregleda = new Date(req.body.pocetak_pregleda);
        let kraj_pregleda = new Date(req.body.kraj_pregleda);
        let cena = req.body.cena;

        ZakazaniPregledModel.find({ 'lekar': lekar }, (err, pregledi) => {
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
                    const zakazanPregled = new ZakazaniPregledModel({
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
                    })
                }
            }
        })
    }

    dohvatiPregledePacijent = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;

        ZakazaniPregledModel.find({ 'pacijent': pacijent }, (err, pregledi) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(pregledi);
            }
        })
    }

    otkaziPregled = (req: express.Request, res: express.Response) => {
        let lekar = req.body.lekar;
        let termin = req.body.termin;

        ZakazaniPregledModel.findOneAndDelete({ 'lekar': lekar, 'pocetak_pregleda': termin }, (err, resp) => {
            if (err) {
                console.log(err);
                res.json({ 'message': 'Greška' });
            }
            else {
                res.json({ 'message': 'Uspešno ste otkazali pregled' });
            }
        })
    }

    dohvatiPregledeLekar = (req: express.Request, res: express.Response) => {
        let licenca = req.body.licenca;
        const trenutnoVreme = new Date();

        ZakazaniPregledModel.find({
            'lekar': licenca,
            'pocetak_pregleda': { $gte: trenutnoVreme }
        }, (err, pregledi) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(pregledi);
            }
        })
    }

    dohvatiPregledeBezIzvestaja = (req: express.Request, res: express.Response) => {
        let licenca = req.body.licenca;
        const trenutnoVreme = new Date();

        ZakazaniPregledModel.find({
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
        })
    }
}