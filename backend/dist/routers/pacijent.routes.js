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
const zakazani_pregledi_controller_1 = require("../controllers/zakazani-pregledi.controller");
const vrsta_pregleda_controller_1 = require("../controllers/vrsta-pregleda.controller");
const izvestaj_controller_1 = require("../controllers/izvestaj.controller");
const lekar_controller_1 = require("../controllers/lekar.controller");
const pacijentRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
pacijentRouter.route('/dohvatiPreglede').post((req, res) => new vrsta_pregleda_controller_1.VrstaPregledaController().dohvatiPreglede(req, res));
pacijentRouter.route('/zakaziPregled').post((req, res) => new zakazani_pregledi_controller_1.ZakazaniPregledController().zakaziPregled(req, res));
pacijentRouter.route('/dohvatiPregledePacijent').post((req, res) => new zakazani_pregledi_controller_1.ZakazaniPregledController().dohvatiPregledePacijent(req, res));
pacijentRouter.route('/dohvatiIzvestaje').post((req, res) => new izvestaj_controller_1.IzvestajController().dohvatiIzvestaje(req, res));
pacijentRouter.route('/otkaziPregled').post((req, res) => new zakazani_pregledi_controller_1.ZakazaniPregledController().otkaziPregled(req, res));
pacijentRouter.post('/azurirajProfil', upload.single('profilnaSlika'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return new lekar_controller_1.LekarController().azurirajKorisnika(req, res); }));
exports.default = pacijentRouter;
//# sourceMappingURL=pacijent.routes.js.map