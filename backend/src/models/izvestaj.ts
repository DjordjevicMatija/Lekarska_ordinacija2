import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Izvestaj = new Schema({
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
    specijalizacija: {
        type: String
    },
    razlog_dolaska: {
        type: String
    },
    dijagnoza: {
        type: String
    },
    terapija: {
        type: String
    },
    datum_pregleda: {
        type: Date
    },
    datum_narednog_pregleda: {
        type: Date
    }
});

export default mongoose.model('IzvestajModel', Izvestaj, 'Izvestaji');