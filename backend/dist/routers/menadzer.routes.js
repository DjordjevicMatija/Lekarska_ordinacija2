"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const lekar_controller_1 = require("../controllers/lekar.controller");
const zahtev_controller_1 = require("../controllers/zahtev.controller");
const zahtev_pregled_controller_1 = require("../controllers/zahtev-pregled.controller");
const specijalizacija_controller_1 = require("../controllers/specijalizacija.controller");
const vrsta_pregleda_controller_1 = require("../controllers/vrsta-pregleda.controller");
const menadzerRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
menadzerRouter.route('/dohvatiKorisnike').get((req, res) => new lekar_controller_1.LekarController().dohvatiKorisnike(req, res));
menadzerRouter.route('/dohvatiSpecijalizacije').get((req, res) => new lekar_controller_1.LekarController().dohvatiSpecijalizacije(req, res));
menadzerRouter.route('/obrisiKorisnika').post((req, res) => new lekar_controller_1.LekarController().obrisiKorisnika(req, res));
menadzerRouter.route('/proveriLicencu').post((req, res) => new lekar_controller_1.LekarController().proveriLicencu(req, res));
menadzerRouter.post('/azurirajKorisnika', upload.single('profilnaSlika'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return new lekar_controller_1.LekarController().azurirajKorisnika(req, res); }));
menadzerRouter.post('/dodajLekara', upload.single('profilnaSlika'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return new lekar_controller_1.LekarController().dodajLekara(req, res); }));
menadzerRouter.route('/dohvatiZahteveReg').get((req, res) => new zahtev_controller_1.ZahtevController().dohvatiZahteveReg(req, res));
menadzerRouter.route('/prihvatiZahtev').post((req, res) => new zahtev_controller_1.ZahtevController().prihvatiZahtev(req, res));
menadzerRouter.route('/odbaciZahtev').post((req, res) => new zahtev_controller_1.ZahtevController().odbaciZahtev(req, res));
menadzerRouter.route('/dohvatiZahtevPregled').get((req, res) => new zahtev_pregled_controller_1.ZahtevPregledController().dohvatiZahtevPregled(req, res));
menadzerRouter.route('/odbijPregled').post((req, res) => new zahtev_pregled_controller_1.ZahtevPregledController().odbijPregled(req, res));
menadzerRouter.route('/odobriPregled').post((req, res) => new zahtev_pregled_controller_1.ZahtevPregledController().odobriPregled(req, res));
menadzerRouter.route('/dodajSpecijalizaciju').post((req, res) => new specijalizacija_controller_1.SpecijalizacijaController().dodajSpecijalizaciju(req, res));
menadzerRouter.route('/dohvatiPreglede').post((req, res) => new vrsta_pregleda_controller_1.VrstaPregledaController().dohvatiPregledeSpec(req, res));
menadzerRouter.route('/dodajPregled').post((req, res) => new vrsta_pregleda_controller_1.VrstaPregledaController().noviPregled(req, res));
menadzerRouter.route('/obrisiPregled').post((req, res) => new vrsta_pregleda_controller_1.VrstaPregledaController().obrisiPregled(req, res));
menadzerRouter.route('/azurirajPregled').post((req, res) => new vrsta_pregleda_controller_1.VrstaPregledaController().azurirajPregled(req, res));
exports.default = menadzerRouter;
//# sourceMappingURL=menadzer.routes.js.map