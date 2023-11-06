import express from 'express';
import multer from 'multer'
import { LekarController } from '../controllers/lekar.controller';
import { ZahtevController } from '../controllers/zahtev.controller';
import { ZahtevPregledController } from '../controllers/zahtev-pregled.controller';
import { SpecijalizacijaController } from '../controllers/specijalizacija.controller';
import { VrstaPregledaController } from '../controllers/vrsta-pregleda.controller';

const menadzerRouter = express.Router();
const upload = multer({dest: 'uploads/'});

menadzerRouter.route('/dohvatiKorisnike').get(
    (req, res)=>new LekarController().dohvatiKorisnike(req, res)
);

menadzerRouter.route('/dohvatiSpecijalizacije').get(
    (req, res)=>new LekarController().dohvatiSpecijalizacije(req, res)
);

menadzerRouter.route('/obrisiKorisnika').post(
    (req, res)=>new LekarController().obrisiKorisnika(req, res)
);

menadzerRouter.route('/proveriLicencu').post(
    (req, res)=>new LekarController().proveriLicencu(req, res)
);

menadzerRouter.post('/azurirajKorisnika', upload.single('profilnaSlika'),
 async (req, res)=>new LekarController().azurirajKorisnika(req, res)
);

menadzerRouter.post('/dodajLekara', upload.single('profilnaSlika'),
 async (req, res)=>new LekarController().dodajLekara(req, res)
);

menadzerRouter.route('/dohvatiZahteveReg').get(
    (req, res)=>new ZahtevController().dohvatiZahteveReg(req, res)
);

menadzerRouter.route('/prihvatiZahtev').post(
    (req, res)=>new ZahtevController().prihvatiZahtev(req, res)
);

menadzerRouter.route('/odbaciZahtev').post(
    (req, res)=>new ZahtevController().odbaciZahtev(req, res)
);

menadzerRouter.route('/dohvatiZahtevPregled').get(
    (req, res)=>new ZahtevPregledController().dohvatiZahtevPregled(req, res)
);

menadzerRouter.route('/odbijPregled').post(
    (req, res)=>new ZahtevPregledController().odbijPregled(req, res)
);

menadzerRouter.route('/odobriPregled').post(
    (req, res)=>new ZahtevPregledController().odobriPregled(req, res)
);

menadzerRouter.route('/dodajSpecijalizaciju').post(
    (req, res)=>new SpecijalizacijaController().dodajSpecijalizaciju(req, res)
);

menadzerRouter.route('/dohvatiPreglede').post(
    (req, res)=>new VrstaPregledaController().dohvatiPregledeSpec(req, res)
);

menadzerRouter.route('/dodajPregled').post(
    (req, res)=>new VrstaPregledaController().noviPregled(req, res)
);

menadzerRouter.route('/obrisiPregled').post(
    (req, res)=>new VrstaPregledaController().obrisiPregled(req, res)
);

menadzerRouter.route('/azurirajPregled').post(
    (req, res)=>new VrstaPregledaController().azurirajPregled(req, res)
);

export default menadzerRouter;