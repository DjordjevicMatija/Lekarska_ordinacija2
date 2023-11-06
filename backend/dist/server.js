"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const neregistrovan_routes_1 = __importDefault(require("./routers/neregistrovan.routes"));
const pacijent_routes_1 = __importDefault(require("./routers/pacijent.routes"));
const lekar_routes_1 = __importDefault(require("./routers/lekar.routes"));
const menadzer_routes_1 = __importDefault(require("./routers/menadzer.routes"));
//sta sve koristimo - express, cors i json
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); //zato sto imamo razlicite portove
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
//konekcija sa bazom
mongoose_1.default.connect('mongodb://localhost:27017/Lekarska_ordinacija');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
//rutiranje
const router = express_1.default.Router();
router.use('/neregistrovan', neregistrovan_routes_1.default);
router.use('/pacijent', pacijent_routes_1.default);
router.use('/lekar', lekar_routes_1.default);
router.use('/menadzer', menadzer_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map