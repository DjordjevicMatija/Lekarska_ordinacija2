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
const neregistrovanRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
neregistrovanRouter.route('/dohvatiLekare').get((req, res) => new lekar_controller_1.LekarController().dohvatiLekare(req, res));
neregistrovanRouter.route('/ulogujSe').post((req, res) => new lekar_controller_1.LekarController().ulogujSe(req, res));
neregistrovanRouter.route('/proveriKorIme').post((req, res) => new lekar_controller_1.LekarController().proveriKorIme(req, res));
neregistrovanRouter.route('/proveriKorImeZahtev').post((req, res) => new lekar_controller_1.LekarController().proveriKorImeZahtev(req, res));
neregistrovanRouter.route('/proveriMejlBaza').post((req, res) => new lekar_controller_1.LekarController().proveriMejlBaza(req, res));
neregistrovanRouter.route('/proveriMejlBazaZahtev').post((req, res) => new lekar_controller_1.LekarController().proveriMejlBazaZahtev(req, res));
neregistrovanRouter.post('/posaljiZahtev', upload.single('profilnaSlika'), (req, res) => __awaiter(void 0, void 0, void 0, function* () { return new zahtev_controller_1.ZahtevController().posaljiZahtev(req, res); }));
neregistrovanRouter.route('/proveriStaruLoz').post((req, res) => new lekar_controller_1.LekarController().proveriStaruLoz(req, res));
neregistrovanRouter.route('/promeniLozinku').post((req, res) => new lekar_controller_1.LekarController().promeniLozinku(req, res));
exports.default = neregistrovanRouter;
//# sourceMappingURL=neregistrovan.routes.js.map