import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zahtev = new Schema({
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    imejl: {
        type: String
    },
    tip: {
        type: String
    },
    slika: {
        type: String
    },
    status: {
        type: String
    }
})

export default mongoose.model('ZahtevModel', Zahtev, 'ZahteviZaRegistraciju');