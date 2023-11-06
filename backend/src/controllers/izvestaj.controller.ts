import * as express from 'express'
import IzvestajModel from '../models/izvestaj'
import ZakazaniPregledModel from '../models/zakazani-pregled'

export class IzvestajController {

    dohvatiIzvestaje = (req: express.Request, res: express.Response) => {
        let pacijent = req.body.pacijent;

        IzvestajModel.find({ 'pacijent': pacijent }, (err, izvestaji) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(izvestaji);
            }
        })
    }

    unesiIzvestaj = (req: express.Request, res: express.Response) => {
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

        const izvestaj = new IzvestajModel({
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
                ZakazaniPregledModel.findOneAndUpdate({ 'lekar': lekar, 'pocetak_pregleda': datum_pregleda },
                    { $set: { 'ima_izvestaj': true } }, (err, pregled) => {
                        if (err) {
                            console.log(err);
                            return res.json({ 'message': 'Greška' });
                        }
                        else {
                            return res.json({'message': 'Uspešno ste uneli izveštaj'});
                        }
                    })
            }
        })
    }
}