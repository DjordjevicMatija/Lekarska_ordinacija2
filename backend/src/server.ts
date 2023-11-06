import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import neregistrovanRouter from './routers/neregistrovan.routes';
import pacijentRouter from './routers/pacijent.routes';
import lekarRouter from './routers/lekar.routes';
import menadzerRouter from './routers/menadzer.routes';

//sta sve koristimo - express, cors i json
const app = express();
app.use(cors());    //zato sto imamo razlicite portove
app.use(express.json());
app.use('/uploads', express.static('uploads'));

//konekcija sa bazom
mongoose.connect('mongodb://localhost:27017/Lekarska_ordinacija'); //promeniti naziv baze podataka
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connected');
})

//rutiranje
const router = express.Router();
router.use('/neregistrovan', neregistrovanRouter);
router.use('/pacijent', pacijentRouter);
router.use('/lekar', lekarRouter);
router.use('/menadzer', menadzerRouter);


app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));