import * as express from 'express'
import SpecijalizacijaModel from '../models/specijalizacija'

export class SpecijalizacijaController {
    dodajSpecijalizaciju = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;

        SpecijalizacijaModel.findOne({ 'naziv': naziv }, (err, spec) => {
            if (err) {
                console.log(err);
                res.json({'message': 'Greška'});
            }
            else{
                if(spec != null){
                    res.json({'message': 'Specijalizacija već postoji u sistemu'});
                }
                else{
                    const specijalizacija = new SpecijalizacijaModel({
                        naziv: naziv,
                        pregledi: []
                    });

                    specijalizacija.save((err) => {
                        if (err)
                            return res.json({ 'message': 'Greška' });
                        res.json({ 'message': 'Uspešno dodata specijalizacija' });
                    })
                }
            }
        })
    }

}