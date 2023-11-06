import * as express from 'express'
import VrstaPregledaModel from '../models/vrsta-pregleda'
import SpecijalizacijaModel from '../models/specijalizacija'

export class VrstaPregledaController {
    dohvatiPreglede = (req: express.Request, res: express.Response) => {
        let licenca = req.body.licenca;

        VrstaPregledaModel.find({ 'lekari': licenca }, (err, pregledi) => {
            if (err)
                console.log(err);
            else {
                res.json(pregledi);
            }
        })
    }

    dohvatiPregledeSpec = (req: express.Request, res: express.Response) => {
        let specijalizacija = req.body.specijalizacija;

        VrstaPregledaModel.find({ 'specijalizacija': specijalizacija }, (err, pregledi) => {
            if (err)
                console.log(err);
            else {
                res.json(pregledi);
            }
        })
    }

    dodajPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let lekar = req.body.lekar;

        VrstaPregledaModel.findOneAndUpdate({ 'naziv': naziv }, { $push: { 'lekari': lekar } }, (err, resp) => {
            if (err) {
                console.log(err);
                res.json({ 'message': 'Greška' });
            }
            else {
                res.json({ 'message': 'Uspešno ste dodali pregled' });
            }
        })
    }

    izbaciPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let lekar = req.body.lekar;

        VrstaPregledaModel.findOneAndUpdate({ 'naziv': naziv }, { $pull: { 'lekari': lekar } }, (err, resp) => {
            if (err) {
                console.log(err);
                res.json({ 'message': 'Greška' });
            }
            else {
                res.json({ 'message': 'Uspešno ste izbacili pregled' });
            }
        })
    }

    noviPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let specijalizacija = req.body.specijalizacija;
        let cena = req.body.cena;
        let trajanje_u_min = req.body.trajanje_u_min;

        //proveri da li pregled postoji
        //ako ne postoji dodaj ga u vrste pregleda i u specijalizacije

        VrstaPregledaModel.findOne({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, preg) => {
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
                                    trajanje_u_min: trajanje_u_min,
                                    cena: cena
                                })

                                pregled.save((err) => {
                                    if (err)
                                        return res.json({ 'message': 'Greška' });
                                    res.json({ 'message': 'Uspešno dodat pregled' });
                                })
                            }
                        })
                }
            }
        })
    }

    obrisiPregled = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let specijalizacija = req.body.specijalizacija;

        //izbrisati iz specijalizacija i iz vrste pregleda
        SpecijalizacijaModel.findOneAndUpdate({ 'naziv': specijalizacija }, { $pull: { 'pregledi': naziv } }, (err, resp) => {
            if (err) {
                console.log(err);
                res.json({ 'message': 'Greška' });
            }
            else {
                VrstaPregledaModel.findOneAndRemove({ 'naziv': naziv, 'specijalizacija': specijalizacija }, (err, resp) => {
                    if (err) {
                        console.log(err);
                        res.json({ 'message': 'Greška' });
                    }
                    else {
                        res.json({ 'message': 'Uspešno ste izbacili pregled' });
                    }
                })
            }
        })
    }

    azurirajPregled = (req: express.Request, res: express.Response) => {
        let stariNaziv = req.body.stariNaziv;
        let naziv = req.body.naziv;
        let specijalizacija = req.body.specijalizacija;
        let cena = req.body.cena;
        let trajanje_u_min = req.body.trajanje_u_min;

        //izmeniti pregled u vrste pregleda
        //ako se menja naziv azurirati specijalizacije
        VrstaPregledaModel.findOneAndUpdate({ 'naziv': stariNaziv, 'specijalizacija': specijalizacija },
            {
                $set: {
                    'naziv': naziv,
                    'cena': cena,
                    'trajanje_u_min': trajanje_u_min
                }
            }, { new: true },
            (err, preg) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (stariNaziv !== naziv) {
                        SpecijalizacijaModel.findOneAndUpdate(
                          { 'naziv': specijalizacija },
                          { $pull: { 'pregledi': stariNaziv }},
                          { new: true },
                          (err, updatedSpecijalizacija) => {
                            if (err) {
                              console.log(err);
                            }
                            else{
                                SpecijalizacijaModel.findOneAndUpdate(
                                    { 'naziv': specijalizacija },
                                    { $push: { 'pregledi': naziv }},
                                    { new: true },
                                    (err, updatedSpecijalizacija) => {
                                      if (err) {
                                        console.log(err);
                                      }
                                    }
                                  );
                            }
                          }
                        );
                      }
                    res.json(preg);
                }
            })

    }
}