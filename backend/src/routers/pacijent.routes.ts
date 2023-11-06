import express from 'express';
import multer from 'multer';
import { ZakazaniPregledController } from '../controllers/zakazani-pregledi.controller';
import { VrstaPregledaController } from '../controllers/vrsta-pregleda.controller';
import { IzvestajController } from '../controllers/izvestaj.controller';
import { LekarController } from '../controllers/lekar.controller';

const pacijentRouter = express.Router();
const upload = multer({dest: 'uploads/'});

pacijentRouter.route('/dohvatiPreglede').post(
    (req, res)=>new VrstaPregledaController().dohvatiPreglede(req, res)
);

pacijentRouter.route('/zakaziPregled').post(
    (req, res)=>new ZakazaniPregledController().zakaziPregled(req, res)
);

pacijentRouter.route('/dohvatiPregledePacijent').post(
    (req, res)=>new ZakazaniPregledController().dohvatiPregledePacijent(req, res)
);

pacijentRouter.route('/dohvatiIzvestaje').post(
    (req, res)=>new IzvestajController().dohvatiIzvestaje(req, res)
);

pacijentRouter.route('/otkaziPregled').post(
    (req, res)=>new ZakazaniPregledController().otkaziPregled(req, res)
);

pacijentRouter.post('/azurirajProfil', upload.single('profilnaSlika'),
 async (req, res)=>new LekarController().azurirajKorisnika(req, res)
);

export default pacijentRouter;