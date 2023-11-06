import * as express from 'express'
import ZahtevPregledModel from '../models/zahtev-pregled'
import VrstaPregledaModel from '../models/vrsta-pregleda'
import SpecijalizacijaModel from '../models/specijalizacija'

export class ZahtevPregledController {
    posaljiZahtev = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let specijalizacija = req.body.specijalizacija;

        let uslov: boolean = true;

        //proveri da li dati pregled vec postoji u tabelama vrste pregleda i zahtevi za preglede
        //ako postoji uslov = false
        ZahtevPregledModel.findOne({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, preg) => {
            if (err)
                console.log(err);
            else {
                if (preg != null) {
                    uslov = false;
                }
                VrstaPregledaModel.findOne({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, preg) => {
                    if (err)
                        console.log(err);
                    else {
                        if (preg != null) {
                            uslov = false;
                        }
                        proveriUslov();
                    }
                })
            }
        })

        function proveriUslov() {
            if (uslov) {
                const zahtev = new ZahtevPregledModel({
                    naziv: naziv,
                    specijalizacija: specijalizacija
                })

                zahtev.save((err) => {
                    if (err)
                        return res.json({ 'message': 'Greška' });
                    res.json({ 'message': 'Uspešno poslat zahtev' });
                })
            }
            else {
                res.json({ 'message': 'Zahtev za datim pregledom vec postoji' });
            }
        }

    }

    dohvatiZahtevPregled = (req: express.Request, res: express.Response) => {

        ZahtevPregledModel.find({}, (err, zahtevi) => {
            if (err)
                console.log(err);
            else
                res.json(zahtevi);
        })
    }

    odbijPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let specijalizacija = req.body.specijalizacija;

        ZahtevPregledModel.findOneAndRemove({ 'naziv': naziv, 'specijalizacija': specijalizacija },
            (err, zahtevi) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else
                    res.json({ 'message': 'Uspešno odbijen pregled' });
            })
    }

    odobriPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let specijalizacija = req.body.specijalizacija;

        ZahtevPregledModel.findOneAndRemove({ 'naziv': naziv, 'specijalizacija': specijalizacija },
            (err, zahtevi) => {
                if (err) {
                    console.log(err);
                    res.json({ 'message': 'Greška' });
                }
                else {
                    //ubaciti u specijalizacije
                    SpecijalizacijaModel.findOneAndUpdate({ 'naziv': specijalizacija },
                        { $push: { 'pregledi': naziv } },
                        (err, resp) => {
                            if (err) {
                                console.log(err);
                                res.json({ 'message': 'Greška' });
                            }
                            else {
                                //ubaciti u vrste pregleda (napravi novi)
                                const pregled = new VrstaPregledaModel({
                                    naziv: naziv,
                                    specijalizacija: specijalizacija,
                                    trajanje_u_min: 30,
                                    cena: null
                                })

                                pregled.save((err) => {
                                    if (err)
                                        return res.json({ 'message': 'Greška' });
                                    res.json({ 'message': 'Uspešno dodat pregled' });
                                })
                            }
                        })
                }
            })
    }
}