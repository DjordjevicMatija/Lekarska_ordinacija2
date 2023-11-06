import express from 'express';
import multer from 'multer';
import { VrstaPregledaController } from '../controllers/vrsta-pregleda.controller';
import { ZahtevPregledController } from '../controllers/zahtev-pregled.controller';
import { ZakazaniPregledController } from '../controllers/zakazani-pregledi.controller';
import { LekarController } from '../controllers/lekar.controller';
import { IzvestajController } from '../controllers/izvestaj.controller';

const lekarRouter = express.Router();
const upload = multer({dest: 'uploads/'});

lekarRouter.route('/dohvatiPregledeSpec').post(
    (req, res)=>new VrstaPregledaController().dohvatiPregledeSpec(req, res)
);

lekarRouter.route('/dodajPregled').post(
    (req, res)=>new VrstaPregledaController().dodajPregled(req, res)
);

lekarRouter.route('/izbaciPregled').post(
    (req, res)=>new VrstaPregledaController().izbaciPregled(req, res)
);

lekarRouter.route('/posaljiZahtev').post(
    (req, res)=>new ZahtevPregledController().posaljiZahtev(req, res)
);

lekarRouter.route('/dohvatiPregledeLekar').post(
    (req, res)=>new ZakazaniPregledController().dohvatiPregledeLekar(req, res)
);

lekarRouter.route('/dohvatiPacijenta').post(
    (req, res)=>new LekarController().proveriKorIme(req, res)
);

lekarRouter.route('/dohvatiIzvestaje').post(
    (req, res)=>new IzvestajController().dohvatiIzvestaje(req, res)
);

lekarRouter.route('/dohvatiPregledeBezIzvestaja').post(
    (req, res)=>new ZakazaniPregledController().dohvatiPregledeBezIzvestaja(req, res)
);

lekarRouter.route('/unesiIzvestaj').post(
    (req, res)=>new IzvestajController().unesiIzvestaj(req, res)
);

lekarRouter.post('/azurirajProfil', upload.single('profilnaSlika'),
 async (req, res)=>new LekarController().azurirajKorisnika(req, res)
);

export default lekarRouter;