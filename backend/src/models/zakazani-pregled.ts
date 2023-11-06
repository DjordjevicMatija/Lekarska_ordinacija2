import mongoose from "mongoose";

const Schema = mongoose.Schema;

let ZakazaniPregled = new Schema({
    pacijent: {
        type: String
    },
    lekar: {
        type: String
    },
    ime_lekara: {
        type: String
    },
    prezime_lekara: {
        type: String
    },
    ogranak: {
        type: String
    },
    pregled: {
        type: String
    },
    pocetak_pregleda: {
        type: Date
    },
    kraj_pregleda: {
        type: Date
    },
    ima_izvestaj: {
        type: Boolean
    },
    cena: {
        type: Number
    }
});

export default mongoose.model('ZakazaniPregledModel', ZakazaniPregled, 'ZakazaniPregledi');