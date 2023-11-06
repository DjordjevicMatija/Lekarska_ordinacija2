import express from 'express';
import multer from 'multer'
import { LekarController } from '../controllers/lekar.controller';
import { ZahtevController } from '../controllers/zahtev.controller';

const neregistrovanRouter = express.Router();
const upload = multer({dest: 'uploads/'});

neregistrovanRouter.route('/dohvatiLekare').get(
    (req, res)=>new LekarController().dohvatiLekare(req, res)
);

neregistrovanRouter.route('/ulogujSe').post(
    (req, res)=>new LekarController().ulogujSe(req, res)
);

neregistrovanRouter.route('/proveriKorIme').post(
    (req, res)=>new LekarController().proveriKorIme(req, res)
);

neregistrovanRouter.route('/proveriKorImeZahtev').post(
    (req, res)=>new LekarController().proveriKorImeZahtev(req, res)
);

neregistrovanRouter.route('/proveriMejlBaza').post(
    (req, res)=>new LekarController().proveriMejlBaza(req, res)
);

neregistrovanRouter.route('/proveriMejlBazaZahtev').post(
    (req, res)=>new LekarController().proveriMejlBazaZahtev(req, res)
);

neregistrovanRouter.post('/posaljiZahtev', upload.single('profilnaSlika'),
 async (req, res)=>new ZahtevController().posaljiZahtev(req, res)
);

neregistrovanRouter.route('/proveriStaruLoz').post(
    (req, res)=>new LekarController().proveriStaruLoz(req, res)
);

neregistrovanRouter.route('/promeniLozinku').post(
    (req, res)=>new LekarController().promeniLozinku(req, res)
);

export default neregistrovanRouter;