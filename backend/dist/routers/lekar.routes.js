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
const vrsta_pregleda_controller_1 = require("../controllers/vrsta-pregleda.controller");
const zahtev_pregled_controller_1 = require("../controllers/zahtev-pregled.controller");
const zakazani_pregledi_controller_1 = require("../controllers/zakazani-pregledi.controller");
const lekar_controller_1 = require("../controllers/lekar.controller");
const izvestaj_controller_1 = require("../controllers/izvestaj.controller");
const lekarRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
lekarRouter.route('/dohvatiPregledeSpec').post((req, res) => new vrsta_pregleda_controller_1.VrstaPregledaController().dohvatiPregledeSpec(req, res));
lekarRouter.route('/dodajPregled').post((req, res) => new vrsta_pregleda_controller_1.VrstaPregledaController().dodajPregled(req, res));
lekarRouter.route('/izbaciPregled').post((req, res) => new vrsta_pregleda_controller_1.VrstaPregledaController().izbaciPregled(req, res));
lekarRouter.route('/posaljiZahtev').post((req, res) => new zahtev_pregled_controller_1.ZahtevPregledController().posaljiZahtev(req, res));
lekarRouter.route('/dohvatiPregledeLekar').post((req, res) => new zakazani_pregledi_controller_1.ZakazaniPregledController().dohvatiPregledeLekar(req, res));
lekarRouter.route('/dohvatiPacijenta').post((req, res) => new lekar_controller_1.LekarController().proveriKorIme(req, res));
lekarRouter.route('/dohvatiIzvestaje').post((req, res) => new izvestaj_controller_1.IzvestajController().dohvatiIzvestaje(req, res));
lekarRouter.route('/dohvatiPregledeBezIzvestaja').post((req, res) => new zakazani_pregledi_controller_1.ZakazaniPregledController().dohvatiPregledeBezIzvestaja(req, res));
lekarRouter.route('/unesiIzvestaj').post((req, res) => new izvestaj_controller_1.IzvestajController().unesiIzvestaj(req, res));
lekarRouter.post('/azurirajProfil', upload.single('profilnaSlika'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return new lekar_controller_1.LekarController().azurirajKorisnika(req, res); }));
exports.default = lekarRouter;
//# sourceMappingURL=lekar.routes.js.map